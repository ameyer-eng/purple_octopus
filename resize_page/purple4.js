
//stupf global variables 
var burst = false;
var burst_origin = [0,0];
var burst_power = 1000;
var main_object_list = [];
var score = 0;

//stuph to setup the KANVAS
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var animation_timer = 30;

class Octopus {
    constructor(x_origin, y_origin) {
      this.x = x_origin;
      this.y = y_origin;
      this.bubble_list = [];
      
    }
    
    draw =()=> {

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

    moveUp =()=>{
        this.y -= 10;
    }
    moveDown=()=>{
        this.y += 10;
    }
    moveRight=()=>{
        this.x += 10;
    }
    moveLeft=()=>{
        this.x -= 10;
    }
    blowBubble=()=>{
        main_object_list.push(new OctoBubble(this.x, this.y, 5))
    }
    moveOctoBubbles=()=>{


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
            myOctopus.blowBubble();
            break;
        case 37: //left arrow key
            myOctopus.moveLeft();
            break;
        case 38: //Up arrow key
            myOctopus.moveUp();
            break;
        case 39: //right arrow key
            myOctopus.moveRight();
            break;
        case 40: //down arrow key
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
        this.distance_2_burst = 0;    
        this.exists = true;
      }
    
    float =() =>
    {
        this.y -= this.initial_size/4;  //make the vertical speed of bubble proportional to it's size 
        this.x = this.x + 2 * Math.cos(this.y/(2*3.14)) //make the bubbles oscillate as they rise 
    }
    
    draw =()=>
    {
        if(burst == false){
            ctx.strokeStyle = "teal";
        }else{
            ctx.strokeStyle = "white";
        }
        
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + 0, this.y + 0, this.initial_size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    calc_burst_force =(burst_origin)=>
    {
        //x 
        this.force_dir[0] = this.x - burst_origin[0];
        //y
        this.force_dir[1] = this.y - burst_origin[1];;
        //magnitude
        this.distance_2_burst = Math.floor(Math.sqrt((this.force_dir[0]**2 + this.force_dir[1]**2)))  //inverse square law

        //normalize the vectors
        this.force_dir[0] = this.force_dir[0]/this.distance_2_burst;
        this.force_dir[1] = this.force_dir[1]/this.distance_2_burst;

    }

    burst_move =()=>
    {
        this.x += Math.floor(this.force_dir[0]*burst_power*1/(this.distance_2_burst));
        this.y += Math.floor(this.force_dir[1]*burst_power*1/(this.distance_2_burst));
    }
}

class OctoBubble{
    constructor(x_origin, y_origin, initial_size) {
        this.x = x_origin;
        this.y = y_origin;
        this.initial_size = initial_size; 
        this.force_dir = [0,0];
        this.force_mag = 0;  
        this.burst_timer = 150;
        this.exists = true;      
      }
    float =()=>
    {
        if(this.exists == true){
            this.x += this.initial_size;  //make the horizonatl speed of bubble proportional to it's size 
            this.y = this.y + 2 * Math.cos(this.x/(2*3.14)) //make the bubbles oscillate as they rise 
            //check the burst timer
            if(this.burst_timer <= 0)
            {
                burst = true;
                burst_origin = [this.x, this.y];
                this.exists = false;
            }
            //lower the timer
            this.burst_timer -= 1;
        }

    }
    draw =()=>
    {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.initial_size, 0, 2 * Math.PI);
        ctx.stroke();  
    }

    calc_burst_force =(burst_origin)=>
    {
        return 0;
    }

    burst_move =()=>
    {
        return 0;
    }
}
 

class Airstone{
    constructor(x_origin, y_origin){
        this.x_origin = x_origin;
        this.y_origin = y_origin;
        this.bubble_list = [];
    }

    Bubble =()=>{
        var random_pos = Math.floor(Math.random()*50);
        var random_num = Math.floor(Math.random()*40);
        var random_size = Math.floor(Math.random()*15);
        if(random_num == 5){
            main_object_list.push(new Bubble(this.x_origin + random_pos, this.y_origin, random_size, "BLAH"))
        }
    }

}

class trash_generator{
    constructor(){
    }

