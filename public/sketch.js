/**
 * Created by Nix on 8/18/2016.
 */


function setup (){
    var width = 500;
    var height = 550;

    createCanvas(width, height);
    background(0, 158, 11);
    
    //Top side of board
    stroke(222, 184, 135);
    fill(222, 184, 135);
    rect(0, 0, width, 75);

    //Left side of board
    rect(0, 0, 50, height);

    //right side of board
    rect(width-50, 0, 50, height);

    //bottom side of board
    rect(0, height-75, width, 75);

}

function draw (){
    var width = 500;
    var height = 550;
    var spacingX = 50;
    var spacingY = 50;
    var x = 0;
    var y = 0;

    while(spacingX <= width-50){
        stroke(0);
        line(spacingX, 75, spacingX, height-75);
        spacingX = spacingX + 50;
    }

    while(spacingY <= height-75){
        stroke(0);
        line(50, spacingY+25, width-50, spacingY+25);
        spacingY = spacingY + 50;
    }

    // while (x < width-spacing){
    //     stroke(0);
    //     line(x, spacing, x, height-spacing);
    //     x = x + spacing;
    // }
    //
    // while (y < height-spacing){
    //     stroke(0);
    //     line(spacing, y, width-spacing, y);
    //     y = y + spacing;
    // }

    // for(var x = 30; x <= width-30; x += 30){
    //     for(var y = 30; x <= height-30; y += 30){
    //         stroke(0);
    //         line(x, y, width-x, height-y);
    //     }
    // }


}