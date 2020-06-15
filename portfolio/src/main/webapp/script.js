/** Scrolls to the top of the page when the button is clicked. */
function scrollUp() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

/**
 *Fetches limit for number of comments shown on page and then adds the
 * appropriate amount of comments to the UI.
 */
async function printComments() {
  let commentLimit = document.getElementById('comment-limit').value;

  fetch('/comments?comment-limit=' + commentLimit)
      .then(response => response.json())
      .then((data) => {
        let allComments = document.getElementById('allComments');

        while (allComments.lastChild) {
          allComments.removeChild(allComments.lastChild)
        }

        data.forEach(comment => createCommentElement(comment));
      })
      .then(createMap);
}

/**
 * Creates comment, user, delete button, and timestamp elements and adds them
 * to the UI.
 */
function createCommentElement(comment) {
  const allComments = document.getElementById('allComments');
  const commentDiv = document.createElement('div');

  appendCommentElement(comment.name + ' left a comment:', commentDiv);
  appendCommentElement(comment.text, commentDiv);
  appendCommentElement('at ' + comment.timestamp, commentDiv);

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

/** Deletes comments by ID. */
function deleteComments(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}

/** Creates paragraph element for a comment and adds it to the UI. */
function appendCommentElement(txt, commentDiv) {
  const el = document.createElement('p');
  el.appendChild(document.createTextNode(txt));
  commentDiv.appendChild(el);
}
