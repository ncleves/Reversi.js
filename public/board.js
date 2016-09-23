/**
 * Created by Nix on 9/18/2016.
 */

function Board(){
    const ROWS = 8;
    const COLS = 8;

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

        return boardArr;
    };

    this.boardArray = this.createBoardArray();

}
