/**
 * Created by Nix on 9/18/2016.
 */

function Board(){
    const ROWS = 8;
    const COLS = 8;

    const N = 1;
    const NE = 2;
    const E = 3;
    const SE = 4;
    const S = 5;
    const SW = 6;
    const W = 7;
    const NW = 8;

    this.direction = function(pos, dir){
        switch(dir){
            case N:
                pos.row = (pos.row - 1);
                break;
            case NE:
                pos.row = (pos.row - 1);
                pos.col = (pos.col + 1);
                break;
            case E:
                pos.col = (pos.col + 1);
                break;
            case SE:
                pos.row = (pos.row + 1);
                pos.col = (pos.col + 1);
                break;
            case S:
                pos.row = (pos.row + 1);
                break;
            case SW:
                pos.row = (pos.row + 1);
                pos.col = (pos.col - 1);
                break;
            case W:
                pos.col = (pos.col - 1);
                break;
            case NW:
                pos.row = (pos.row - 1);
                pos.col = (pos.col - 1);
                break;

        }

    };

    this.player = 'X';

    this.scoreX = 0;

    this.scoreY = 0;


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

    this.setBoardCoor = function(row, col, pieceChar){
        this.boardArray[row][col] = pieceChar;
    };

    this.opponent = function(){
        if(this.player = 'X'){
            return 'O';
        }else{
            return 'X';
        }
    };

    this.checkMove = function(row, col) {
        flipPieces = [];
        directions = [];

        if (row == 0 && col >= 1 && col <= 6) { // top row (not corners)
            directions.push(E);
            directions.push(SE);
            directions.push(S);
            directions.push(SW);
            directions.push(W);
        } else if (row == 0 && col == 0) { // top left corner
            directions.push(E);
            directions.push(SE);
            directions.push(S);
        } else if (row == 0 && col == 7) { // top right corner
            directions.push(S);
            directions.push(SW);
            directions.push(W);
        } else if (col == 0 && row >= 1 && row <= 6) { // left column (not corners)
            directions.push(N);
            directions.push(NE);
            directions.push(E);
            directions.push(SE);
            directions.push(S);
        } else if (row == 7 && col == 0) { // bottom left corner
            directions.push(N);
            directions.push(NE);
            directions.push(E);
        } else if (row == 7 && col >= 1 && col <= 6) { // bottom row (not corners)
            directions.push(N);
            directions.push(NE);
            directions.push(E);
            directions.push(W);
            directions.push(NW);
        } else if(row == 7 && col == 7){ // bottom right corner
            directions.push(N);
            directions.push(W);
            directions.push(NW);
        } else if(row == 7 && col >= 1 && col <= 6){ // right column (not corners)
            directions.push(N);
            directions.push(S);
            directions.push(SW);
            directions.push(W);
            directions.push(NW);
        } else {
            directions.push(N);
            directions.push(NE);
            directions.push(E);
            directions.push(SE);
            directions.push(S);
            directions.push(SW);
            directions.push(W);
            directions.push(NW);
        }

        for(var currDir in directions){

            var currentPos = new Position(row, col);

            this.direction(currentPos, currDir);

            while((currentPos.row < 8) && (currentPos.row >= 0) && (currentPos.col < 8) && (currentPos.col >= 0)){
                currentPiece = this.boardArray[currentPos.row][currentPos.col];

                if(currentPiece == this.opponent()){

                    flipPieces.push(currentPos.returnPosForPiece(this.opponent()));
                    this.direction(currentPos, currDir);

                } else if(currentPiece != this.player){
                    break;

                } else {
                    return flipPieces;

                }


            }

        }
        return flipPieces;

    };

    // this.getBoardScore = function(){
    //     for(var row = 0; row < this.boardArray.length; row++){
    //         for(var col = 0; col < this.boardArray.length; col++){
    //
    //             if(boardArray[row][col] == 'X'){
    //                 this.scoreX++;
    //             }
    //
    //             if(boardArray[row][col] == 'O'){
    //                 this.scoreY++;
    //             }
    //
    //         }
    //     }
    // }

}
