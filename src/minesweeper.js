class Game {
    constructor (numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    playMove (rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        console.log('this.board: ' + this._board.playerBoard[rowIndex][columnIndex]);
        if(this._board.playerBoard[rowIndex][columnIndex] === "B"){
            console.log('Game Over!');
        } else if (!this._board.hasSafeTiles()) {
            console.log('Congrats, Winner!')
        } else {
            console.log(this._board.print());
        }
    }
}

class Board {
    constructor (numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        //numberOfTiles represents size of board. Determines if game is over at end of each turn.
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }
    flipTile (rowIndex, columnIndex) {
        if(this._playerBoard[rowIndex][columnIndex] !== ' '){
            console.log('This tile has already been flipped!')
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles--;
    }
    getNumberOfNeighborBombs (rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            //Another 4 Arrays
            [0,1],
            [1,-1],
            [1,0],
            [1,1]
        ];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
    
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = offset[1] + columnIndex;
    
            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
                if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
                    numberOfBombs++
                }
            }
        });
        return numberOfBombs;
    }
    hasSafeTiles () {
        return this._numberOfTiles !== this._numberOfBombs;
    }
    print () {
        //Will return undefined below console log because technically nothing is returned.
        console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
    }
    static generatePlayerBoard (numberOfRows, numberOfColumns) {
        let board = [];
        for(var i = 0; i < numberOfRows; i++){
            let row = [];
            for(var j = 0; j < numberOfColumns; j++){
                row.push(' ');
            }
            board.push(row);
        }
    
        return board;
    }
    static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        for(var i = 0; i < numberOfRows; i++){
            let row = [];
            for(var j = 0; j < numberOfColumns; j++){
                row.push(null);
            }
            board.push(row);
        }
    
        let numberOfBombsPlaced = 0;
        while(numberOfBombsPlaced < numberOfBombs){
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if(board[randomRowIndex][randomColumnIndex] !== 'B'){
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++
            }
        }
        
        return board;
    } 
}

const g = new Game(3,3,3);
g.playMove(0,0);