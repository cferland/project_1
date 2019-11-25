document.querySelector('button').addEventListener('click', async function (event) {
  
  // replace input field with user question
  // incorporate loading message for longer API requests
  // save API results to result variable

  let question = document.querySelector('#question-input').value;
  let update = 'One moment please...';
  document.querySelector('#question').innerHTML = `<p>${update}</p>`;
  const result = await axios.get(`https://cors-anywhere.herokuapp.com/rws-cards-api.herokuapp.com/api/v1/cards/random?n=3`);
  document.querySelector('#question').classList.add('hidden');
  setTimeout(function () {
    document.querySelector('#question').innerHTML = `<p>${question}</p>`;
    document.querySelector('#question').classList.add('fade-in');
  }, 1000);
  console.log(result);
  
  // display cards face-down on page

  setTimeout(function () {
    document.querySelector('.one .card-back').classList.add('fade-in');
  }, 1000);
  setTimeout(function () {
    document.querySelector('.two .card-back').classList.add('fade-in');
  }, 2000);
  setTimeout(function () {
    document.querySelector('.three .card-back').classList.add('fade-in');
  }, 3000);

  // loop through cards and assign results to each
  // display each card when clicked

  const cardArray = document.querySelectorAll('.card');
  for (let i = 0; i < cardArray.length; i++) {
    const cardName = result.data.cards[i].name;
    const cardDesc = result.data.cards[i].meaning_up;
    const cardRef = result.data.cards[i].name_short;
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('hidden');
    cardContainer.innerHTML = `<h3>${cardName}</h3><p>${cardDesc}</p>`;
    cardArray[i].querySelector('.crop').innerHTML = `<img src="images/${cardRef}.jpg">`;
    cardArray[i].appendChild(cardContainer);  
    cardArray[i].addEventListener('click', function (event) {
      cardArray[i].querySelector('.crop').classList.add('fade-in');
      cardContainer.classList.add('fade-in');
    });
  }

})
