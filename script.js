
document.querySelector('#start-button').addEventListener('click', prepareReading);

async function prepareReading() {

  // create clear button to reset page

  let clearButton = document.createElement('button');
  clearButton.innerHTML = 'Start Over';
  clearButton.addEventListener('click', function (event) {
    document.querySelector('#question').innerHTML = `<select>
    <option value='single'>Single Card</option>
    <option value='three'>Three Card</option>
    <option value='pyramid'>Pyramid</option>
    </select>
    <input type="text" id="question-input" placeholder="Enter Your Question">
    <button id="start-button">Ask the Cards</button>`;
    document.querySelector('#question').removeAttribute('class');
    document.querySelector('.spread').innerHTML = `<div class="card one"><h2 class="hidden">Past</h2><div class="card-back"><div class="crop"></div></div></div>
    <div class="card two"><h2 class="hidden">Present</h2><div class="card-back"><div class="crop"></div></div></div>
    <div class="card three"><h2 class="hidden">Future</h2><div class="card-back"><div class="crop"></div></div></div>`;
    document.querySelector('#start-button').addEventListener('click', prepareReading);
  });

  var cardNum;
  let layout = document.querySelector('select').value;
  if (layout === 'pyramid') {
    cardNum = '6';
    document.querySelector('.spread').innerHTML = `<div class="card one">
    <h2 class="hidden">Action</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>
    <div class="break"></div>
    <div class="card two">
    <h2 class="hidden">Block</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>
    <div class="card three">
    <h2 class="hidden">Advice</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>
    <div class="break"></div>
    <div class="card four">
    <h2 class="hidden">Problem</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>
    <div class="card five">
    <h2 class="hidden">Root</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>
    <div class="card six">
    <h2 class="hidden">Unseen</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>`;
  } else if (layout === 'single') {
    cardNum = '1';
    document.querySelector('.spread').innerHTML = `<div class="card one">
    <h2 class="hidden">Signifier</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>`;
  } else {
    cardNum = '3';
  }

  // replace input field with user question
  // incorporate loading message for longer API requests
  // save API results to result variable

  let question = document.querySelector('#question-input').value;
  let update = 'One moment please...';
  document.querySelector('#question').innerHTML = `<p>${update}</p>`;
  const result = await axios.get(`https://cors-anywhere.herokuapp.com/rws-cards-api.herokuapp.com/api/v1/cards/random?n=${cardNum}`);
  document.querySelector('#question').classList.add('hidden');
  setTimeout(function () {
    document.querySelector('#question').innerHTML = `<p class="user-input">${question}</p>`;
    document.querySelector('#question').appendChild(clearButton);
    document.querySelector('#question').classList.add('fade-in');
  }, 1000);
  console.log(result);

  // display cards face-down on page

  if (layout === 'pyramid') {
  setTimeout(function () {
    document.querySelector('.one .card-back').classList.add('fade-in');
    document.querySelector('.one .hidden').classList.add('fade-in');
  }, 1000);
  setTimeout(function () {
    document.querySelector('.two .card-back').classList.add('fade-in');
    document.querySelector('.two .hidden').classList.add('fade-in');
  }, 2000);
  setTimeout(function () {
    document.querySelector('.three .card-back').classList.add('fade-in');
    document.querySelector('.three .hidden').classList.add('fade-in');
  }, 2500);
  setTimeout(function () {
    document.querySelector('.four .card-back').classList.add('fade-in');
    document.querySelector('.four .hidden').classList.add('fade-in');
  }, 3000);
  setTimeout(function () {
    document.querySelector('.five .card-back').classList.add('fade-in');
    document.querySelector('.five .hidden').classList.add('fade-in');
  }, 3500);
  setTimeout(function () {
    document.querySelector('.six .card-back').classList.add('fade-in');
    document.querySelector('.six .hidden').classList.add('fade-in');
  }, 4000);
  } else if (layout === 'single') {
    setTimeout(function () {
      document.querySelector('.one .card-back').classList.add('fade-in');
      document.querySelector('.one .hidden').classList.add('fade-in');
    }, 1000);
  } else {
    setTimeout(function () {
      document.querySelector('.one .card-back').classList.add('fade-in');
      document.querySelector('.one .hidden').classList.add('fade-in');
    }, 1000);
    setTimeout(function () {
      document.querySelector('.two .card-back').classList.add('fade-in');
      document.querySelector('.two .hidden').classList.add('fade-in');
    }, 2000);
    setTimeout(function () {
      document.querySelector('.three .card-back').classList.add('fade-in');
      document.querySelector('.three .hidden').classList.add('fade-in');
    }, 3000);
  }

  // loop through cards and assign results to each

  const cardArray = document.querySelectorAll('.card');
  for (let i = 0; i < cardArray.length; i++) {
    const cardName = result.data.cards[i].name;
    let cardDesc = document.createElement('p');
    cardDesc.classList.add('description');
    const cardRef = result.data.cards[i].name_short;
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('hidden');
    cardArray[i].querySelector('.crop').innerHTML = `<img src="images/${cardRef}.jpg">`;

    // add chance for reversed cards
    // rotate card image if reversed

    if (Math.random() >= 0.3) {
      cardDesc.innerHTML = result.data.cards[i].meaning_up;
      cardContainer.innerHTML = `<h3>${cardName}</h3>`;
    } else {
      cardDesc.innerHTML = result.data.cards[i].meaning_rev;
      cardContainer.innerHTML = `<h3>${cardName}, Reversed</h3>`;
      cardArray[i].querySelector('.crop').style.transform = 'rotate(180deg)';
    }

    // display cards when clicked

    cardArray[i].appendChild(cardContainer);
    cardArray[i].addEventListener('click', function (event) {
      cardContainer.appendChild(cardDesc);
      cardArray[i].querySelector('.crop').classList.add('fade-in');
      cardContainer.classList.add('fade-in');
    });
  }
}
