/** Creates a Popup and assigns parameters */
class Popup {
  constructor(imagePath, headerText, captionText) {
    this.imagePath = imagePath;
    this.headerText = headerText;
    this.captionText = captionText;
  }
}

const popupById = new Map();

popupById.set(
    '1',
    new Popup(
        'images/pickleball.jpg', 'Sports and Fitness',
        'I love doing yoga, hiking, and have recently started playing pickleball. Fun fact: I fenced competitively for 7 years'));
popupById.set(
    '2',
    new Popup(
        'images/nelson.jpg', 'Art and Drawing',
        'I enjoy visiting art museums and drawing in my free time. Right now, I like drawing realistic portrait style pencil portraits. One of my favorite museums is The Nelson-Atkins Museum of Art here in Kansas City.'));
popupById.set(
    '3',
    new Popup(
        'images/summersalt.jpg', 'Music and Concerts',
        'This image is from the last concert I went to at a small venue called EXIT/IN in Nashville. I love finding new songs and artists to add to my Spotify playlists.'));
popupById.set(
    '4',
    new Popup(
        'images/ski.jpg', 'Skiing',
        'This picture was taken in Keystone, Colorado.'));
popupById.set(
    '5',
    new Popup(
        'images/baking.jpg', 'Cooking and Baking',
        'This is one of my favorite recipes and one that I baked recently, chocolate chip banana bread!'));
popupById.set(
    '6',
    new Popup(
        'images/vegas.jpg', 'Traveling',
        'I took this picture while visiting Las Vegas during the holidays.'));