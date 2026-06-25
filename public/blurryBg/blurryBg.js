/**
 * @fileoverview blurryBg.js
 *
/**                           _  __
 ---         ___ __ _ _ __ __| |/ _|_  __
|   |/\     / __/ _` | '__/ _` | |_\ \/ /
|   |  \   | (_| (_| | | | (_| |  _|>  <
|___| /     \___\__,_|_|  \__,_|_| /_/\_\
    \/            project cardfx
**/
import {createDiv, createImg} from '../modules/html/html.js';
import {isArray, prettyJson}  from '../modules/util/util.js';

window.addEventListener('load', main);

async function main() {
  // for example, fetching the giraffe information from wikipedia
  let imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' +
      '9/9e/Giraffe_Mikumi_National_Park.jpg/' +
      '250px-Giraffe_Mikumi_National_Park.jpg';

  let description = 'Giraffes are large African hoofed mammals. ' +
      'They are the tallest living terrestrial animals on Earth.';

  // create a blurry card from the image url, but the blurring fails
  await createBlurryCard(imageUrl, description);

  // create a blurry card from the image url, but the blurring succeeds
  await createBlurryCardWithSetProperty(imageUrl, description);
}


// create a blurry card from the image url, but the blurring fails
async function createBlurryCard(imageUrl, description) {
  let parent = document.getElementById('dynamicCard');
  const {card, cardImageContainer} =
        await createCard(parent, imageUrl, description);

  // setting the background does NOT invoke the css filter
  cardImageContainer.style.background = `url(${imageUrl})`;
  return card;
}


// create a blurry card from the image url, but the blurring succeeds
async function createBlurryCardWithSetProperty(imageUrl, description) {
  let parent = document.getElementById('dynamicCardWithSetProperty');

  const {card, cardImageContainer} =
        await createCard(parent, imageUrl, description);

  // setting the css var assigned to the background DOES invoke the filter
  cardImageContainer.style.setProperty('--dynamicallyLoadedImg',
                                       `url(${imageUrl})`);
  return card;
}


// dynamic card creation with an image and a description
async function createCard(parent, imageUrl, description) {
  let cardContainer      = createDiv(parent,       'cardContainer');
  let cardImageContainer = createDiv(cardContainer,'dynamicCardImageContainer');
  await createImg(cardImageContainer, 'cardImageWithBlurryBg', imageUrl, true);
  createDiv(cardContainer, 'cardDescription', description);

  return {cardContainer, cardImageContainer};
}
