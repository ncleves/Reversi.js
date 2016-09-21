/**
 * Created by Nix on 9/18/2016.
 */

var BOARD_ARRAY = createBoardArray();

function createBoardArray(){
    var ROWS = 8;
    var COLS = 8;

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

}

var Board = {
    board: BOARD_ARRAY,

    getBoardCoor: function(row, col){
        return this.board[row][col];
    },

    setBoardCoor: function(row, col, piece){
        this.board[row][col] = piece;
    },

    returnClickCoor: function(coorX, coorY){
        for(var row = 0; row < ROWS; row++){
            for(var col = 0; col < COLS; col++){
                if((coorY >= 50*(row+1) && coorY <= 50*(row+1)+50) && (coorX >= 50*(col+1) && coorX <= 50*(col+1)+50)){
                    return [row, col];
                }
            }
        }
    }

};
