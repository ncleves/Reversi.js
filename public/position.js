/**
 * Created by Nix on 8/23/2016.
 */

function Position(row, col){
    const ROWS = 8;
    const COLS = 8;

    this.row = row;

    this.col = col;
    
    // this.returnPosForPiece = function(piece){
    //     return new Position(this.row, this.col);
    // };
    
    this.returnClickCoor = function(coorX, coorY){
        if(coorY < 50 || coorY > 450 || coorX < 50 || coorX > 450){
            return [null, null];
        }
        for(var row = 0; row < ROWS; row++){
            for(var col = 0; col < COLS; col++){
                if((coorY >= 50*(row+1) && coorY <= 50*(row+1)+50) && (coorX >= 50*(col+1) && coorX <= 50*(col+1)+50)){
                    return [row, col];
                }

            }

        }
    };

    this.highlightPosition = function(row, col){
        fill(25, 255, 35);
        stroke(0);
        rect((row + 1) * 50, (col + 1) * 50, 50, 50);
    }

}