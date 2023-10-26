document.getElementById('showConfetti').addEventListener('click', function() {
    chrome.tabs.executeScript({
      file: 'confetti.js'
    });
  });
  