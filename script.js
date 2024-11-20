function setGradientBackground() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    let gradient, imageUrl;

    if ((hours > 6 || (hours === 6 && minutes >= 30)) && (hours < 17 || (hours === 17 && minutes < 30))) {
        gradient = "linear-gradient(to bottom, #2badf8, #000000)";
        imageUrl = 'tubes_light.png';
        document.body.style.color = "white";
    } else {
        gradient = "linear-gradient(to bottom, #8a2ffc, #000000)";
        imageUrl = 'tubes_dark.png';
        document.body.style.color = "white";
    }
    document.body.style.background = gradient;
    const backgroundImageElement = document.querySelector('.background-image');
    backgroundImageElement.style.backgroundImage = `url('${imageUrl}')`;
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: 'rgba(255, 255, 255, 0.2)',
        });
    }
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();
    });
    requestAnimationFrame(updateParticles);
}

function adjustParticleCount() {
    const particleDensity = 0.00007;
    const particleCount = Math.floor(window.innerWidth * window.innerHeight * particleDensity);
    createParticles(particleCount);
}
adjustParticleCount();
updateParticles();

setGradientBackground();
setInterval(setGradientBackground, 60000);

// API

const apiKey = "$2a$10$xHgKzpRs.YApFBgABNIvE.F5ZHtYpFuAhIbvrBxDOu7rx7Rp2zr8u";
const apiUrl = `https://api.jsonbin.io/v3/b/673b3d7eacd3cb34a8aa84a2`;

const counterDisplay = document.getElementById('counter');
const button = document.getElementById('downloadButton');

const getCounter = async () => {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "X-Master-Key": apiKey
            }
        });
        if (!response.ok) {
            throw new Error(`Fehler beim Abrufen des Zählers: ${response.status}`);
        }
        const data = await response.json();
        return data.record.clickCounter;
    } catch (error) {
        console.error("Fehler beim Abrufen des Zählers:", error);
        throw error;
    }
};

const incrementCounter = async (currentCount) => {
    try {
        const newCount = currentCount + 1;
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": apiKey
            },
            body: JSON.stringify({ clickCounter: newCount })
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Speichern: ${response.status}`);
        }
        counterDisplay.textContent = `RexID:${newCount}`;

    } catch (error) {
        console.error("Fehler beim Speichern des Zählers:", error);
    }
};

button.addEventListener('click', async () => {
    const hasUserClicked = localStorage.getItem('userHasClicked') === 'true';
    if (!hasUserClicked) {
        let currentCount = await getCounter();
        await incrementCounter(currentCount);
        localStorage.setItem('userHasClicked', 'true');
    }
	const fileId = '1gYXQSH3FNzoMDbx8Wg-YBpiHns5-UgWj';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    window.open(downloadUrl, '_blank', 'noopener');
});

getCounter().then((counter) => {
    counterDisplay.textContent = `RexID:${counter}`;
}).catch((error) => {
    console.error("Fehler beim Abrufen des Zählers:", error);
});
