document.querySelector('button').addEventListener('click', async function (event) {
  const result = await axios.get(`https://cors-anywhere.herokuapp.com/rws-cards-api.herokuapp.com/api/v1/cards/random?n=1`);
  console.log(result);
  const cardName = result.data.cards[0].name;
  const cardDesc = result.data.cards[0].meaning_up;
  const cardContainer = document.createElement('div');
  cardContainer.innerHTML = `<h3>${cardName}</h3><p>${cardDesc}</p>`;
  document.querySelector('.one').appendChild(cardContainer);
})
