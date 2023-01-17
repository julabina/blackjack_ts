type Card = {name: string, value: number, family?: string};

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

const shuffleDeck = (deck: Card[]): Card[] => {
    const cardsCount: number = deck.length;
    let indexTrash: number[] = [];
    let shuffleDeck: Card[] = [];    
    
    for (let i = 0; i < cardsCount; i++) {
        let okToContinue: boolean = false;
        
        while (okToContinue !== true) {
            const randomInd: number = Math.floor(Math.random() * (52 - 1 + 1) + 1);          
            
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

let fullDeck: Card[] = shuffleDeck(club.concat(heart, diamond, spade)); 

console.log(fullDeck);





