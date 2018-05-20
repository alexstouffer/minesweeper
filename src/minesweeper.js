//Create Game Board
const printBoard = board => {
    console.log('Current Board:');
    console.log(board[0].join(' | '));
    console.log(board[1].join(' | '));
    console.log(board[2].join(' | '));
}
const board = [
    [' ',' ',' '], 
    [' ',' ',' '], 
    [' ',' ',' '],
];

//Print Current Game Board
printBoard(board);

//Set Values On Game Board
board[0][1] = '1';
board[2][2] = 'B';

//Print Board with Set Values
printBoard(board);