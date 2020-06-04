 
function scrollUp() {
    window.scrollTo({top:0, behavior: 'smooth'});
}
 
async function getMessage() {
  fetch('/comments').then(response => response.json()).then((data) => {
    const output = document.getElementById('message-container');

    data.forEach((line) => {
        output.appendChild(createListElement(line));
        });
    });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
