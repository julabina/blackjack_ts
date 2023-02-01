"use strict";
const bankCard = document.querySelector('.bj__cpu__card');
const bankPoint = document.querySelector('.bj__cpu__point');
const playBtn = document.querySelector('.playBtn');
const bankP = bankCard?.querySelector('p');
const startGameBtn = document.getElementById('startGame');
const paramsCards = document.getElementById('selectCards');
const paramsPlayers = document.getElementById('selectPlayers');
const playersContainer = document.querySelector('.bj__players');
let players = [];
let bankTotal = 0;
let deckCount = 0;
let rulesFromFr = false;
let bankSecondCard;
let finalDeck = [];
let percentPlayerSixty = 0;
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
    playBtn?.classList.remove("playBtn--hidden");
    if (playersContainer) {
        playersContainer.innerHTML = "";
    }
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
            const ply = { name: "player " + (i + 1).toString(), total: 0, money: 15000, status: "pending" };
            players.push(ply);
            const playerDiv = document.createElement("div");
            playerDiv.className = "bj__players__div";
            /* const playerMoney = document.createElement('p');
            playerMoney.textContent = ply.money + " €";
            playerMoney.className = "playerMoney";
            playerDiv.appendChild(playerMoney); */
            const playerName = document.createElement('h2');
            playerName.textContent = ply.name;
            playerDiv.appendChild(playerName);
            const playerStatus = document.createElement('h3');
            playerStatus.className = "playerStatus";
            playerDiv.appendChild(playerStatus);
            const playerCardDiv = document.createElement('div');
            const playerCards = document.createElement('p');
            playerCardDiv.appendChild(playerCards);
            playerCards.className = "playersCards";
            const playerTotal = document.createElement('p');
            playerTotal.className = "playersTotal";
            playerDiv.appendChild(playerCardDiv);
            playerDiv.appendChild(playerTotal);
            const playerHitBtn = document.createElement("button");
            playerHitBtn.addEventListener('click', function () {
                hitFunc(i);
            });
            const playerStandBtn = document.createElement("button");
            playerStandBtn.addEventListener('click', function () {
                standFunc(i);
            });
            const playerAsBtn = document.createElement("button");
            playerAsBtn.addEventListener('click', function () {
                asFunc(i);
            });
            playerHitBtn.textContent = "Carte";
            playerStandBtn.textContent = "Stop";
            playerAsBtn.textContent = "As = 1";
            const playerDivBtn = document.createElement('div');
            playerAsBtn.className = "playerAsBtn playerAsBtn--hidden";
            playerDivBtn.className = "playerDivBtn playerDivBtn--hidden";
            playerDivBtn.appendChild(playerHitBtn);
            playerDivBtn.appendChild(playerStandBtn);
            playerDivBtn.appendChild(playerAsBtn);
            playerDiv.appendChild(playerDivBtn);
            playersContainer?.appendChild(playerDiv);
        }
        finalDeck = shuffleDeck();
    }
};
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
 * distribute cards for all player
 *
 * @param e
