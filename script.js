function setGradientBackground() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let gradient, imageUrl;

  if ((hours > 6 || (hours === 6 && minutes >= 30)) && (hours < 17 || (hours === 17 && minutes < 30))) {
    gradient = "linear-gradient(to bottom, #2badf8, #000000)"; 
    imageUrl = 'tubes_light.png';
    document.body.style.color = "#000000";
  } else {
    gradient = "linear-gradient(to bottom, #8a2ffc, #000000)";
    imageUrl = 'tubes_dark.png';
    document.body.style.color = "white";
  }
  document.body.style.background = gradient;
  const backgroundImageElement = document.querySelector('.background-image');
  backgroundImageElement.style.backgroundImage = `url('${imageUrl}')`;
}

function downloadFile() {
  const fileId = '1gYXQSH3FNzoMDbx8Wg-YBpiHns5-UgWj'; 
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  window.location.href = downloadUrl;
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
    requestAnimationFrame(updateParticles); // Nächsten Frame animieren
  }
  createParticles(100);
  updateParticles();

setGradientBackground();
setInterval(setGradientBackground, 60000);
