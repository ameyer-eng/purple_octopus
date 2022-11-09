


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");




class Animator{
    constructor(object) {
        this.objects = object;
      }
    draw_scene(){
        
        //clear the canvas
        ctx.clearRect(0,0, c.width, c.height);

        //draw the background
        var grd = ctx.createRadialGradient(75,50,5,100,60,800);
        grd.addColorStop(0,"#99ffff");
        grd.addColorStop(0.5, "teal");
        grd.addColorStop(0.75,"#004d00");
        grd.addColorStop(1, "black");   
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,1200,900);
        
        //loop through each item in the scene and call its draw function
        this.objects.draw();
    }
}



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
        this.draw()
    }
    moveDown(){
        this.y += 10;
        this.draw()
    }
  }

  let myOctopus = new Octopus(100, 100);

  //let scene_list = [myOctopus];
  let myAnimator = new Animator(myOctopus);
  myAnimator.draw_scene();


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
  

  




  
