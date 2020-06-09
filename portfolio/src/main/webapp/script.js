function scrollUp() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

async function printComments() {
  let commentLimit = document.getElementById('comment-limit').value;

  fetch('/comments?comment-limit=' + commentLimit)
      .then(response => response.json())
      .then((data) => {
        let allComments = document.getElementById('allComments');

        while (allComments.lastChild) {
          allComments.removeChild(allComments.lastChild)
        }

        data.forEach((comment) => {
          createCommentElement(comment);
        });
      });
}

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

function deleteComments(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-comment', {method: 'POST', body: params});
}

function appendCommentElement(txt, commentDiv) {
  const el = document.createElement('p');
  let textNode = document.createTextNode(txt);
  el.appendChild(textNode);
  commentDiv.appendChild(el);
}
