type Card = {name: string, value: number, family?: string};
type Player = {name: string, total: number, money: number, status?: string};

const bankCard = document.querySelector('.bj__cpu__card');
const bankPoint = document.querySelector('.bj__cpu__point');
const player1Card = document.querySelector('.bj__players__1__card');
const player1Point = document.querySelector('.bj__players__1__point');
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
    console.log(players[a].total);
}

const standFunc = (a: number) => {
    console.log(players[a].total);
}

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

    const playersCards = document.querySelectorAll('.playersCards');
    const playersTotal = document.querySelectorAll('.playersTotal');
    
    bankTotal = 0;

    for (let i = 0; i < players.length; i++) {
        
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
        playersCards[i].textContent = finalDeck[deckCardCount].name;
        playersTotal[i].textContent = finalDeck[deckCardCount].value.toString();
        players[i].total = finalDeck[deckCardCount].value;
        deckCardCount++;
    }
    
    for (let i = 0; i < players.length; i++) {
        playersCards[i].textContent += finalDeck[deckCardCount].name;
        const t2: number = finalDeck[deckCardCount].value + players[i].total;
        players[i].total = t2;
        playersTotal[i].textContent = t2.toString();
        deckCardCount++;
    }

    for (let i = 0; i < players.length; i++) {
        if (players[i].total === 21) {
            console.log("BLACK JACK", players[i].name)
        }
    }

    
};

/* 
const hit = () => {
    if (player1P && player1Point) {
        player1P.textContent += finalDeck[deckCardCount].name;
        player1Total += finalDeck[deckCardCount].value;
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
        bankP.textContent += finalDeck[deckCardCount].name;
        bankTotal += finalDeck[deckCardCount].value;
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
playBtn?.addEventListener('click', distribution);