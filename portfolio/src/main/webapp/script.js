
function scrollUp() {
    window.scrollTo({top:0, behavior: 'smooth'});
}

async function getGreeting() {
  const response = await fetch('/data');
  const greeting = await response.text();
  document.getElementById('message-container').innerText = greeting;
}
