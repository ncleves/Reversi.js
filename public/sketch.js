/**
 * Created by Nix on 8/18/2016.
 */

// board setup
// var board = new board;

var COLS = 8;
var ROWS = 8;
var X = 50;
var Y = 50;


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
    for(var i = 0; i < ROWS; i++){
        fill(0);
        textSize(18);
        text(""+(i+1), 50*i+70, 40);
    }

    //create board numbers (left side)
    for(var j = 0; j < COLS; j++){
        fill(0);
        textSize(18);
        text(""+(j+1), 35, 50*j+80);
    }


}

function draw (){
    //draw the board (sides are 50px each, 8 rows + 8 cols)
    for(var i = 1; i <= ROWS; i++){
        for(var j = 1; j <= COLS; j++){
            X = i * 50;
            Y = j * 50;
            stroke(0);
            noFill();
            rect(X, Y, 50, 50);

        }
    }
}

function mousePressed (){
    console.log('coor: ' + returnCoordinates(mouseX, mouseY) + ' mouseX: ' + mouseX + ' mouseY: ' + mouseY);
    //return false;
}

function returnCoordinates(coorX, coorY){
    for(var i = 1; i <= ROWS; i++){
        for(var j = 1; j <= COLS; j++){
            if((coorX >= 50*i && coorX <= 50*i+50) && (coorY >= 50*j && coorY <= 50*j+50)){
                return [i, j];
            }
        }

    }
}