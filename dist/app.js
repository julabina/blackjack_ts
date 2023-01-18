"use strict";
const bankCard = document.querySelector('.bj__cpu__card');
const bankPoint = document.querySelector('.bj__cpu__point');
const player1Card = document.querySelector('.bj__players__1__card');
const player1Point = document.querySelector('.bj__players__1__point');
const playBtn = document.getElementById('playBtn');
const bankP = bankCard?.querySelector('p');
const startGameBtn = document.getElementById('startGame');
const paramsCards = document.getElementById('selectCards');
const paramsPlayers = document.getElementById('selectPlayers');
const playersContainer = document.querySelector('.bj__players');
let players = [];
let bankTotal = 0;
let deckCount = 0;
let rulesFromFr = false;
/**
 * create one family deck
 *
 * @param fam
 * @returns Card[]
 */
const createDeck = (fam) => {
    let deck = [
        { name: "As", value: 1 | 11, family: fam },
        { name: "2", value: 2, family: fam },
        { name: "3", value: 3, family: fam },
        { name: "4", value: 4, family: fam },
        { name: "5", value: 5, family: fam },
        { name: "6", value: 6, family: fam },
        { name: "7", value: 7, family: fam },
        { name: "8", value: 8, family: fam },
        { name: "9", value: 9, family: fam },
        { name: "10", value: 10, family: fam },
        { name: "Valet", value: 10, family: fam },
        { name: "Reine", value: 10, family: fam },
        { name: "Roi", value: 10, family: fam }
    ];
    return deck;
};
/**
 * shuffle all decks
 *
 * @returns Cards[]
 */
const shuffleDeck = () => {
    const cardsCount = 52 * deckCount;
    let deck = [];
    if (cardsCount === 52) {
        deck = fullDeck;
    }
    else {
        for (let j = 0; j < deckCount; j++) {
            if (j === 0) {
                deck = fullDeck;
            }
            else {
                deck = deck.concat(fullDeck);
            }
        }
    }
    let indexTrash = [];
    let shuffleDeck = [];
    for (let i = 0; i < cardsCount; i++) {
        let okToContinue = false;
        while (okToContinue !== true) {
            const randomInd = Math.floor(Math.random() * (cardsCount - 1 + 1) + 1);
            if (!indexTrash.includes(randomInd - 1)) {
                shuffleDeck.push(deck[randomInd - 1]);
                indexTrash.push(randomInd - 1);
                okToContinue = true;
            }
        }
    }
    return shuffleDeck;
};
let club = createDeck("trefle");
let heart = createDeck("coeur");
let diamond = createDeck("carreau");
let spade = createDeck("pique");
let fullDeck = club.concat(heart, diamond, spade);
let deckCardCount = 0;
/**
 * load all game params
 *
 * @param e
 */
const loadGameParams = (e) => {
    e.preventDefault();
    const frRule = document.getElementById("frRule");
    const usRule = document.getElementById("usRule");
    players = [];
    console.log(frRule, usRule);
    if (paramsPlayers && paramsCards && frRule && usRule) {
        const p = parseInt(paramsPlayers.value);
        deckCount = parseInt(paramsCards.value);
        if (frRule.checked) {
            rulesFromFr = true;
        }
        else if (usRule.checked) {
            rulesFromFr = false;
        }
        for (let i = 0; i < p; i++) {
            const ply = { name: "player " + (i + 1).toString(), total: 0, money: 15000 };
            players.push(ply);
        }
        shuffleDeck();
    }
};
/**
 * distribute cards for all player
 *
 * @param e
*/
/*
const distribution = (e: Event) => {
    console.log("------------------");
    
    player1Total = 0;
    bankTotal = 0;

    if (bankP && bankPoint && player1P && player1Point) {
        bankP.textContent = fullDeck[deckCardCount].name;
        bankTotal = fullDeck[deckCardCount].value;
        bankPoint.textContent = (bankTotal).toString();
        deckCardCount++;
        
        player1P.textContent = fullDeck[deckCardCount].name;
        player1Total = fullDeck[deckCardCount].value;
        deckCardCount++;

        player1P.textContent += fullDeck[deckCardCount].name;
        player1Total += fullDeck[deckCardCount].value;
        player1Point.textContent = (player1Total).toString();
        deckCardCount++;
        
        if (player1Total === 21) {
            console.log("BLACK JACK");
        }
    }
};

const hit = () => {
    if (player1P && player1Point) {
        player1P.textContent += fullDeck[deckCardCount].name;
        player1Total += fullDeck[deckCardCount].value;
        player1Point.textContent = (player1Total).toString();
        deckCardCount++;
        
        if (player1Total === 21) {
            console.log("BLACK JACK");
        } else if (player1Total > 21) {
            console.log("LOSE");
        }
    }
};

const stand = () => {
    if (bankP && bankPoint) {
        bankP.textContent += fullDeck[deckCardCount].name;
        bankTotal += fullDeck[deckCardCount].value;
        bankPoint.textContent = (bankTotal).toString();
        deckCardCount++;

        //insert IA

        if (bankTotal === player1Total) {
            console.log("draw");
        } else if (bankTotal > player1Total) {
            console.log("LOSE");
        } else if (bankTotal < player1Total) {
            console.log("WIN");
            
        }
    }
}; */
startGameBtn?.addEventListener('click', loadGameParams);
//playBtn?.addEventListener('click', distribution);
