"use strict";
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
const shuffleDeck = (deck) => {
    const cardsCount = deck.length;
    let indexTrash = [];
    let shuffleDeck = [];
    for (let i = 0; i < cardsCount; i++) {
        let okToContinue = false;
        while (okToContinue !== true) {
            const randomInd = Math.floor(Math.random() * (52 - 1 + 1) + 1);
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
let fullDeck = shuffleDeck(club.concat(heart, diamond, spade));
console.log(fullDeck);
