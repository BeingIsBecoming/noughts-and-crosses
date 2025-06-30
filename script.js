// Game Board Module
const gameBoard = (() => {
    const boardArray = 
    [   "X","X","X",
        "X","O","O",
        "O","O","X"   ];
    const getBoard = () => boardArray;
    return {
        getBoard
    };
})(); 

// Player Factory
function createPlayer(name, marker) {
    return {name,marker};
}
const player1 = createPlayer("Matt","X");
const player2 = createPlayer("Kristina", "O");

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

const result = winCheck(gameBoard.getBoard());

// Display Controller
function printBoard() {
  const cell = gameBoard.getBoard();
  console.log(`
  ${cell[0]} | ${cell[1]} | ${cell[2]}
  ---------
  ${cell[3]} | ${cell[4]} | ${cell[5]}
  ---------
  ${cell[6]} | ${cell[7]} | ${cell[8]}
  `);
}
printBoard();

// Winning Player
const winner = () => {
     if (result === player1.marker) {
        console.log(`${player1.name} wins!`);
    } else if (result === player2.marker) {
        console.log(`${player2.name} wins!`);
    } else {
        console.log("Draw!");
    }
}
winner();

// Game Controller
const gameController = (() => {
    let currentPlayer = player1;
    let gameOver = false;

const switchPlayer = () => {
   currentPlayer = 
   currentPlayer === player1 ? player2 : player1;
   console.log(`It's ${currentPlayer.name}'s turn`);
}

})();