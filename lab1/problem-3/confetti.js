// Simple confetti effect
const confettiCount = 300;
const confettiColors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];

for (let i = 0; i < confettiCount; i++) {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.top = `${Math.random() * 100}vh`;
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
  confetti.style.zIndex = 9999;

  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 3000);  
}
