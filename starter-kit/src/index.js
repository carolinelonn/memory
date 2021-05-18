import "./styles.scss";

//Set number of pairs of cards the game should contains
const pairs = 6;

//Set up empty global variables
let cards = [];
let openedCards = [];
let moves = 0;
let matches = 0;

//Link to the image on the back on the memory cards
const backgroundImage = "url(https://coolbackgrounds.io/images/backgrounds/index/sea-edge-79ab30e2.png)";

//Adds starting value to update element
document.getElementById('progress').innerHTML = matches + "/" + pairs;

//Set up is run on window.onload.
const setUp = () => {
    //Loop for number of pairs and creates two identical cards (grid-items with different id:s) and adds them to the cards array.
    for (let i = 0; i < pairs; i++) {
        // Each pair is assigned a letter as a part of their id starting with 'a' 
        let letter = String.fromCharCode(97 + i);

        const card1 = document.createElement('div');
        const card2 = document.createElement('div');

        card1.className = "grid-item closed";
        card2.className = "grid-item closed";

        card1.id = letter + 1;
        card2.id = letter + 2;

        card1.addEventListener("click", () => displayCard(card1))
        card2.addEventListener("click", () => displayCard(card2))

        card1.style.backgroundImage = backgroundImage;
        card2.style.backgroundImage = backgroundImage;

        cards.push(card1, card2);
    }
    //Sorts the card into a random order and appends them to the DOM in the deck div
    cards.sort((e) => Math.random() - 0.5)
    cards.forEach(card => document.getElementById('deck').appendChild(card));
}

//Hides and displays the card by adding or removing the open style and changing the background image
const displayCard = (card) => {
    card.classList.toggle("open");
    if (card.classList.contains("open")) {
        //The images for the cards are retrieved from the example-image-server the image is decided by the letter in the cards id 
        card.style.backgroundImage = "url(http://localhost:8111/png/" + card.id[0] + "/300)";
        cardOpen(card)
    } else {
        card.style.backgroundImage = backgroundImage;
    }
 }

 //Creates a list of open cards, counts the number of moves and detects if it is a match or not
const cardOpen = (card) => {
    openedCards.push(card);
    if(openedCards.length === 2){
        moves+=1;
        if(openedCards[0].id[0] === openedCards[1].id[0]){
            matched();
        } else {
            noMatch();
        }
    }
};

//Updates number of matches, changes styling class from open to matched and shows the celecbration div if all cards are matched
const matched = () => {
    matches+=1;
    openedCards.forEach(card => {
        card.classList.add("match")
        card.classList.remove("open")
    })
    openedCards = [];
    document.getElementById('progress').innerHTML = matches + "/" + pairs;
    if (matches === pairs) {
        document.getElementById("celebration").style.display = "flex";
        document.getElementById("moves").innerHTML = moves;
        document.body.style.overflow = "hidden";
    }
}

//Updates the styling to noMatch and disables the other cards for 1 second before hiding the cards again
const noMatch = () => {
    openedCards[0].classList.add("noMatch");
    openedCards[1].classList.add("noMatch");
    document.getElementById("deck").classList.add("disable");
    setTimeout(function(){
        openedCards.forEach(card=> {
            card.classList.remove("open", "noMatch");
            card.style.backgroundImage = backgroundImage;
        })
        deck.classList.remove("disable");
        openedCards = [];
    },1000);
}

window.onload = setUp();