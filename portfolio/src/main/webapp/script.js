function scrollUp() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

async function printComments() {
  var limit = document.getElementById('limit').value;
  fetch('/comments?limit=' + limit)
      .then(response => response.json())
      .then((data) => {
        const output = document.getElementById('comments');
        console.log(limit);

        data.forEach((line) => {
          output.appendChild(createCommentElement(line));
        });
      });
}

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.title;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'x';
  deleteButtonElement.addEventListener('click', () => {
    deleteComments(comment);
    commentElement.remove();
  });

  commentElement.appendChild(titleElement);
  commentElement.appendChild(deleteButtonElement);
  return commentElement;
}

function deleteComments(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-data', {method: 'POST', body: params});
}