/**
 * Created by Nix on 8/23/2016.
 */

function Position(){
    const ROWS = 8;
    const COLS = 8;

    this.returnClickCoor = function(coorX, coorY){
        for(var row = 0; row < ROWS; row++){
            for(var col = 0; col < COLS; col++){
                if((coorY >= 50*(row+1) && coorY <= 50*(row+1)+50) && (coorX >= 50*(col+1) && coorX <= 50*(col+1)+50)){
                    return [row, col];
                }
            }
        }
    };

}