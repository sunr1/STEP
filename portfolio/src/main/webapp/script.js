/** Shows a popup window. */
function showPopup(button) {
  const modal = document.getElementById('my-popup');
  const content = document.getElementById('popup-content');
  let imagePath;
  let headerText;
  let captionText;

  removeLastChild(content);

  switch (button.id) {
    case '1':
      imagePath = 'images/pickleball.jpg';
      headerText = 'Sports and Fitness';
      captionText =
          'I love doing yoga, hiking, and have recently started playing pickleball. Fun fact: I fenced competitively for 7 years';
      break;
    case '2':
      imagePath = 'images/nelson.jpg';
      headerText = 'Art and Drawing';
      captionText =
          'I enjoy visiting art museums and drawing in my free time. Right now, I like drawing realistic portrait style pencil portraits. One of my favorite museums is The Nelson-Atkins Museum of Art here in Kansas City.';
      break;
    case '3':
      imagePath = 'images/summersalt.jpg';
      headerText = 'Music and Concerts';
      captionText =
          'This image is from the last concert I went to at a small venue called EXIT/IN in Nashville. I love finding new songs and artists to add to my Spotify playlists.';
      break;
    case '4':
      imagePath = 'images/ski.jpg';
      headerText = 'Skiing';
      captionText = 'This picture was taken in Keystone, Colorado.';
      break;
    case '5':
      imagePath = 'images/baking.jpg';
      headerText = 'Cooking and Baking';
      captionText =
          'This is one of my favorite recipes and one that I baked recently, chocolate chip banana bread!';
      break;
    case '6':
      imagePath = 'images/vegas.jpg';
      headerText = 'Traveling';
      captionText =
          'I took this picture while visiting Las Vegas during the holidays.';
      break;
  }
  document.getElementById('popup-picture').src = imagePath;
  appendElement('h3', headerText, content);
  appendElement('p', captionText, content);

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

function
scrollUp() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

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

        removeLastChild(allComments);

        data.forEach(comment => createCommentElement(comment));
      })
      .then(createMap());
}

/**
 * Creates comment, user, delete button, and timestamp elements and adds them
 * to the UI.
 */
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

/** Deletes comments by ID. */
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
