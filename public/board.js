/**
 * Created by Nix on 9/18/2016.
 */


var Board = {

    returnCoor: function(coorX, coorY){
        this.coorX = coorX;
        this.coorY = coorY;

        for(var row = 1; row <= ROWS; row++){
            for(var col = 1; col <= COLS; col++){
                if((this.coorY >= 50*row && this.coorY <= 50*row+50) && (this.coorX >= 50*col && this.coorX <= 50*col+50)){
                    return [row, col];
                }
            }
        }
    }


};