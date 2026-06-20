/**
 * @fileoverview otd01.js js for on this day experiment 01
 *
/*   @@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@
     |                |
     |    J  A  N  N  |
     |    J A A NN N  |
     |    J A A NNNN  |
     | J  J AAA N NN  |   on this day
     |  JJ  A A N  N  |
     |                |
     |       11       |
     |      111       |
     |       11       |
     |       11       |
     |      1111      |
     |________________|
*/
import {createDiv, createImg} from '../modules/html/html.js';
import {isArray, prettyJson}  from '../modules/util/util.js';

const IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/250px-Giraffe_Mikumi_National_Park.jpg';

window.addEventListener('load', main);

async function main() {
  let x = await createBlurryCardWithBg(document.getElementById('card01'));
  await createBlurryCardWithSetProperty(document.getElementById('card02'));

  // force a refresh so the document centers the created objects
  console.log(x.offsetWidth, x.offsetHeight);
} // main


async function createBlurryCardWithBg(parent) {
  const card        = await createCard(parent, IMAGE_URL, true);
  const description = 'card setting:<pre>backgroundImage url</pre>';
  card.cardDescription.innerHTML = description;
  card.cardImageContainer.style.backgroundImage = `url(${IMAGE_URL})`;
  parent.appendChild(card.cardContainer);
  return card.cardContainer;
}


async function createBlurryCardWithSetProperty(parent) {
  const card        = await createCard(parent, IMAGE_URL, false);
  const description = 'card setting:<pre>setProperty(--before-bg, ...)</pre>'
  card.cardDescription.innerHTML = description;
  card.cardImageContainer.style.setProperty('--before-bg', `url(${IMAGE_URL})`);
  parent.appendChild(card.cardContainer);
  return card.cardContainer;
}


async function createCard(parent, imageUrl, useFirst=true) {
  let cardContainer       = createDiv(null, 'cardContainer');
  let imgContainerClass   = useFirst ? 'cardImageVarContainerWithoutBefore'
      : 'cardImageVarContainer';
  let cardImageContainer  = createDiv(cardContainer, imgContainerClass);
  await createImg(cardImageContainer, 'cardImageVar', imageUrl, true);
  let cardDescription     = createDiv(cardContainer, 'cardDescription');

  return {cardContainer, cardImageContainer, cardDescription};
}
