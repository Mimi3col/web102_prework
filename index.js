/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file

import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let index = 0; index < games.length; index++) {
        let newCard  = document.createElement("div"); 
        newCard.classList.add("game-card"); 

        const  display = `
            <h1>${games[index].name}</h1>
            <img class = "game-img" src="${games[index].img}"> </img> 
            <p>${games[index].description}</p>
            <b>${games[index].goal} : ${games[index].pledged}</b>
            `;
// want to add something in about reaching the goal or not;
        newCard.innerHTML = display; 
        gamesContainer.append(newCard); 

        // create a new div element, which will become the game card

    }
        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalBackers = GAMES_JSON.reduce((acc, GAMES_JSON) =>{
    return acc + GAMES_JSON.backers;
 }, 0); 

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.append('$'+totalBackers.toLocaleString());

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalRaised = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.pledged;
}, 0); 
// set inner HTML using template literal
raisedCard.append('$'+totalRaised.toLocaleString());

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let numGames =GAMES_JSON.length;

gamesCard.append(numGames);

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    let unFunded = GAMES_JSON.filter ( (GAMES_JSON) => { 
        return GAMES_JSON.goal > GAMES_JSON.pledged;
    });

    // use the function we previously created to add the unfunded games to the DOM
    
    addGamesToPage(unFunded); 
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((GAMES_JSON) => {
        return GAMES_JSON.goal < GAMES_JSON.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM

    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    //addGamesToPage(GAMES_JSON);
    // wanted to add them sorted
    addGamesToPage(sortedGames);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly); 
allBtn.addEventListener("click",showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

    let unFunded = GAMES_JSON.filter ( (GAMES_JSON) => {
        return GAMES_JSON.goal > GAMES_JSON.pledged;
    });

    let numUnFunded = unFunded.length;
    let rallyCry = document.createElement("p");

// create a string that explains the number of unfunded games using the ternary operator

// I just wanted a cleaner  ? statement
     let multiUnFunded = ` 
     A total of ${totalRaised.toLocaleString('en-US')} Has been raised for ${numGames.toLocaleString('en-US')} games. Currently, ${numUnFunded.toLocaleString('en-US')} games remain unfunded. We need your help to fund these Amazing Games!!
     `;

      let singUnFunded = `
    A total of ${totalRaised.toLocaleString('en-US')} Has been raised for ${numGames.toLocaleString('en-US')} games. Currently, ${numUnFunded.toLocaleString('en-US')} game remain unfunded. We need your help to fund this Amazing Game!!
    `;

    let displayUnFunded = (Number(numUnFunded) > 1) ? multiUnFunded : singUnFunded;

// create a new DOM element containing the template string and append it to the description container
    const {displayUnFunded: displayUnFunded1} = rallyCry.outerHTML;
    descriptionContainer.append(displayUnFunded); 

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");


// const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
//     return item2.pledged - item1.pledged;
// });

//const sortedGames = JSON.parse(GAMES_DATA);

const sortedGames = GAMES_JSON.sort((first,second) => {return second.pledged - first.pledged});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...other] = sortedGames;

// // create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameDiv = document.createElement('div');
firstGameDiv.innerHTML = `${firstGame.name}`;
firstGameContainer.append(firstGameDiv);

// do the same for the runner up item
let secondGameDiV = document.createElement('div');
secondGameDiV.innerHTML = `${secondGame.name}`;
secondGameContainer.append(secondGameDiV);
