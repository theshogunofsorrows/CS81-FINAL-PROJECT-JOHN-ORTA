document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'image1', img: 'images/BAMBINA1.jpeg' },
        { name: 'image1', img: 'images/BAMBINA1.jpeg' },
        { name: 'image2', img: 'images/BAMBINA2.jpeg' },
        { name: 'image2', img: 'images/BAMBINA2.jpeg' },
        { name: 'image3', img: 'images/BAMBINA3.jpeg' },
        { name: 'image3', img: 'images/BAMBINA3.jpeg' },
        { name: 'image4', img: 'images/BAMBINA4.jpeg' },
        { name: 'image4', img: 'images/BAMBINA4.jpeg' },
        { name: 'image5', img: 'images/BAMBINA5.jpeg' },
        { name: 'image5', img: 'images/BAMBINA5.jpeg' },
        { name: 'image6', img: 'images/BAMBINA6.jpeg' },
        { name: 'image6', img: 'images/BAMBINA6.jpeg' }
    ];

    const triesDisplay = document.getElementById('tries');
    let tries = 5; // Initialize the number of tries

    function resetGame() {
        cardArray.sort(() => 0.5 - Math.random());
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        tries = 5;
        triesDisplay.textContent = `Tries left: ${tries}`;
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        createBoard();
    }

    function updateTries() {
        tries--;
        triesDisplay.textContent = `Tries left: ${tries}`;
        if (tries === 0) {
            alert('Game over! You have run out of tries. The game will reset.');
            resetGame();
        }
    }

    const gameBoard = document.getElementById('gameBoard');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Sorry, try again');
            updateTries(); // Decrement the number of tries
        }

        cardsChosen = [];
        cardsChosenId = [];

        // Check if the player has found all matches
        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You beat the memory game!');
            resetGame(); // Reset the game after winning
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (cardsChosenId.includes(cardId) || cardsChosen.length === 2) {
            return; // Prevent flipping the same card twice or flipping more than two cards
        }
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    resetGame(); // Start the game initially
});
