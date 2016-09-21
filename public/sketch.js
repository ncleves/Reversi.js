/**
 * Created by Nix on 8/18/2016.
 */

// board setup
var COLS = 8;
var ROWS = 8;
var X = 50;
var Y = 50;

var gameBoard = Board.createBoardArray();

function setup (){
    var width = 500;
    var height = 500;

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


}

function draw (){
    //draw the board (sides are 50px each, 8 rows + 8 cols)
    for(var row = 1; row <= ROWS; row++){
        for(var col = 1; col <= COLS; col++){
            X = row * 50;
            Y = col * 50;
            stroke(0);
            noFill();
            rect(X, Y, 50, 50);

        }
    }
}

function mousePressed (){
    console.log('coor: ' + Board.returnCoor(mouseX, mouseY) + ' mouseX: ' + mouseX + ' mouseY: ' + mouseY);
    //console.log(gameBoard);
    //return false;
}


