/**
 * Created by Nix on 8/18/2016.
 */
var height = 474;
var width = 432;

function setup (){
    createCanvas(432, 474);
    background(0, 158, 11);
    
    //Top side of board
    stroke(222, 184, 135);
    fill(222, 184, 135);
    rect(0, 0, height, 30);

    //Left side of board
    rect(0, 0, 30, height);

    //right side of board
    rect(width-30, 0, 30, height);

    //bottom side of board
    rect(0, height-30, width, 30);


}

function draw (){



}