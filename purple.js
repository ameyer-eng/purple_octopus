
var origin_x = 100
var origin_y = 75

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var grd = ctx.createRadialGradient(75,50,5,100,60,800);
grd.addColorStop(0,"#99ffff");
grd.addColorStop(0.5, "teal");
grd.addColorStop(0.75,"#004d00");
grd.addColorStop(1, "black");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0,0,1200,900);


//Draw the legs
for (var i = 1; i < 8; i++) {
    var leg_positions = [-70, -50, -10, 10, 50, 70, 80];
    ctx.beginPath(); 
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#800020";
    //set the starting point to the origin
    ctx.moveTo(origin_x,origin_y);
    // End point (180,47)
    ctx.lineTo(origin_x + leg_positions[i], origin_y + 70);
    // Make the line visible
     ctx.stroke();
}

//Draw the body
ctx.fillStyle = "#800020";
ctx.beginPath();
ctx.arc(origin_x + 0, origin_y + 0, 50, 0, 2 * Math.PI);
ctx.fill();

//Draw the eyes
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.arc(origin_x - 20 , origin_y - 5, 10, 0, 2 * Math.PI);
ctx.arc(origin_x + 20 , origin_y - 5, 10, 0, 2 * Math.PI);
ctx.fill();


