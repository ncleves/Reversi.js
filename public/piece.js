/**
 * Created by Nix on 8/23/2016.
 */

function Piece(){
    this.drawPiece = function(row, col, boardArray){

        if(boardArray[row][col] == 'X'){
            fill(255);
            noStroke();
            ellipse( ((col)*50)+75, ((row)*50)+75, 45, 45 );
        }

        if(boardArray[row][col] == 'O'){
            fill(0);
            ellipse( ((col)*50)+75, ((row)*50)+75, 45, 45 );
        }
    };

}