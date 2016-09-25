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

function setup (){
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
    rect(width-50, 0, 50, height);

    //bottom side of board
    rect(0, height-50, width, 50);

    //create board numbers (top)
    for(var col = 0; col < COLS; col++){
        fill(0);
        textSize(18);
        text(""+(col+1), 50*col+70, 40);
    }

    //create board numbers (left side)
    for(var row = 0; row < ROWS; row++){
        fill(0);
        textSize(18);
        text(""+(row+1), 35, 50*row+80);
    }

    gameBoard.setBoardCoor(3, 3, 'X');
    gameBoard.setBoardCoor(4, 3, 'O');
    gameBoard.setBoardCoor(3, 4, 'O');
    gameBoard.setBoardCoor(4, 4, 'X');
}

function draw (){
    //draw the board (sides are 50px each, 8 rows + 8 cols)
    for(var row = 0; row < ROWS; row++){
        for(var col = 0; col < COLS; col++){
            X = (row+1) * 50;
            Y = (col+1) * 50;
            stroke(0);
            noFill();
            rect(X, Y, 50, 50);
            piece.drawPiece(row, col, gameBoard.boardArray);
        }
    }
}

function mousePressed (){
    console.log('coor: ' + position.returnClickCoor(mouseX, mouseY) + ' mouseX: ' + mouseX + ' mouseY: ' + mouseY);
    console.log('row: ' + position.returnClickCoor(mouseX, mouseY)[0] + ' col: ' + position.returnClickCoor(mouseX, mouseY)[1]);
    //console.log(gameBoard.boardArray);
}

function makeMove(row, col){

}

