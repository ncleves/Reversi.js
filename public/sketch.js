/**
 * Created by Nix on 8/18/2016.
 */

// board setup
const COLS = 8;
const ROWS = 8;
var X = 50;
var Y = 50;
var position;
var gameBoard;
var piece;

const N = 1;
const NE = 2;
const E = 3;
const SE = 4;
const S = 5;
const SW = 6;
const W = 7;
const NW = 8;

var madeMove = false;

function moveDir(pos, dir) {
    var row = pos.row;
    var col = pos.col;
    switch (dir) {
        case N:
            return new Position(row - 1, col);
        case NE:
            return new Position(row - 1, col + 1);
        case E:
            return new Position(row, col + 1);
        case SE:
            return new Position(row + 1, col + 1);
        case S:
            return new Position(row + 1, col);
        case SW:
            return new Position(row + 1, col - 1);
        case W:
            return new Position(row, col - 1);
        case NW:
            return new Position(row - 1, col - 1);
    }
}

function setup() {
    var width = 500;
    var height = 500;

    gameBoard = new Board;
    position = new Position(mouseX, mouseY);
    piece = new Piece;

    createCanvas(width, height);
    background(0, 158, 11);

    //Top side of board
    stroke(222, 184, 135);
    fill(222, 184, 135);
    rect(0, 0, width, 50);

    //Left side of board
    rect(0, 0, 50, height);

    //right side of board
    rect(width - 50, 0, 50, height);

    //bottom side of board
    rect(0, height - 50, width, 50);

    //create board numbers (top)
    for (var col = 0; col < COLS; col++) {
        fill(0);
        textSize(18);
        text("" + (col), 50 * col + 70, 40);
    }

    //create board numbers (left side)
    for (var row = 0; row < ROWS; row++) {
        fill(0);
        textSize(18);
        text("" + (row), 35, 50 * row + 80);
    }

    //TESTING COORDINATES
    // gameBoard.setBoardCoor(0, 1, 'O');
    // gameBoard.setBoardCoor(0, 2, 'X');
    // gameBoard.setBoardCoor(1, 1, 'O');

    //regular start
    gameBoard.setBoardCoor(3, 3, 'X');
    gameBoard.setBoardCoor(4, 3, 'O');
    gameBoard.setBoardCoor(3, 4, 'O');
    gameBoard.setBoardCoor(4, 4, 'X');

    remainingMoves();
    console.log(remainingMoves());

    //UNCOMMENT FOR AN 'X'
    // gameBoard.setBoardCoor(1, 1, 'O');
    // gameBoard.setBoardCoor(2, 2, 'O');
    // gameBoard.setBoardCoor(4, 4, 'O');
    // gameBoard.setBoardCoor(5, 5, 'O');
    // gameBoard.setBoardCoor(6, 6, 'O');
    // gameBoard.setBoardCoor(1, 5, 'O');
    // gameBoard.setBoardCoor(2, 4, 'O');
    // gameBoard.setBoardCoor(4, 2, 'O');
    // gameBoard.setBoardCoor(5, 1, 'O');
    //
    // gameBoard.setBoardCoor(0, 0, 'X');
    // gameBoard.setBoardCoor(0, 6, 'X');
    // gameBoard.setBoardCoor(7, 7, 'X');
    // gameBoard.setBoardCoor(6, 0, 'X');


    //TESTING COORDINATES
    // gameBoard.setBoardCoor(1, 0, 'X');
    // gameBoard.setBoardCoor(2, 1, 'O');
    // gameBoard.setBoardCoor(2, 2, 'O');
    // gameBoard.setBoardCoor(1, 2, 'O');
    // gameBoard.setBoardCoor(0, 2, 'X');
    // gameBoard.setBoardCoor(3, 3, 'O');
    // gameBoard.setBoardCoor(4, 4, 'O');

}

function mousePressed() {
    var row = position.returnClickCoor(mouseX, mouseY)[0];
    var col = position.returnClickCoor(mouseX, mouseY)[1];

    if(row != null && col != null) {
        makeMove(row, col);
        madeMove = true;

    }

    console.log("checkMove arr: " + checkMove(row, col));

    console.log('row: ' + position.returnClickCoor(mouseX, mouseY)[0] + ' col: ' + position.returnClickCoor(mouseX, mouseY)[1]);
    //console.log(gameBoard.boardArray);

    var result = '';
    for (var i = 0; i < 8; i++) {
        result += (i + 1);
        for (var j = 0; j < 8; j++) {
            result += gameBoard.boardArray[i][j];
        }
        result += '\n';
    }
    console.log(result);

    //TODO: Add a drawScore function
    // text("Score for Dark: "+gameBoard.scoreO, 50, 475);
    // text("Score for Light: "+gameBoard.scoreX, 250, 475);

}

