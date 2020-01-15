/*Returns an object that provides methods and properties
for drawing and manipulating images and graphics
on a canvas element in a document.
A context object includes information about
colors, line widths, fonts,
and other graphic parameters that can be drawn on a canvas.*/

let context = document.querySelector("canvas").getContext("2d");

//my ball constructor function
const Ball = function(x,y,radius){
    this.color = "rgb(" + Math.floor(Math.random() * 256 ) + "," + Math.floor(Math.random() * 256 ) + "," + Math.floor(Math.random() * 256 ) ;")"//randomnized rgb color
    this.direction = Math.random() * Math.PI * 2; //set direction of ball to flow randomly in 360degree
    this.radius = radius;
    this.speed = Math.random() * 3 + 1 //random speed from 0 -4
    this.x = x;
    this.y = y
}

//START//
//function to update ball position and movement (object literal)

Ball.prototype = {
    updatePosition:function(width, height){
        //take polar/rotational coordinate of ball direction, converted to a Cartesian coordinate system where x and y are independent of each other
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
        //set collision detection for x axis
        if(this.x - this.radius < 0){//if the left side of the ball overflows the left side of viewport
            this.x = this.radius       //set back the ball position to start viewport

            //to make ball bounce back when it touches wall,
            //make it bounce back from y cordinate by flipping the X cordinate/vector ( * -1)
            //then Math.atan2 sets from cartesian cordinates back to polar cordinate 
            this.direction = Math.atan2(Math.sin(this.direction),Math.cos(this.direction) * -1 )
        }else if (this.x + this.radius > width){ //if right side of circle
            this.x = width - this.radius; //set ball back at the start
            this.direction = Math.atan2(Math.sin(this.direction),Math.cos(this.direction) * -1 ) // same as above
        }

        //set collision detection for Y axis
        if(this.y - this.radius < 0){//if the upper side of the ball overflows the  viewport
            this.y = this.radius       //same as with x axix

            //same as above 
            //but this time we instead flip the Y cordinate with ( * -1) as below
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction))
        }else if (this.y + this.radius > height){ //if lower side of circle
            this.y = height - this.radius;
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction)) // same as above
        }
    }
}
//END//

//START//
// bellow we creat a new balls from constructor function

let balls = []
let xCordinates = document.documentElement.clientWidth * 0.5 //set start width point to middle of client viewport
let yCordinates = document.documentElement.clientHeight * 0.5 //set start height point to middle of client viewport

//make a loop to creat balls then push in balls array
for(let i= 0; i < 50; i++){ //creat 50 balls
    balls.push(new Ball(xCordinates,yCordinates, 25))//creat each ball from constructor function and push inside array of balls
}
//END//

//START//
//Below the parent function (parent forloop) to carry the whole execution

function loop(){
    
    //loops whatever is in this function, about 30 to 60 frames per second
    window.requestAnimationFrame(loop)
    //get height and width of client viewport
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;

    context.canvas.height = height;//resize canvas height to equal inner dimension of window                 
    context.canvas.width = width;//resize canvas width to equal inner dimension of window 
    
    //loop through balls array and draw a ball
    for(let i = 0; i < balls.length; i++){
        let ball = balls[i]

        //drawing the ball inside the canvas
        context.fillStyle = ball.color //first give ball color
        
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)//draw arc in a 360 degree circle. 0 = start position, PI*2 = end position 360 degrees
        context.fill()//last fill the ball with the color above

        ball.updatePosition(width, height) //call update position function to make ball move

    }

}
//END//
loop(); //finally call the loop function

