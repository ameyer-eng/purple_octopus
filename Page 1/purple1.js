//maybe a bad idea....global array?

//      [["flag", "flag", "flag", "flag",],[timestamp, timestamp, timestamp, timestamp]]
//    Game "state" vs time......  or Events vs time...
//    allow t+1 actions and events to refer to t-1, t-2....t-n  AKTIONS....
//    t-1 could refer to t- 100 or something
//    it could give the game a sense of "memory"

//   I don't think a true random number would be time stable.  In the sense that reversing the action should generate a different number.
//   If t+1 transistions to t+2 then it could give 5 and the reverse transition would give 2 for example

//  So can true randomness actually exist in physics.  That is if I have a true "random" number generator that obeys the laws of the physical world
//  Such as the state of gas particles from the transistion of a regular crystal lattice....
//  Like a detonation...
//  Can it be reversed if we reverse time?
//  Entropy is such an odd concept. 


//stuph to setup the KANVAS
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var main_object_list = [];

class Octopus {
    constructor(x_origin, y_origin) {
      this.x = x_origin;
      this.y = y_origin;
      this.bubble_list = [];
      
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



    }//end of draw

    moveUp(){
        this.y -= 10;
    }
    moveDown(){
        this.y += 10;
    }
    moveRight(){
        this.x += 10;
    }
    moveLeft(){
        this.x -= 10;
    }
    blowBubble(){
        main_object_list.push(new OctoBubble(this.x, this.y, 5))
    }
    moveOctoBubbles(){


        //remove the bubbles that are off the screen
         for(var i=0; i<this.bubble_list.length; i++){
           if(this.bubble_list[i].x > 1000){
                this.bubble_list.splice(i,1);
            }
        }
        
    }
  }



  function getkeyandlog(e) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 32: //space bar
            console.log("space bar");
            myOctopus.blowBubble();
            break;
        case 37: //left arrow key
            console.log("left");
            myOctopus.moveLeft();
            break;
        case 38: //Up arrow key
            console.log("up");
            myOctopus.moveUp();
            break;
        case 39: //right arrow key
            console.log("right");
            myOctopus.moveRight();
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
        this.force_dir = [0,0];
        this.force_mag = 0;    
      }
    
    float()
    {
        this.y -= this.initial_size/4;  //make the vertical speed of bubble proportional to it's size 
        this.x = this.x + 2 * Math.cos(this.y/(2*3.14)) //make the bubbles oscillate as they rise 
    }
    
    draw()
    {
        ctx.strokeStyle = "teal";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + 0, this.y + 0, this.initial_size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    calc_burst_force(burst_origin)
    {
        //x 
        this.force_dir[0] = this.x - burst_origin[0];
        //y
        this.force_dir[1] = this.y - burst_origin[1];
        //magnitude
        this.force_mag = Math.floor(1/(this.force_dir[0]^2 + this.force_dir[1]^2))  //inverse square law
    }

    burst_move()
    {
        this.x += this.force_dir[0] * this.force_mag;
        this.y += this.force_dir[1] * this.force_mag;
    }
}

class OctoBubble{
    constructor(x_origin, y_origin, initial_size) {
        this.x = x_origin;
        this.y = y_origin;
        this.initial_size = initial_size; 
        this.force_dir = [0,0];
        this.force_mag = 0;        
      }
    float()
    {
        this.x += this.initial_size;  //make the horizonatl speed of bubble proportional to it's size 
        this.y = this.y + 2 * Math.cos(this.x/(2*3.14)) //make the bubbles oscillate as they rise 
    }
    draw()
    {
        ctx.strokeStyle = "red   ";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.initial_size, 0, 2 * Math.PI);
        ctx.stroke();  
    }

    calc_burst_force(burst_origin)
    {
        //x 
        this.force_dir[0] = this.x - burst_origin[0];
        //y
        this.force_dir[1] = this.y - burst_origin[1];
        //magnitude
        this.force_mag = Math.floor(1/(this.force_dir[0]^2 + this.force_dir[1]^2))  //inverse square law
    }

    burst_move()
    {
        this.x += this.force_dir[0] * this.force_mag;
        this.y += this.force_dir[1] * this.force_mag;
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
            main_object_list.push(new Bubble(this.x_origin + random_pos, this.y_origin, random_size, "BLAH"))
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
    
    
    
    //draw the first bubble stack 
    myAirstone.Bubble(); //generate   the bubbles
 

    //draw the purple octopus
    myOctopus.draw();
   //Draw the bubbles from the octopus
    for(const item of main_object_list) {
        item.draw();
    }
    for(const item of main_object_list) {
        item.float();
      } 
    
    //remove bubbles that are off the screen
     for(var i=0; i<main_object_list.length; i++){
         if(main_object_list[i].y < 10 || main_object_list[i].x > 1200    ){
             main_object_list.splice(i,1);
         }
      }



    myAirstone1.Bubble(); //generate the bubbles
    myAirstone2.Bubble(); //generate the bubbles


 
}


setInterval(() => {
  Update();
}, 10)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////




  
