// Noughts & Crosses (Tic Tac Toe)

const gameBoard = (function (){
    const boardArray = 
    [   "X","X","X",
        "X","O","O",
        "O","O","X" ];
    const getBoard = () => boardArray;
    return {
        getBoard
    };
})(); 

// console.log(gameBoard.getBoard());

const winArray = [
[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]
];

function gameEnd(boardArray) {
    for (const [a, b, c,] of winArray) {
        if (boardArray[a] && 
        boardArray[a] === boardArray[b] &&
        boardArray[b] === boardArray[c]) {
            return boardArray[a];
        }
    }
}
const result = gameEnd(gameBoard.getBoard());
console.log(`${result} wins!!!`);


// const players = (function (){
// });
// const gameController = (function (){
// });