/** Shows a popup window. */
function showPopup(id) {
  const content = document.getElementById('popup-content');
  const popup = popupById.get(id);

  removeLastChild(content);

  document.getElementById('popup-picture').src = popup.imagePath;
  appendElement('h3', popup.headerText, content);
  appendElement('p', popup.captionText, content);

  const modal = document.getElementById('my-popup');
  modal.style.display = 'block';
}

/** Closes the window when the user clicks outside of the box. */
window.onclick = function(event) {
  const modal = document.getElementById('my-popup');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

function scrollUp() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

async function printComments() {
  let commentLimit = document.getElementById('comment-limit').value;

  fetch('/comments?comment-limit=' + commentLimit)
      .then(response => response.json())
      .then((data) => {
        let allComments = document.getElementById('allComments');

        removeLastChild(allComments);

        data.forEach(comment => createCommentElement(comment));
      })
      .then(createMap());
}

function createCommentElement(comment) {
  const allComments = document.getElementById('allComments');
  const commentDiv = document.createElement('div');

  appendElement('p', comment.name + ' left a comment:', commentDiv);
  appendElement('p', comment.text, commentDiv);
  appendElement('p', 'at ' + comment.timestamp, commentDiv);

  // delete button implementation
  const deleteButtonElement = document.createElement('button');
  const deleteTextNode = document.createTextNode('x');
  deleteButtonElement.appendChild(deleteTextNode);
  deleteButtonElement.addEventListener('click', () => {
    deleteComments(comment);
    commentDiv.remove();
  });
  commentDiv.appendChild(deleteButtonElement);
  allComments.appendChild(commentDiv);
}

function deleteComments(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}

function appendElement(type, txt, divAppend) {
  const el = document.createElement(type);
  el.appendChild(document.createTextNode(txt));
  divAppend.appendChild(el);
}

/**
 * Removes all child elements of a DOM node to prevent text from showing more
 * than once on UI.
 */
function removeLastChild(div) {
  while (div.lastChild) {
    div.removeChild(div.lastChild)
  }
}
