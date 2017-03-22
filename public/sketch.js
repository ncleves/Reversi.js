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
        text("" + (col + 1), 50 * col + 70, 40);
    }

    //create board numbers (left side)
    for (var row = 0; row < ROWS; row++) {
        fill(0);
        textSize(18);
        text("" + (row + 1), 35, 50 * row + 80);
    }

    gameBoard.setBoardCoor(0, 1, 'O');
    gameBoard.setBoardCoor(0, 2, 'X');
    gameBoard.setBoardCoor(1, 1, 'O');

    gameBoard.setBoardCoor(3, 3, 'X');
    gameBoard.setBoardCoor(4, 3, 'O');
    gameBoard.setBoardCoor(3, 4, 'O');
    gameBoard.setBoardCoor(4, 4, 'X');


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

    makeMove(row, col);

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

}


function makeMove(row, col) {
    var currPlayer = gameBoard.player;
    var positionsToFlip;
    var numToFlip;

    var legalMove = false;
    if(checkMove(row, col).length > 0){
        legalMove = true;
        positionsToFlip = checkMove(row, col);
        numToFlip = positionsToFlip.length;
    }

    if (gameBoard.boardArray[row][col] == '_' && legalMove) {
        gameBoard.setBoardCoor(row, col, currPlayer);

        // outer array of position arrays
        for (var i = 0; i < positionsToFlip.length; i++) {

            var flipRow = positionsToFlip[i].row;
            var flipCol = positionsToFlip[i].col;
            gameBoard.setBoardCoor(flipRow, flipCol, currPlayer);

            if (currPlayer == 'X') {
                gameBoard.scoreX = gameBoard.scoreX + numToFlip + 1;
                gameBoard.scoreO = gameBoard.scoreO - numToFlip;
            } else {
                gameBoard.scoreO = gameBoard.scoreO + numToFlip + 1;
                gameBoard.scoreX = gameBoard.scoreX - numToFlip;
            }

        }

        gameBoard.player = opponent();

        if (!legalMovesRemain()) {
            // no moves found for player opponent
            gameBoard.player = currPlayer;
        }

        if (!legalMovesRemain()) {
            // no moves found for anyone
            gameBoard.noMovesRemain = true;
        }
    }
}


function remainingMoves() {
    console.log("checking here");

    //TODO: Identify why bug occurs when checking remaining available moves

    var remainingMoves = [];

    var result = false;
    for (var row = 0; row < ROWS && row >= 0; row++) {
        for (var col = 0; col < COLS && col >= 0; col++) {
            if (checkMove(row, col).length != 0 && gameBoard.boardArray[row][col] == '_') {
                var move = new Position(row, col);
                remainingMoves.concat(move);
            }
        }
    }
    return result;
}


function checkMove(row, col) {
    var flankedPieces = [];
    var directions = [];

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
    console.log("start pos:");
    console.log(startPos);

    for (var currDir = 0; currDir < directions.length; currDir++) {

        var tempPosArr = [];
        var radialPos = moveDir(startPos, directions[currDir]);
        var linearPos = radialPos;
        console.log("row: " + radialPos.row + " col: " + radialPos.col);

        while (gameBoard.boardArray[linearPos.row][linearPos.col] == opponent()
                && (linearPos.row >= 0 || linearPos.row <= 7 || linearPos.col >= 0 || linearPos.col <= 7)) {

            tempPosArr.push(linearPos);
            linearPos = moveDir(radialPos, directions[currDir]);
            console.log("WHILE row: " + linearPos.row + " col: " + linearPos.col);

            if (gameBoard.boardArray[linearPos.row][linearPos.col] == gameBoard.player) {
                flankedPieces = flankedPieces.concat(tempPosArr);

            } else if (gameBoard.boardArray[linearPos.row][linearPos.col] == '_') {
                break;

            }
        }
    }
    console.log(flankedPieces);
    return flankedPieces;

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