function draw() {
    //draw the board (sides are 50px each, 8 rows + 8 cols)
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            X = (row + 1) * 50;
            Y = (col + 1) * 50;
            stroke(0);
            noFill();
            rect(X, Y, 50, 50);
            piece.drawPiece(row, col, gameBoard.boardArray);
        }
    }

    // show current player in top left corner
    if(gameBoard.player == 'X'){
        fill(255);
        noStroke();
        ellipse( 25, 25, 45, 45 );
    }else{
        fill(0);
        ellipse( 25, 25, 45, 45 );
    }


    // TODO: Determine how to unhighlight moves after they are made

}

//TODO: FIX MAKE MOVE SELECTION OF MOVES
function makeMove(row, col) {
    var currPlayer = gameBoard.player;

    for(var i = 0; i < remainingMoves().length; i++){
        var r = remainingMoves()[i].move.row;
        var c = remainingMoves()[i].move.col;

        if(r == row && c == col){
            console.log('move is correctly chosen from highlighted moves');
            var numToFlip = remainingMoves()[i].positions.length;
            gameBoard.setBoardCoor(row, col, currPlayer);

            for(var k = 0; k < numToFlip; k++){
                var flippedRow = remainingMoves()[i].positions[k].row;
                var flippedCol = remainingMoves()[i].positions[k].col;
                gameBoard.setBoardCoor(flippedRow, flippedCol, currPlayer);

                if (currPlayer == 'X') {
                    gameBoard.scoreX = gameBoard.scoreX + numToFlip + 1;
                    gameBoard.scoreO = gameBoard.scoreO - numToFlip;
                } else {
                    gameBoard.scoreO = gameBoard.scoreO + numToFlip + 1;
                    gameBoard.scoreX = gameBoard.scoreX - numToFlip;
                }

            }

            gameBoard.player = opponent();

            if (remainingMoves().length == 0) {
                // no moves found for player opponent
                gameBoard.player = currPlayer;
            }

            if (remainingMoves().length == 0) {
                // no moves found for anyone
                gameBoard.noMovesRemain = true;
            }

        }

    }

}


//TODO: COMBINE remainingMoves AND checkMove INTO ONE FUNCTION: getMoves
function remainingMoves() {

    var moveSet = function (move, positions) {
        return{
            "move": move,
            "positions": positions
        }
    };

    var remainingMoves = [];
    var i = 0;

    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            var flankedPositions = checkMove(row, col);
            if (flankedPositions.length > 0) {

                var move = new Position(row, col);
                remainingMoves[i] = moveSet(move, flankedPositions);
                i++;

            }
        }
    }

    return remainingMoves;
}


function checkMove(row, col) {
    var allFlankedPositions = [];
    var directions = [];

    if(gameBoard.boardArray[row][col] == '_'){

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
        } else if (row == 7 && col == 7) { // bottom right corner
            directions.push(N);
            directions.push(W);
            directions.push(NW);
        } else if (row == 7 && col >= 1 && col <= 6) { // right column (not corners)
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

        var startPos = new Position(row, col);
        for (var currDir = 0; currDir < directions.length; currDir++) {

            var searchPos = moveDir(startPos, directions[currDir]);
            var tempPositions = [];

            while (true) { 
                var searchPiece = gameBoard.boardArray[searchPos.row][searchPos.col];
                
                if (searchPiece == opponent()) {

                    tempPositions.push(searchPos);
                    searchPos = moveDir(searchPos, directions[currDir]);
                    if(searchPos.row > 7 || searchPos.col > 7 || searchPos.row < 0 || searchPos.col < 0){
                        break; // if we reach the edge of the board, check next cardinal direction
                    }


                } else if (searchPiece != gameBoard.player) {

                    break; // check next cardinal direction

                } else if (searchPiece == gameBoard.player) {

                    allFlankedPositions = allFlankedPositions.concat(tempPositions); 
                    // we have found one of our own pieces, tempPositions is valid
                    break; //continue checking cardinal directions

                }
            }
        }
        return allFlankedPositions;
    }else{
        return allFlankedPositions;
    }
}

function opponent() {
    if (gameBoard.player == 'X') {
        return 'O';
    } else {
        return 'X';
    }
}

function gameOver() {
    var result = false;
    if (gameBoard.scoreX + gameBoard.scoreO == 64 || gameBoard.scoreX == 0 || gameBoard.scoreO == 0 || gameBoard.noMovesRemain == true) {
        result = true;
    }

    return result;
}

function getWinner() {
    var result = 'X';
    if (gameOver() && gameBoard.scoreX > gameBoard.scoreO) {
        result = 'X';
    } else if (gameBoard.scoreO > gameBoard.scoreX) {
        result = 'O';
    }
    return result;
}