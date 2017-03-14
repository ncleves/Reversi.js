/**
 * Created by Nix on 8/24/2016.
 */
var express = require('express');
var app = express();
var server = app.listen(3000);
console.log("server is listening on port 3000...");
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

const N = 1;
const NE = 2;
const E = 3;
const SE = 4;
const S = 5;
const SW = 6;
const W = 7;
const NW = 8;

const ROWS = 8;
const COLS = 8;

connections = [];

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    socket.emit('init', {board: gameBoard});

    socket.on('ClickCoor', clickResponse);

    function clickResponse(data){
        console.log(data);
    }

});

//create the board
var gameBoard = new Board;

function printBoard(){
    var result = '';
    for (var i = 0; i < ROWS; i++) {
        result += (i + 1);
        for (var j = 0; j < COLS; j++) {
            result += gameBoard.boardArray[i][j];
        }
        result += '\n';
    }
    return result;
}

function initBoard(){

}

function Board(){
    this.player = 'X';

    this.scoreX = 2;
    this.scoreO = 2;

    this.noMovesRemain = false;

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

        boardArr[3][3] = 'X';
        boardArr[4][3] = 'O';
        boardArr[3][4] = 'O';
        boardArr[4][4] = 'X';

        return boardArr;
    };

    this.boardArray = this.createBoardArray();

    this.setBoardCoor = function(row, col, piece){
        this.boardArray[row][col] = piece;
    };
}

function Position(row, col){
    this.row = row;
    this.col = col;
}

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


function legalMovesRemain() {
    console.log("checking here");

    //TODO: Identify why bug occurs when checking remaining available moves

    var result = false;
    for (var row = 0; row < ROWS && row >= 0; row++) {
        for (var col = 0; col < COLS && col >= 0; col++) {
            if (checkMove(row, col).length != 0 && gameBoard.boardArray[row][col] == '_') {
                result = true;
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
        var newPos = moveDir(startPos, directions[currDir]);

        while (gameBoard.boardArray[newPos.row][newPos.col] == opponent() && (newPos.row > 0 || newPos.row <= 7 || newPos.col > 0 || newPos.col <= 7)) {

            tempPosArr.push(newPos);
            newPos = moveDir(newPos, directions[currDir]);

            if (gameBoard.boardArray[newPos.row][newPos.col] == gameBoard.player) {
                flankedPieces = flankedPieces.concat(tempPosArr);

            } else if (gameBoard.boardArray[newPos.row][newPos.col] == '_') {
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