*/
const distribution = (e) => {
    initStat();
    const playersCards = document.querySelectorAll('.playersCards');
    const playersTotal = document.querySelectorAll('.playersTotal');
    const asBtns = document.querySelectorAll('.playerAsBtn');
    bankTotal = 0;
    if (deckCardCount + 1 >= finalDeck.length) {
        finalDeck = shuffleDeck();
        deckCardCount = 0;
    }
    if (bankP && bankPoint) {
        bankP.textContent = finalDeck[deckCardCount].name;
        bankTotal = finalDeck[deckCardCount].value;
        bankPoint.textContent = (bankTotal).toString();
        deckCardCount++;
        if (rulesFromFr === false) {
            bankSecondCard = finalDeck[deckCardCount];
            deckCardCount++;
        }
    }
    for (let i = 0; i < players.length; i++) {
        if (deckCardCount + 1 >= finalDeck.length) {
            finalDeck = shuffleDeck();
            deckCardCount = 0;
        }
        playersCards[i].textContent = finalDeck[deckCardCount].name;
        playersTotal[i].textContent = finalDeck[deckCardCount].value.toString();
        if (finalDeck[deckCardCount].name === "As") {
            asBtns[i].classList.remove("playerAsBtn--hidden");
        }
        players[i].total = finalDeck[deckCardCount].value;
        deckCardCount++;
    }
    for (let i = 0; i < players.length; i++) {
        if (deckCardCount + 1 >= finalDeck.length) {
            finalDeck = shuffleDeck();
            deckCardCount = 0;
        }
        playersCards[i].textContent += " " + finalDeck[deckCardCount].name;
        let t1 = 0;
        if (finalDeck[deckCardCount].name === "As") {
            if (players[i].total === 11) {
                asBtns[i].classList.add("playerAsBtn--hidden");
                t1 = 1;
            }
            else {
                t1 = finalDeck[deckCardCount].value;
                asBtns[i].classList.remove("playerAsBtn--hidden");
            }
        }
        else {
            t1 = finalDeck[deckCardCount].value;
        }
        const t2 = t1 + players[i].total;
        players[i].total = t2;
        playersTotal[i].textContent = t2.toString();
        deckCardCount++;
    }
    for (let i = 0; i < players.length; i++) {
        if (players[i].total === 21) {
            players[i].status = "BJ";
        }
    }
    playBtn?.classList.add("playBtn--hidden");
    startGame();
};
const hitFunc = (a) => {
    const playersCards = document.querySelectorAll('.playersCards');
    const playersTotal = document.querySelectorAll('.playersTotal');
    const playersBtns = document.querySelectorAll('.playerDivBtn');
    const asBtns = document.querySelectorAll('.playerAsBtn');
    const cardText = playersCards[a].textContent + " " + finalDeck[deckCardCount].name;
    let cardsTotal = players[a].total + finalDeck[deckCardCount].value;
    asBtns[a].classList.add('playerAsBtn--hidden');
    if (deckCardCount + 1 >= finalDeck.length) {
        finalDeck = shuffleDeck();
        deckCardCount = 0;
    }
    if (finalDeck[deckCardCount].name === "As") {
        if (cardsTotal > 21) {
            cardsTotal = cardsTotal - 10;
        }
        else {
            asBtns[a].classList.remove('playerAsBtn--hidden');
        }
    }
    players[a].total = cardsTotal;
    playersTotal[a].textContent = cardsTotal.toString();
    playersCards[a].textContent = cardText;
    deckCardCount++;
    if (cardsTotal > 21) {
        playersBtns[a].classList.add("playerDivBtn--hidden");
        players[a].status = "lose";
        if ((a + 1) < players.length) {
            playersBtns[a + 1].classList.remove("playerDivBtn--hidden");
        }
        else {
            cpuTurn();
        }
    }
    else if (cardsTotal === 21) {
        playersBtns[a].classList.add("playerDivBtn--hidden");
        players[a].status = "black jack";
        if ((a + 1) < players.length) {
            playersBtns[a + 1].classList.remove("playerDivBtn--hidden");
        }
        else {
            cpuTurn();
        }
    }
};
const standFunc = (a) => {
    const playersBtns = document.querySelectorAll('.playerDivBtn');
    playersBtns[a].classList.add("playerDivBtn--hidden");
    if (players[a].status !== "BJ") {
        players[a].status = "stand";
    }
    if ((a + 1) < players.length) {
        if (players[a + 1].status === "BJ") {
            standFunc(a + 1);
        }
        else {
            playersBtns[a + 1].classList.remove("playerDivBtn--hidden");
        }
    }
    else {
        cpuTurn();
    }
};
const asFunc = (a) => {
    const asBtns = document.querySelectorAll('.playerAsBtn');
    const playersTotal = document.querySelectorAll('.playersTotal');
    asBtns[a].classList.add('playerAsBtn--hidden');
    const pTotal = players[a].total - 10;
    players[a].total = pTotal;
    playersTotal[a].textContent = pTotal.toString();
};
const cpuTurn = () => {
    if (bankP && bankPoint) {
        if (rulesFromFr === true) {
            bankSecondCard = finalDeck[deckCardCount];
            deckCardCount++;
        }
        bankP.textContent += bankSecondCard.name;
        const total = bankTotal + bankSecondCard.value;
        bankTotal = total;
        bankPoint.textContent = total.toString();
    }
    if (players.length <= 2) {
        percentPlayerSixty = 1;
    }
    else {
        percentPlayerSixty = Math.round((players.length / 100) * 66);
    }
    cpuAi();
};
const cpuAi = () => {
    let winRate = 0;
    let win = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].total === 21) {
            winRate -= 1;
        }
        else if (players[i].total > 21) {
            winRate += 1;
            win++;
        }
        else {
            if (bankTotal > players[i].total) {
                winRate += 1;
                win++;
            }
            else if (bankTotal < players[i].total) {
                winRate -= 1;
            }
            else {
                winRate += 1;
            }
        }
    }
    if (bankTotal && bankTotal === 21) {
        verifyGame();
    }
    else if (bankTotal && bankTotal <= 11) {
        if (bankP && bankPoint) {
            bankP.textContent += finalDeck[deckCardCount].name;
            bankTotal = bankTotal + finalDeck[deckCardCount].value;
            bankPoint.textContent = bankTotal.toString();
            deckCardCount++;
        }
        cpuAi();
    }
    else if (bankTotal && bankTotal < 21) {
        if (winRate < 0) {
            if (bankP && bankPoint) {
                bankP.textContent += finalDeck[deckCardCount].name;
                bankTotal = bankTotal + finalDeck[deckCardCount].value;
                bankPoint.textContent = bankTotal.toString();
                deckCardCount++;
            }
            cpuAi();
        }
        else if (win >= percentPlayerSixty) {
            verifyGame();
        }
        else if (bankTotal && bankTotal <= 14) {
            if (bankP && bankPoint) {
                bankP.textContent += finalDeck[deckCardCount].name;
                bankTotal = bankTotal + finalDeck[deckCardCount].value;
                bankPoint.textContent = bankTotal.toString();
                deckCardCount++;
            }
            cpuAi();
        }
        else {
            verifyGame();
        }
    }
    else {
        verifyGame();
    }
};
const verifyGame = () => {
    const playersStatus = document.querySelectorAll('.playerStatus');
    if (bankTotal <= 21) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].total <= 21) {
                if (bankTotal > players[i].total) {
                    playersStatus[i].textContent = "Perdu";
                }
                else if (bankTotal < players[i].total) {
                    playersStatus[i].textContent = "Gagné";
                }
                else if (bankTotal === players[i].total) {
                    playersStatus[i].textContent = "Draw";
                }
            }
            else {
                playersStatus[i].textContent = "Perdu";
            }
        }
    }
    else {
        for (let i = 0; i < players.length; i++) {
            if (players[i].status === "BJ") {
                playersStatus[i].textContent = "Black Jack";
            }
            else if (players[i].status === "lose") {
                playersStatus[i].textContent = "Perdu";
            }
            else {
                playersStatus[i].textContent = "Gagné";
            }
        }
    }
    playBtn?.classList.remove("playBtn--hidden");
};
const startGame = () => {
    const playersBtns = document.querySelectorAll('.playerDivBtn');
    for (let i = 0; i < players.length; i++) {
        if (players[i].status !== "BJ") {
            playersBtns[i].classList.remove("playerDivBtn--hidden");
            break;
        }
    }
};
const initStat = () => {
    const playersStatus = document.querySelectorAll('.playerStatus');
    const playersBtns = document.querySelectorAll('.playerDivBtn');
    const asBtns = document.querySelectorAll('.playerAsBtn');
    for (let i = 0; i < players.length; i++) {
        if (bankP && bankPoint) {
            bankP.textContent = "";
            bankPoint.textContent = "";
            bankTotal = 0;
        }
        playersStatus[i].textContent = "";
        players[i].total = 0;
        players[i].status = "pending";
        asBtns[i].classList.add('playerAsBtn--hidden');
        playersBtns[i].classList.add("playerDivBtn--hidden");
    }
};
startGameBtn?.addEventListener('click', loadGameParams);
playBtn?.addEventListener('click', distribution);
