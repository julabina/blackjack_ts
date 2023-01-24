type Card = {name: string, value: number, family?: string};
type Player = {name: string, total: number, money: number, status: string};

const bankCard = document.querySelector('.bj__cpu__card');
const bankPoint = document.querySelector('.bj__cpu__point');
const playBtn = document.getElementById('playBtn');
const bankP = bankCard?.querySelector('p');
const startGameBtn = document.getElementById('startGame');
const paramsCards = document.getElementById('selectCards') as HTMLSelectElement;
const paramsPlayers = document.getElementById('selectPlayers') as HTMLSelectElement;
const playersContainer = document.querySelector('.bj__players');
let players: Player[] = [];
let bankTotal: number = 0;
let deckCount: number = 0;
let rulesFromFr: boolean = false;
let bankSecondCard: Card;
let finalDeck: Card[] = [];

/**
 * create one family deck
 * 
 * @param fam 
 * @returns Card[]
 */
const createDeck = (fam: string): Card[] => {
    let deck: Card[] = [
        {name: "As", value: 1 | 11, family: fam}, 
        {name: "2", value: 2, family: fam}, 
        {name: "3", value: 3, family: fam}, 
        {name: "4", value: 4, family: fam}, 
        {name: "5", value: 5, family: fam}, 
        {name: "6", value: 6, family: fam}, 
        {name: "7", value: 7, family: fam}, 
        {name: "8", value: 8, family: fam}, 
        {name: "9", value: 9, family: fam}, 
        {name: "10", value: 10, family: fam}, 
        {name: "Valet", value: 10, family: fam}, 
        {name: "Reine", value: 10, family: fam},
        {name: "Roi", value: 10, family: fam}
    ]; 
    
    return deck;
};

/**
 * shuffle all decks
 * 
 * @returns Cards[]
 */
const shuffleDeck = (): Card[] => {
    const cardsCount: number = 52 * deckCount;
    let deck: Card[] = []  

    if (cardsCount === 52) {
        deck = fullDeck;
    } else {
        for (let j = 0; j < deckCount; j++) {
            if (j === 0) {
                deck = fullDeck;
            } else {
                deck = deck.concat(fullDeck);
            }
        }
    }   

    let indexTrash: number[] = [];
    let shuffleDeck: Card[] = [];    
    
    for (let i = 0; i < cardsCount; i++) {
        let okToContinue: boolean = false;
        
        while (okToContinue !== true) {
            const randomInd: number = Math.floor(Math.random() * (cardsCount - 1 + 1) + 1);          
            
            if (!indexTrash.includes(randomInd - 1)) {                
                shuffleDeck.push(deck[randomInd - 1]);
                indexTrash.push(randomInd - 1);
                okToContinue = true;
            }
        }        
    }
    
    return shuffleDeck; 
};

let club: Card[] = createDeck("trefle");
let heart: Card[] = createDeck("coeur");
let diamond: Card[] = createDeck("carreau");
let spade: Card[] = createDeck("pique");

let fullDeck: Card[] = club.concat(heart, diamond, spade); 
let deckCardCount: number = 0;

const hitFunc = (a: number) => {
    const playersCards = document.querySelectorAll('.playersCards');
    const playersTotal = document.querySelectorAll('.playersTotal');
    const playersBtns = document.querySelectorAll('.playerDivBtn');
    
    const cardText: string = playersCards[a].textContent + finalDeck[deckCardCount].name;
    const cardsTotal: number = players[a].total + finalDeck[deckCardCount].value;  

    if (deckCardCount + 1 >= finalDeck.length) {
        finalDeck = shuffleDeck();
        deckCardCount = 0;
    }
    
    players[a].total = cardsTotal;
    playersCards[a].textContent = cardText;
    playersTotal[a].textContent = cardsTotal.toString();
    deckCardCount++;  

    if (cardsTotal > 21) {
        playersBtns[a].classList.add("playerDivBtn--hidden");
        
        players[a].status = "lose"; 
        
        if ((a + 1) < players.length) {          
            playersBtns[a + 1].classList.remove("playerDivBtn--hidden");
        } else {
            cpuTurn();
        }
    } else if (cardsTotal === 21) {
        playersBtns[a].classList.add("playerDivBtn--hidden");
        
        players[a].status = "black jack"; 
        
        if ((a + 1) < players.length) {          
            playersBtns[a + 1].classList.remove("playerDivBtn--hidden");
        } else {
            cpuTurn();
        }
    }
};

const standFunc = (a: number) => {
    const playersBtns = document.querySelectorAll('.playerDivBtn');
    
    playersBtns[a].classList.add("playerDivBtn--hidden");
    
    players[a].status = "stand";

    if ((a + 1) < players.length) {          
        playersBtns[a + 1].classList.remove("playerDivBtn--hidden");        
    } else {
        cpuTurn();
    }
};

