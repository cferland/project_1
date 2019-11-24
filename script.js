document.querySelector('button').addEventListener('click', async function (event) {
  
  // replace input field with user question
  // incorporate loading message for longer API requests
  // save API results to result variable

  let question = document.querySelector('#question-input').value;
  let update = 'One moment please...';
  document.querySelector('#question').innerHTML = `<p>${update}</p>`;
  const result = await axios.get(`https://cors-anywhere.herokuapp.com/rws-cards-api.herokuapp.com/api/v1/cards/`);
  document.querySelector('#question').innerHTML = `<p>${question}</p>`;
  console.log(result);
  
  // declare variables for each card object property
  // display results on page

  const cardName = result.data.cards[0].name;
  const cardDesc = result.data.cards[0].meaning_up;
  const cardRef = result.data.cards[0].name_short;
  document.querySelector('.one .crop').innerHTML = `<img src="images/${cardRef}.jpg">`;
  const cardContainer = document.createElement('div');
  cardContainer.innerHTML = `<h3>${cardName}</h3><p>${cardDesc}</p>`;
  document.querySelector('.card.one').appendChild(cardContainer);

})
