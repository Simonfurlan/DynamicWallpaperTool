function setGradientBackground() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let gradient, imageUrl;

  if ((hours > 6 || (hours === 6 && minutes >= 30)) && (hours < 17 || (hours === 17 && minutes < 30))) {
    gradient = "linear-gradient(to bottom, #87CEEB, #FFFFFF)"; 
    imageUrl = 'tubes_light.png';
    document.body.style.color = "#151515";
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

setGradientBackground();
setInterval(setGradientBackground, 60000);
