
# Tarot Reading

## Description

This application provides a web-based interface for simulated tarot card readings. The user can select their preferred spread, as well as type in their own question which will stay on the page throughout the reading. Once the user clicks the "Ask the Cards" button, the cards will appear face-down on the page in their respective positions based on the selected spread. Cards can be clicked to reveal them, with their name and description appearing below. 

The application can be accessed online at: http://tarot-universe.surge.sh/

## API

The application utilizes the RWS Tarot Card API, found here: https://rws-cards-api.herokuapp.com/

The API is used to provide an array of random card objects from their database of all 78 tarot cards. The API provides the name and description of each card shown to the user.

## Features

#### Question Input

The web page utilizes a text input field at the top of the screen where users can type in their own question to "ask the cards," which will subsequently be displayed above their reading so that they may refer back to the question they asked as they explore each card.

#### Multiple Spreads

There are three different spread layouts to choose from, selected above the question input. These spreads offer alternative readings for users to explore in regards to their question. The spreads offered are "Single Card", "Three Card", and "Pyramid". Single Card readings generate only one card on the page, while Three Card readings present three sequential cards. The pyramid reading is the most complex, generating six cards layed out in a triangle. The instructions will update for each spread once the reading begins.

#### Randomized Card Selection

After submitting a question, the screen is populated with face-down cards unique to each reading. When clicked, the card is flipped, populated by a randomly generated card value from the API, and a description of its meaning generates below the card's position. This functionality applie to all the cards on the page and no duplicates will be produced.

#### Reversed Cards

Cards have a potential of showing up reversed within a reading. The meaning for these cards differs from their upright counterparts, and thus alternative text will display.

#### Clear Board

There is a button to clear the board and start a new reading at the top of the page, which only appears once a reading has begun. The entire page will return to its default state when this button is clicked, meaning the current question and spread will disappear.

#### CSS Animations

CSS animations have been incorporated to make the interface more dynamic. There are fade effects for most of the page elements, as well as a flipping animation for each card when clicked. The background is also animated, scrolling across the screen to produce the effect of moving through space.

## Known Issues

#### API Load Time

The API request sometimes takes too long to load. This seems to be a problem with the API itself, or could be related to utilizing CORS Anywhere. Sometimes the request stalls entirely before failing altogether. An alert has been implemented to handle such cases, urging the user to refresh the page and try again. Usually this issue resolves itself within a few minutes.

#### Tarot Card Descriptions

Descriptions for all the cards are pulled directly from the API. Some cards' descriptions contain typos, while a few reversed cards are left blank. The descriptions also lack any uniform structure, where some cards go into far more detail than others and the amount of text displayed is too variable. This issue may be resolved in the future by incorporating custom descriptions into the code.