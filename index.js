let player = {
    name: "Player",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let playerEl = document.getElementById("player-el")
let dealerssumEl = document.getElementById("dealerssum-el")
let dealerssum = 0
let totalBet = document.getElementById("total-bet")
let activeBet = 0
let cardImages = [
    "/images/cards/card_empty.png",
    "/images/cards/card_hearts_A.png",
    "/images/cards/card_hearts_02.png",
    "/images/cards/card_hearts_03.png",
    "/images/cards/card_hearts_04.png",
    "/images/cards/card_hearts_05.png",
    "/images/cards/card_hearts_06.png",
    "/images/cards/card_hearts_07.png",
    "/images/cards/card_hearts_08.png",
    "/images/cards/card_hearts_09.png",
    "/images/cards/card_hearts_10.png",
    "/images/cards/card_hearts_J.png",
    "/images/cards/card_hearts_Q.png",
    "/images/cards/card_hearts_K.png"
]
let card1 = document.getElementById("card1")
let card2 = document.getElementById("card2")



playerEl.textContent = player.name + ": " + player.chips + "£"

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    card1.src = cardImages[firstCard]
    card2.src = cardImages[secondCard]
    
    let imgContainer = document.getElementById('card-container');
    imgContainer.innerHTML = "";
    let imgContainerDealer = document.getElementById('dealer-cards');
    imgContainerDealer.innerHTML = "";
    
    document.getElementById("newcard-btn").innerHTML = "New Card"
    document.getElementById("stay-btn").innerHTML = "Stay"
    document.getElementById("start-btn").innerHTML = ""
    document.getElementById("bet1").innerHTML = ""
    document.getElementById("bet5").innerHTML = ""
    document.getElementById("betall").innerHTML = ""
    renderGame()
}

function renderGame() {
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "Blackjack! Do you want to make a bet before you start a new game?"
        hasBlackJack = true
        isAlive = false
        player.chips += activeBet 
        player.chips += activeBet 
        playerEl.textContent = player.name + ": " + player.chips + "£"
        betReset()
        activeBet = 0
        buttonReset()
        
    } else {
        message = "You're out! Do you want to make a bet before you start a new game?"
        isAlive = false
        betReset()
        activeBet = 0
        buttonReset()
    }
    messageEl.textContent = message

    dealerssum = 0
    dealerssumEl.textContent = "Sum:"
    
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        
        let cardImg = document.createElement("img");
        cardImg.src = cardImages[card];
        let imgContainer = document.getElementById("card-container")
        imgContainer.appendChild(cardImg);
        
        renderGame()        
    }
}

function bet1() {
    if (isAlive === false) {
        player.chips -= 1
        activeBet += 1
        playerEl.textContent = player.name + ": " + player.chips + "£"
        totalBet.textContent = "Bet = " + activeBet + "£"
    }
    //+5 everytime player presses button. Cant be pressed when player=alive
}
function bet5() {
    if (isAlive === false) {
        player.chips -= 5
        activeBet += 5
        playerEl.textContent = player.name + ": " + player.chips + "£"
        totalBet.textContent = "Bet = " + activeBet + "£"
    }
    //+5 everytime player presses button. Cant be pressed when player=alive
}
function betall() {
    if (isAlive === false) {
        activeBet += player.chips
        player.chips -= player.chips
        playerEl.textContent = player.name + ": " + player.chips + "£"
        totalBet.textContent = "Bet = " + activeBet + "£"
    }
    //+5 everytime player presses button. Cant be pressed when player=alive
}

function endGame() {
    isAlive = false
    if (dealerssum <= sum && sum < 22 && hasBlackJack === false) {
        let card = getRandomCard()
        dealerssum += card
        dealerssumEl.textContent = "Sum: " + dealerssum   
        
        let cardImg = document.createElement("img");
        cardImg.src = cardImages[card];
        let imgContainer = document.getElementById("dealer-cards")
        imgContainer.appendChild(cardImg);
    
        endGame()
    }
    else {  
    }
    
    if (dealerssum > sum && dealerssum < 22) {
        messageEl.textContent = "You lose! Do you want to make a bet before you start a new game?"
        betReset()
        activeBet = 0
        buttonReset()
    }
    if (dealerssum > sum && dealerssum >= 22) {
        messageEl.textContent = "You win! Do you want to make a bet before you start a new game?"
        player.chips += activeBet 
        player.chips += activeBet 
        playerEl.textContent = player.name + ": " + player.chips + "£"
        betReset()
        activeBet = 0
        buttonReset()
    }
    //dealer draws cards until more than player.
    //if more than player, bet is lost
    //if less than player or more than 21 bet * 2 is returned to player.chips
    //player=dead
    
}

function buttonReset() {
    document.getElementById("newcard-btn").innerHTML = ""
    document.getElementById("stay-btn").innerHTML = ""
    document.getElementById("start-btn").innerHTML = "Start Game"
    document.getElementById("bet1").innerHTML = "1£"
    document.getElementById("bet5").innerHTML = "5£"
    document.getElementById("betall").innerHTML = "ALL"
}

function betReset() {
    totalBet.textContent = "Bet = 0£"
}
