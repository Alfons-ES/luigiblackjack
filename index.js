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
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerssumEl = document.getElementById("dealerssum-el")
let dealerscardsEl = document.getElementById("dealerscards-el")
let dealerscards = []
let dealerssum = 0
let betBtn = document.getElementById("bet-btn")
let activeBet = 0

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
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
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
        betBtn.textContent = "Bet"
        activeBet = 0
    } else {
        message = "You're out! Do you want to make a bet before you start a new game?"
        isAlive = false
        betBtn.textContent = "Bet"
        activeBet = 0
    }
    messageEl.textContent = message
    dealerscards = []
    dealerscardsEl.textContent = "Luigi's Cards:"
    dealerssum = 0
    dealerssumEl.textContent = "Sum:"
    
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function bet() {
    if (isAlive === false) {
        console.log("betted")
        player.chips -= 5
        activeBet += 5
        playerEl.textContent = player.name + ": " + player.chips + "£"
        betBtn.textContent = "Bet = " + activeBet + "£"
    }
    //+5 everytime player presses button. Cant be pressed when player=alive
}

function endGame() {
    isAlive = false
    if (dealerssum <= sum && sum < 22 && hasBlackJack === false) {
        let card = getRandomCard()
        dealerssum += card
        dealerssumEl.textContent = "Sum: " + dealerssum
        dealerscards.push(card)
        dealerscardsEl.textContent = "Luigi's Cards: "
        for (let i = 0; i < dealerscards.length; i++) {
            dealerscardsEl.textContent += dealerscards[i] + " "
        }
        endGame()
    }
    else {  
    }
    
    if (dealerssum > sum && dealerssum < 22) {
        messageEl.textContent = "You lose! Do you want to make a bet before you start a new game?"
        betBtn.textContent = "Bet"
        activeBet = 0
        
    }
    if (dealerssum > sum && dealerssum >= 22) {
        messageEl.textContent = "You win! Do you want to make a bet before you start a new game?"
        player.chips += activeBet 
        player.chips += activeBet 
        playerEl.textContent = player.name + ": " + player.chips + "£"
        betBtn.textContent = "Bet"
        activeBet = 0
        
    }
    //dealer draws cards until more than player.
    //if more than player, bet is lost
    //if less than player or more than 21 bet * 2 is returned to player.chips
    //player=dead
    
}
window.startGame = startGame
window.newCard = newCard
window.endGame = endGame
window.bet = bet
