function scrollUp() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

async function printComments() {
  let limit = document.getElementById('limit').value;

  fetch('/comments?limit=' + limit)
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

  // name
  const nameElement = document.createElement('p');
  let nameTextNode = document.createTextNode(comment.name + ' left a comment:');
  nameElement.appendChild(nameTextNode);
  commentDiv.appendChild(nameElement);

  // comment
  const commentElement = document.createElement('p');
  let commentTextNode = document.createTextNode(comment.text);
  commentElement.appendChild(commentTextNode);
  commentDiv.appendChild(commentElement);

  // time
  const timeEl = document.createElement('p');
  let timeTextNode = document.createTextNode('at ' + comment.timestamp);
  timeEl.appendChild(timeTextNode);
  commentDiv.appendChild(timeEl);

  // delete button implementation
  const deleteButtonElement = document.createElement('button');
  let deleteTextNode = document.createTextNode('x');
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
