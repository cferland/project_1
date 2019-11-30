
document.querySelector('#start-button').addEventListener('click', prepareReading);

async function prepareReading() {

  // create clear button to reset page

  let clearButton = document.createElement('button');
  clearButton.innerHTML = 'Start Over';
  clearButton.addEventListener('click', function (event) {
    document.querySelector('.instructions').innerHTML = `Welcome to the universe of tarot!
    Consult the cards to receive a personalized reading that will provide insight into your life and whatever issues you may be facing.
    Begin by selecting a spread for your reading, then enter your question below.
    If you'd prefer a more general reading, then leave the question blank.
    Once you've cleared your mind and focused on the question at hand, click the button and the cards will appear!`;
    document.querySelector('.instructions').classList.remove('hidden', 'fade-in');
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

  document.querySelector('.instructions').classList.add('hidden');
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
    <h2 class="hidden">Hidden</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>`;
    setTimeout(function () {
      document.querySelector('.instructions').innerHTML = `The pyramid spread is useful for understanding all facets of a particular problem.
      The top of the pyramid describes the ultimate action to be taken, while the middle cards provide insight into what is blocking your path and how to overcome it.
      The bottom three cards address the problem itself, exploring its root causes and what hidden factors must be brought to light.`;
      document.querySelector('.instructions').classList.add('fade-in');
    }, 1000);
  } else if (layout === 'single') {
    cardNum = '1';
    document.querySelector('.spread').innerHTML = `<div class="card one">
    <h2 class="hidden">Focus</h2>
    <div class="card-back">
    <div class="crop"></div>
    </div>
    </div>`;
    setTimeout(function () {
      document.querySelector('.instructions').innerHTML = `Single card readings are perfect for general readings or simple questions.
      One card will be pulled to address the focal point of the question at hand.
      This reading can also be used for daily readings, allowing you to gain an understanding of whatever key themes are the focus of your current situation.`;
      document.querySelector('.instructions').classList.add('fade-in');
    }, 1000);
  } else {
    cardNum = '3';
    setTimeout(function () {
      document.querySelector('.instructions').innerHTML = `Three card readings address each matter by exploring the past, present, and future as they relate to each other.
      Relevant themes from the past that may be affecting the current situation are described in the first card, while the last card describes a likely outcome if the pathway of the middle card continues to be followed.`;
      document.querySelector('.instructions').classList.add('fade-in');
    }, 1000);
  }

  // replace input field with user question
  // incorporate loading message for longer API requests
  // save API results to result variable

  let question = document.querySelector('#question-input').value;
  let update = 'One moment please...';
  document.querySelector('#question').innerHTML = `<p>${update}</p>`;
  let result;
  try {
    result = await axios.get(`https://cors-anywhere.herokuapp.com/rws-cards-api.herokuapp.com/api/v1/cards/random?n=${cardNum}`);
  }
  catch {
    alert('The cards are having a difficult time. Please refresh the page and try again.');
  }
  console.log(result);
  document.querySelector('#question').classList.add('hidden');
  setTimeout(function () {
    document.querySelector('#question').innerHTML = `<p class="user-input">${question}</p>`;
    document.querySelector('#question').appendChild(clearButton);
    document.querySelector('#question').classList.add('fade-in');
  }, 1000);

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
