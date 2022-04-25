'use strict';

// ** GLOBAL VARIABLES **

let AccumulatedRounds = 25;
let productArray = [];

// ** DOM REFERENCES **

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');


// ** CANVAS REFERENCE **

const ctx = document.getElementById('myChart');

// **LOCAL STORAGE **

let RecoveredProducts = localStorage.getItem('products'); // Gets product data out of local storage
let parsedProducts = JSON.parse(RecoveredProducts); // Parses data from local storage for use in code

// **CONSTRUCTOR **

function Product(name, fileExt = 'jpg') {
  this.productName = name;
  this.img = `img/${name}.${fileExt}`;
  this.clicks = 0;
  this.views = 0;

  productArray.push(this);
}
if (RecoveredProducts) {
  for (let i = 0; i < parsedProducts.length; i++) {

    if (parsedProducts[i].productName === 'sweep') {
      let reconstructedSweep = new Product(parsedProducts[i].productName, 'png');
      reconstructedSweep.clicks = parsedProducts[i].clicks;
      reconstructedSweep.views = parsedProducts[i].views;
    } else {
      let reconstructedProduct = new Product(parsedProducts[i].productName);
      reconstructedProduct.clicks = parsedProducts[i].clicks;
      reconstructedProduct.views = parsedProducts[i].views;
    }
  }
} else {
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}

console.log(productArray);

// ** FUNCTIONS **

let indexArray = [];

function renderImages() {

  while (indexArray.length < 6) {
    let randomNumber = getRandomIndexResults();
    if (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }
  console.log(indexArray);

  let productOneIndex = indexArray.shift();
  let productTwoIndex = indexArray.shift();
  let productThreeIndex = indexArray.shift();

  // change img src and alt for each img tag in HTML
  imgOne.src = productArray[productOneIndex].img;
  imgOne.alt = productArray[productOneIndex].productName;
  productArray[productOneIndex].views++;

  imgTwo.src = productArray[productTwoIndex].img;
  imgTwo.alt = productArray[productTwoIndex].productName;
  productArray[productTwoIndex].views++;

  imgThree.src = productArray[productThreeIndex].img;
  imgThree.alt = productArray[productThreeIndex].productName;
  productArray[productThreeIndex].views++;

}
renderImages();

function getRandomIndexResults() {
  // taken from WE3 schools
  return Math.floor(Math.random() * productArray.length);
}

// **************************** EVENT HANDLERS ****************************

function handleClick(event) {
  let clickedImg = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (clickedImg === productArray[i].productName) {
      productArray[i].clicks++;
    }
  }

  AccumulatedRounds--;

  if (AccumulatedRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderProductChart(); // renders chart once all voting rounds are complete

    let stringifiedProducts = JSON.stringify(productArray); // 1. Stringifies productArray for local storage

    localStorage.setItem('products', stringifiedProducts); // 2. Sets stringified productArray into local storage
  }

  renderImages();
}

// **************************** CREATE CHART ****************************

function renderProductChart() {

  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].productName);
    productViews.push(productArray[i].views);
    productVotes.push(productArray[i].clicks);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames, // product names
      datasets: [{
        label: '# of Votes', // # votes
        data: productVotes, // actual votes
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views', // # views
        data: productViews, // actual views
        backgroundColor: [
          'green'
        ],
        borderColor: [
          'green'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, myChartObj);
}


// ** EVENT LISTENERS **

imgContainer.addEventListener('click', handleClick);
