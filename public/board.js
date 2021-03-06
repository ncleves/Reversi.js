/**
 * Created by Nix on 9/18/2016.
 */

function Board(){
    const ROWS = 8;
    const COLS = 8;

    this.player = 'X';

    this.scoreX = 2;

    this.scoreO = 2;

    this.noMovesRemain = false;

    this.createBoardArray = function(){
        var boardArr = new Array(ROWS);

        // make the cells array 8 blank arrays
        for(var i = 0; i < ROWS; i++){
            boardArr[i] = new Array(COLS);
        }

        // create the rest of the 2D array
        for(var row = 0; row < ROWS; row++){
            for(var col = 0; col < COLS; col++){
                boardArr[row][col] = "_";
            }
        }

        boardArr[3][3] = 'X';
        boardArr[4][3] = 'O';
        boardArr[3][4] = 'O';
        boardArr[4][4] = 'X';

        return boardArr;
    };

    this.boardArray = this.createBoardArray();

    this.setBoardCoor = function(row, col, pieceChar){
        this.boardArray[row][col] = pieceChar;
    };


}
