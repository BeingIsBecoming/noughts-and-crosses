// Game Board IIFE Module
const gameBoard = (() => {
    const boardArray = 
    [   "","","",
        "","","",
        "","",""   ];
    const getBoard = () => boardArray;
    const resetBoard = () => boardArray.fill("");
    return {
        getBoard, resetBoard
    };
})(); 

// Player Factory
function createPlayer(name, marker) {
    return {name,marker}
}
let player1;
let player2;

// Game Logic
function winCheck(board) {
    const winArray = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
    ];
    for (const [a, b, c] of winArray) {
        if ( board[a] &&
        board[a] === board[b] &&
        board[b] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// Game Controller IIFE Module
const gameController = (() => {
    let currentPlayer = player1;
    let firstTurn = true;
    let gameOver = false;

    const switchPlayer = () => {
    currentPlayer = 
    currentPlayer === player1 ? player2 : player1;
    document.querySelector('.turn').textContent = 
    `${currentPlayer.name}'s turn`;
    };

    const takeTurn = (index) => {
        const board = gameBoard.getBoard();
        
        if (gameOver || board[index])
            return;

        if (firstTurn) {
            const p1Input = document.getElementById('player1').value;
            const p2Input = document.getElementById('player2').value;
            player1 = createPlayer(p1Input || "Player 1", "X");
            player2 = createPlayer(p2Input || "Player 2", "O");
            currentPlayer = player1;
            firstTurn = false;
    }
        
        board[index] = currentPlayer.marker;
        updateBoard();

         // Check Result
        const result = winCheck(board);
        if (result === player1.marker) {
            document.querySelector('.win').textContent = 
            `${player1.name} (${player1.marker}) wins!`;
            gameOver = true;
            document.querySelector('.turn').textContent = '';
            showGameOver();
        } else if (result === player2.marker) {
            document.querySelector('.win').textContent = 
            `${player2.name} (${player2.marker}) wins!`;
            gameOver = true;
            document.querySelector('.turn').textContent = '';
            showGameOver();
        } else if (!board.includes("")) {
            document.querySelector('.win').textContent =
            "Draw!";
            gameOver = true;
            document.querySelector('.turn').textContent = '';
            showGameOver();
        } else {
            switchPlayer();
        }
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        gameOver = false;
        firstTurn = true;
        currentPlayer = player1;
        updateBoard();
        hideGameOver();
    };

    return {
        takeTurn, resetGame
    };
})();

// Event Handlers
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        gameController.takeTurn(index);
    });
});

function updateBoard() {
    const board = gameBoard.getBoard();
    document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.textContent = board[index] ? board[index] : "";
  });
}

updateBoard();

// Game Over Messages
const showGameOver = () => {
    document.querySelector('.blink').style.display = 'block';
    document.querySelector('.win').style.display = 'block';
}
const hideGameOver = () => {
    document.querySelector('.blink').style.display = "none";
    document.querySelector('.win').style.display = "none";
}
// Press "Y" to Restart
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'y') {
        gameController.resetGame();
    }
});