    make(){
        var random_pos = Math.floor(Math.random()*501 + 50);
        var random_size = Math.floor(Math.random()*3);
        var trash_seed = Math.floor(Math.random()*100);

            if(trash_seed == 5){
            main_object_list.push(new paperTrash(1100, random_pos, random_size, "BLAH"))
            console.log("TRASH MADE!!!")
        }
    }

}

class paperTrash{
    constructor(x_origin, y_origin, initial_size, color) {
        this.x = x_origin;
        this.y = y_origin;
        this.point_list = [[-20,0], [-10,10], [0,10], [10,10], [20,0], [10,-10], [0,-10], [-10,-10]];
        this.initial_size = initial_size;
        this.color = color;
        this.force_dir = [0,0];
        this.distance_2_burst = 0;    
        this.exists = true;
        this.health = 170;

        //randomize the trash points
        for(var point of this.point_list){
            point[0] = (point[0] + Math.floor(Math.random()*11+5)) * this.initial_size;
            point[1] = (point[1] + Math.floor(Math.random()*11+5)) * this.initial_size;
        }
        
    }
    draw =() =>
    {
        if(this.health<10){
            this.exists = false;
            score += 1;
            console.log("Score: "+ score);
            document.getElementById('score').innerHTML = `Score: ${score}`;
        }
        
        if(this.exists == true){
   
            if(this.health >150 && this.health <= 170){
                ctx.fillStyle = `rgba(${this.health}, ${this.health}, ${this.health}, 1.0`;
            }else if(this.health >90 && this.health <= 150){
                ctx.fillStyle = `rgba(${this.health}, ${this.health}, ${this.health}, 0.75`;
            }else if(this.health >30 && this.health <= 90){
                ctx.fillStyle = `rgba(${this.health}, ${this.health}, ${this.health}, 0.5`;
            }else if (this.health <= 30){
                ctx.fillStyle = `rgba(${this.health}, ${this.health}, ${this.health}, 0.25`;
            }
            
     
            
            ctx.beginPath();
            ctx.moveTo(this.x + this.point_list[0][0], this.y + this.point_list[0][1]);
            ctx.lineTo(this.x + this.point_list[1][0], this.y + this.point_list[1][1]);
            ctx.lineTo(this.x + this.point_list[2][0], this.y + this.point_list[2][1]);
            ctx.lineTo(this.x + this.point_list[3][0], this.y + this.point_list[3][1]);
            ctx.lineTo(this.x + this.point_list[4][0], this.y + this.point_list[4][1]);
            ctx.lineTo(this.x + this.point_list[5][0], this.y + this.point_list[5][1]);
            ctx.lineTo(this.x + this.point_list[6][0], this.y + this.point_list[6][1]);
            ctx.lineTo(this.x + this.point_list[7][0], this.y + this.point_list[7][1]);
            ctx.closePath();
            ctx.fill();
        }

    }

    calc_burst_force =(burst_origin)=>
    {
        //x 
        this.force_dir[0] = this.x - burst_origin[0];
        //y
        this.force_dir[1] = this.y - burst_origin[1];;
        //magnitude
        this.distance_2_burst = Math.floor(Math.sqrt((this.force_dir[0]**2 + this.force_dir[1]**2)))  //inverse square law

        //normalize the vectors
        this.force_dir[0] = this.force_dir[0]/this.distance_2_burst;
        this.force_dir[1] = this.force_dir[1]/this.distance_2_burst;

        if(this.distance_2_burst < 200){
            this.health -= 20;
        }
    }

    float =()=> {
        if(this.x < 20){
            this.exists = false;
            score -= 20;
            document.getElementById('score').innerHTML = `Score: ${score}`;
        }
        if(this.exists == true){this.x -= 0.5;}
    }

    burst_move =()=>
    {
        if(this.distance_2_burst < 200){
            this.x += Math.abs(Math.floor(this.force_dir[0]*(burst_power/100)*1/(this.distance_2_burst)));
            this.y += Math.floor(this.force_dir[1]*(burst_power/100)*1/(this.distance_2_burst)); 
        }    
    }

}




let myOctopus = new Octopus(100, 100);
let myAirstone = new Airstone(500, 600);
let myAirstone1 = new Airstone(800, 600);
let myAirstone2 = new Airstone(1000, 600);
let myTrashGen = new trash_generator();



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
    
    //draw the purple octopus
    myOctopus.draw();

    if(burst ==false){
        for(const item of main_object_list) {
            item.draw();
        }
        for(const item of main_object_list) {
            item.float();
        } 
    
        //remove bubbles that are off the screen
         for(var i=0; i<main_object_list.length; i++){
             if(main_object_list[i].y < 0 || main_object_list[i].x > 1500||main_object_list[i].x < 0 || main_object_list[i].exists == false){
                 main_object_list.splice(i,1);
             }
          } 
        myAirstone.Bubble(); //generate   the bubbles
        myAirstone1.Bubble(); //generate the bubbles
        myAirstone2.Bubble(); //generate the bubbles
        myTrashGen.make(); //generate the trash
    }

   
    if(burst == true)
    {
        //calculate the burst force for each bubble
        for(const item of main_object_list) {
            item.calc_burst_force(burst_origin);
        } 
        //burst move and draw the items
        for(const item of main_object_list) {
            item.burst_move();
            item.draw();
        } 
        animation_timer -= 1;

        if(animation_timer < 0){
            burst = false;
            animation_timer = 30; //reset the animation timer
        }
        
    
    }


 
}


setInterval(() => {
  Update();
}, 10)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////




  
