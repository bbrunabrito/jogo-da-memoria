const front = "front"
const back = "back"
const CARD = "card"
let figures = ['anakinAd',
    'anakinKid',
    'darth',
    'han',
    'kennobi',
    'leia',
    'r2d2',
    'storm',
    'yoda']


let lockMode = false;
let firstCard = null;
let secondCard = null;
let card = null;

function setCard(id){

    let cards = card.filter(card => card.id === id)[0]

    if(cards.flippled || lockMode){
        return false
    }

    if(!firstCard){
        firstCard = cards;
        firstCard.flippled = true;
        return true
    } else {
        secondCard = cards;
        secondCard.flippled = true;
        lockMode = true;
        return true;
    }
}

startGame()

function startGame() {
    card = createCardsFromFigures(figures);
    shuffleCards(card);
    initializeCards(card)
}

function initializeCards(card){
    let gameBoard = document.querySelector('.stage')

    gameBoard.innerHTML = ''

    card.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;


        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })
}



function createCardContent(card, cardElement){
    createCardFace(front, card, cardElement);
    createCardFace(back, card, cardElement);
}


function createCardFace(face, card, element){
    let cardFaceElement = document.createElement('div');
    cardFaceElement.classList.add(face);

    if(face === front){
        let iconElement = document.createElement('img');
        iconElement.src = "./assets/image/" + card.icon + ".png";
        iconElement.classList.add("icon")

        cardFaceElement.appendChild(iconElement)
    } else {
        cardFaceElement.innerHTML = ` <i class="fab fa-galactic-republic"></i>` 
    }

    element.appendChild(cardFaceElement)
}

function shuffleCards(card) {
    let currentIndex = card.length;
    let randomIndex = 0;

    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;

        [card[randomIndex], card[currentIndex]] = [card[currentIndex], card[randomIndex]]
    }
}

function createCardsFromFigures(figures) {
    
    let card = []

    for(let figure of figures) {
        card.push(createPairFromFigure(figure))
    }

    return card.flatMap(pair => pair);
}


function createPairFromFigure(figure) {

    return [{
        id: createIdWithFigure(figure),
        icon: figure,
        flippled: false
    }, {
        id: createIdWithFigure(figure),
        icon: figure,
        flippled: false
    }]

}

function createIdWithFigure(figure) {
    return figure + parseInt(Math.random() * 1000);
}


function flipCard() {

    if(setCard(this.id)) {
    this.classList.add('flip')
    
    if(secondCard){

    if(checkMatch()) {
        cleanCards();

        if(checkGameOver()) {
            gameScreen.style.display = 'none';
            document.querySelector('.win').style.display = 'flex';
        }
    } else {

        setTimeout( () => {
        let firtsCardView = document.getElementById(firstCard.id);
        let secondCardView = document.getElementById(secondCard.id);

        firtsCardView.classList.remove("flip");
        secondCardView.classList.remove("flip")

        unflipCard()
        
        }, 1000);
    }
    }

    }
}


function checkMatch(){

    if(!firstCard || !secondCard) {
        return false;
    }
    return firstCard.icon === secondCard.icon;
}


function cleanCards() {
    firstCard = null;
    secondCard = null;
    lockMode = false;
}


function unflipCard() {
    firstCard.flippled = false;
    secondCard.flippled = false;
    cleanCards()
}


function checkGameOver() {
    return card.filter( card => !card.flippled).length == 0;
}



let restart = document.getElementById('reset')

restart.addEventListener('click', function() {
    cleanCards()
    startGame()
    document.querySelector('.win').style.display = 'none';
    gameScreen.style.display = 'block'

})