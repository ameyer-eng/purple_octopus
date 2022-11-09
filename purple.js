

//stuph to setup the KANVAS
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


class Octopus {
    constructor(x_origin, y_origin) {
      this.x = x_origin;
      this.y = y_origin;
      
    }
    
    draw() {

        var origin_x = this.x;
        var origin_y = this.y;
        //Draw the legs
        for (var i = 1; i < 8; i++) {
            var randomness = Math.floor(Math.random()*10+1)-5;
            var leg_positions = [-70, -50, -10, 10, 50, 70, 80];
            ctx.beginPath(); 
            ctx.lineWidth = 15;
            ctx.strokeStyle = "#800020";
            //set the starting point to the origin
            ctx.moveTo(origin_x,origin_y);
            // End point (180,47)
            ctx.lineTo(origin_x + leg_positions[i] + randomness*2, origin_y + 70 + randomness);
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

    }
    moveUp(){
        this.y -= 10;
    }
    moveDown(){
        this.y += 10;
    }
  }



  function getkeyandlog(e) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 37: //left arrow key
            console.log("left");
            break;
        case 38: //Up arrow key
            console.log("up");
            myOctopus.moveUp();
            break;
        case 39: //right arrow key
            console.log("right");
            break;
        case 40: //down arrow key
            console.log("down");
            myOctopus.moveDown();
            break;
    }
  }
  

class Bubble{
    constructor(x_origin, y_origin, initial_size, color) {
        this.x = x_origin;
        this.y = y_origin;
        this.initial_size = initial_size;
        this.color = color;        
      }
    float()
    {
        this.y -= 1;
        this.x = this.x + 2 * Math.cos(this.y/(2*3.14))
    }
    draw()
    {
        ctx.strokeStyle = "teal";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + 0, this.y + 0, this.initial_size, 0, 2 * Math.PI);
        ctx.stroke();
    }


}

class Airstone{
    constructor(x_origin, y_origin){
        this.x_origin = x_origin;
        this.y_origin = y_origin;
        this.bubble_list = [];
    }

    Bubble(){
        var random_pos = Math.floor(Math.random()*50);
        var random_num = Math.floor(Math.random()*40);
        var random_size = Math.floor(Math.random()*15);
        if(random_num == 5){
            this.bubble_list.push(new Bubble(this.x_origin + random_pos, this.y_origin, random_size, "BLAH"))
        }
        //for each bubble in the bubble list make it float...
        for(const item of this.bubble_list) {
            item.float();
          }
        //remove bubbles that are off the screen
        for(var i=0; i<this.bubble_list.length; i++){
            if(this.bubble_list[i].y < 10){
                this.bubble_list.splice(i,1);
            }
        }
    }

    draw(){
        for(const item of this.bubble_list) {
            item.draw();
          }
    }

}


let myOctopus = new Octopus(100, 100);
let myAirstone = new Airstone(500, 600);
let myAirstone1 = new Airstone(800, 600);
let myAirstone2 = new Airstone(1000, 600);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//main loop//

function Update()
{
  
  
      //clear the screen for updates
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, c.width, c.height);

    //DRAW BACKGROUND FIRST
        var grd = ctx.createRadialGradient(75,50,5,100,60,800);
        grd.addColorStop(0,"#99ffff");
        grd.addColorStop(0.5, "teal");
        grd.addColorStop(0.75,"#004d00");
        grd.addColorStop(1, "black");   
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,1200,900);
    
    //draw the purple octopus
    myOctopus.draw();

    //draw the bubbles
    myAirstone.Bubble(); //generate and move the bubbles
    myAirstone.draw(); //draw the bubbles
    myAirstone1.Bubble(); //generate and move the bubbles
    myAirstone1.draw(); //draw the bubbles
    myAirstone2.Bubble(); //generate and move the bubbles
    myAirstone2.draw(); //draw the bubbles

}


setInterval(() => {
  Update();
}, 10)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////




  
