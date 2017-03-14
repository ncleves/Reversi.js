/**
 * Created by Nix on 8/18/2016.
 */

// board setup
var socket = io.connect('http://localhost:3000');

const COLS = 8;
const ROWS = 8;
var X = 50;
var Y = 50;
var gameBoard;
var piece;

function setup() {
    var width = 500;
    var height = 500;

    socket.on('init', function (data) {
        gameBoard = data.board;
    });

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

}

function mousePressed() {
    var r = returnClickCoor(mouseX, mouseY)[0];
    var c = returnClickCoor(mouseX, mouseY)[1];

    if(r != null && c != null){
        var data = {
            row: r,
            col: c
        };
        console.log("sending: " + data.row + "," + data.col);
        socket.emit('ClickCoor', data);
    }

    //TODO: Add a drawScore function
    // text("Score for Dark: "+gameBoard.scoreO, 50, 475);
    // text("Score for Light: "+gameBoard.scoreX, 250, 475);

}

function drawPiece(row, col, boardArray){
    if(boardArray[row][col] == 'X'){
        fill(255);
        noStroke();
        ellipse( ((col)*50)+75, ((row)*50)+75, 45, 45 );
    }

    if(boardArray[row][col] == 'O'){
        fill(0);
        ellipse( ((col)*50)+75, ((row)*50)+75, 45, 45 );
    }
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
            drawPiece(row, col, gameBoard.boardArray);
        }
    }

}

function returnClickCoor (coorX, coorY){
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
}


