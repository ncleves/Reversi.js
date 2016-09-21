/**
 * Created by Nix on 9/18/2016.
 */


var Board = {

    createBoardArray: function(){
        var cells = new Array(ROWS);

        // make the cells array 8 blank arrays
        for(var i = 0; i < ROWS; i++){
            cells[i] = new Array(COLS);
        }

        // create the rest of the 2D array
        for(var row = 0; row < ROWS; row++){
            for(var col = 0; col < COLS; col++){
                cells[row][col] = "_";
            }
        }

        return cells;

    },

    returnCoor: function(coorX, coorY){
        this.coorX = coorX;
        this.coorY = coorY;

        for(var row = 0; row < ROWS; row++){
            for(var col = 0; col < COLS; col++){
                if((this.coorY >= 50*(row+1) && this.coorY <= 50*(row+1)+50) && (this.coorX >= 50*(col+1) && this.coorX <= 50*(col+1)+50)){
                    return [row, col];
                }
            }
        }
    }


};