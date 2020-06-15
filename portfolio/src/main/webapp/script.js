
/** Shows a popup window. */
function showPopup(button) {
  const modal = document.getElementById('my-popup');
  const content = document.getElementById('popup-content');

  removeLastChild(content);

  switch (button.id) {
    case '1':
      document.getElementById('picture').src = 'images/pickleball.jpg';
      appendElement('h3', 'Sports and Fitness', content);
      appendElement(
          'p',
          'I love doing yoga, hiking, and have recently started playing pickleball. Fun fact: I fenced competitively for 7 years',
          content);
      break;
    case '2':
      document.getElementById('picture').src = 'images/nelson.jpg';
      appendElement('h3', 'Art and Drawing', content);
      appendElement(
          'p',
          'I enjoy visiting art museums and drawing in my free time. Right now, I like drawing realistic portrait style pencil portraits. One of my favorite museums is The Nelson-Atkins Museum of Art here in Kansas City.',
          content);
      break;

    case '3':
      document.getElementById('picture').src = 'images/summersalt.jpg';
      appendElement('h3', 'Music and Concerts', content);
      appendElement(
          'p',
          'This image is from the last concert I went to at a small venue called EXIT/IN in Nashville. I love finding new songs and artists to add to my Spotify playlists.',
          content);
      break;
    case '4':
      document.getElementById('picture').src = 'images/ski.jpg';
      appendElement('h3', 'Skiing', content);
      appendElement(
          'p', 'This picture was taken in Keystone, Colorado.', content);
      break;
    case '5':
      appendElement('h3', 'Cooking and Baking', content);
      document.getElementById('picture').src = 'images/baking.jpg';
      appendElement(
          'p',
          'This is one of my favorite recipes and one that I baked recently, chocolate chip banana bread!',
          content);
      break;
    case '6':
      appendElement('h3', 'Traveling', content);
      document.getElementById('picture').src = 'images/vegas.jpg';
      appendElement(
          'p',
          'I took this picture while visiting Las Vegas during the holidays.',
          content);
      break;
  }
  modal.style.display = 'block';
}

/** Closes the window when the user clicks outside of the box. */
window.onclick =
    function(event) {
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

function appendElement(type, txt, commentDiv) {
  const el = document.createElement('p');
  el.appendChild(document.createTextNode(txt));
  commentDiv.appendChild(el);
}

/**
 *Removes all child elements of a DOM node to prevent text from showing more
 * than once on UI.
 */
function removeLastChild(div) {
  while (div.lastChild) {
    div.removeChild(div.lastChild)
  }
}