const cpuTurn = () => {    
    if (bankP && bankPoint) {   
        if (rulesFromFr === true) {
            bankSecondCard = finalDeck[deckCardCount]
            deckCardCount++;
        }
        bankP.textContent += bankSecondCard.name;
        const total = bankTotal + bankSecondCard.value;
        bankTotal = total;
        bankPoint.textContent = total.toString();
    }

    // insert logic

    verifyGame()
};

const verifyGame = () => {
    const playersStatus = document.querySelectorAll('.playerStatus');    

    if (bankTotal <= 21) {        
        for (let i = 0; i < players.length; i++) {
            if (players[i].total <= 21) {
                if (bankTotal > players[i].total) {
                    playersStatus[i].textContent = "Perdu";
                } else if (bankTotal < players[i].total) {
                    playersStatus[i].textContent = "Gagné";
                } else if (bankTotal === players[i].total) {
                    playersStatus[i].textContent = "Draw";
                }
            } else {
                playersStatus[i].textContent = "Perdu";
            }
        }
    } else {
        for (let i = 0; i < players.length; i++) {
            if (players[i].status === "BJ") {
                playersStatus[i].textContent = "Black Jack";
            } else if (players[i].status === "lose") {
                playersStatus[i].textContent = "Perdu";
            } else {
                playersStatus[i].textContent = "Gagné";
            }
        }
    }
};

/**
 * load all game params
 * 
 * @param e 
 */
const loadGameParams = (e: Event) => {
    e.preventDefault();
    const frRule = document.getElementById("frRule") as HTMLInputElement;
    const usRule = document.getElementById("usRule") as HTMLInputElement;
    players = [];  

    if (playersContainer) {   
        playersContainer.innerHTML = "";  
    }

    if (paramsPlayers && paramsCards && frRule && usRule) {
        const p: number = parseInt(paramsPlayers.value);
        deckCount = parseInt(paramsCards.value);

        if (frRule.checked) {
            rulesFromFr = true;
        } else if (usRule.checked) {
            rulesFromFr = false;
        }
        
        for (let i: number = 0; i < p; i++) {
            const ply: Player = {name: "player " + (i + 1).toString(), total: 0, money: 15000, status: "pending"};

            players.push(ply);

            const playerDiv = document.createElement("div");
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
            playerHitBtn.addEventListener('click', function() {
                hitFunc(i);
            });
            const playerStandBtn = document.createElement("button");
            playerStandBtn.addEventListener('click', function() {
                standFunc(i);
            });
            playerHitBtn.textContent = "Carte";
            playerStandBtn.textContent = "Stop";
            const playerDivBtn = document.createElement('div');
            playerDivBtn.className = "playerDivBtn playerDivBtn--hidden";
            playerDivBtn.appendChild(playerHitBtn);
            playerDivBtn.appendChild(playerStandBtn);
            playerDiv.appendChild(playerDivBtn);

            playersContainer?.appendChild(playerDiv);
            
        }
        
        finalDeck = shuffleDeck();
    }

};

/**
 * distribute cards for all player
 * 
 * @param e 
*/
const distribution = (e: Event) => {
    initStat();

    const playersCards = document.querySelectorAll('.playersCards');
    const playersTotal = document.querySelectorAll('.playersTotal');
    
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
            bankSecondCard = finalDeck[deckCardCount]
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
        players[i].total = finalDeck[deckCardCount].value;
        deckCardCount++;
    }
    
    for (let i = 0; i < players.length; i++) {
        if (deckCardCount + 1 >= finalDeck.length) {
            finalDeck = shuffleDeck();
            deckCardCount = 0;
        }
        playersCards[i].textContent += finalDeck[deckCardCount].name;
        const t2: number = finalDeck[deckCardCount].value + players[i].total;
        players[i].total = t2;
        playersTotal[i].textContent = t2.toString();
        deckCardCount++;
    }

    for (let i = 0; i < players.length; i++) {
        if (players[i].total === 21) {
            players[i].status = "BJ";
        }
    }

    startGame();
    
};

const startGame = () => {

    const playersBtns = document.querySelectorAll('.playerDivBtn');

    for (let i = 0; i < players.length; i++) {
        if (players[i].status !== "win") {
            playersBtns[i].classList.remove("playerDivBtn--hidden");
            break;
        }
    }

};

const initStat = () => {
    const playersStatus = document.querySelectorAll('.playerStatus');

    for (let i = 0; i < players.length; i++) {
        if (bankP && bankPoint) {   
            bankP.textContent = "";
            bankPoint.textContent = "";
            bankTotal = 0;
        }
        playersStatus[i].textContent = "";  
        players[i].total = 0;
        players[i].status = "pending";   
    }
};


startGameBtn?.addEventListener('click', loadGameParams);
playBtn?.addEventListener('click', distribution);