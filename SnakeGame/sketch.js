var snake = new Snake(); // This variable stores the snake
var food = new Food();   // This variable stores food
var scl = 30;  // This is our scale
var sHeight = 600; // Height of the canvas
var sWidth = 600;  // Width of the canvas
var eatSong; // This is the eat sound
var bgSong // This is the background song
var score = 0; // Variable to store the score 


function preload() {
  // Load the sounds for the game
  eatSong = loadSound("sounds/eat.mp3")  // Sound for the eating 
  bgSong =  loadSound("sounds/bgsong.mp3") // Sound for the background
}

function setup() {
  bgSong.play();  // Plays the background song
  createCanvas(600,600); 
  frameRate(7);   // This is how fast the snake is moving
}

function draw() {
  background(102, 0, 102);  // This is the background
  snake.update();  // Updates the snake movements on the canvas
  food.show();  // Shows the food on the canvas
  snake.display();  // Shows the snake on the canvas
  text(score, 30,30); // Shows score count at the top left side of canvas
}

// Constructor function for the food objects
function Food() {
  this.x = 0;  // X value of the food
  this.y = 0;  // Y value of the food
  this.show = function() {
    fill(255);  // Colour of the food
    // Start location of the rext is (0,0) whilst the size is of the same scale as the snake
    rect(this.x, this.y, scl, scl); 
  };
  // This creates a new position for the food each time it gets eaten
  this.changeofPos = function() {
    // Creates a random location for both X and Y values of the food anywhere on the scale
    this.x = Math.floor(random(0, sWidth/scl)) * scl;
    this.y = Math.floor(random(0, sHeight/scl)) * scl;
  };
}

// this function enables the snake to move around 
function keyPressed() {
  // if a key is equal to the up arrow
  if (keyCode === UP_ARROW) {
    // the snakes direction moves up
    snake.dir = "UP"
    // if a key is equal to the down arrow
  } else if (keyCode === DOWN_ARROW) {
    // the snakes direction moves down
    snake.dir = "DOWN"
    // if a key is equal to the left arrow
  } else if (keyCode === LEFT_ARROW) {
    // the snakes direction moves left
    snake.dir = "LEFT"
    // if a key is equal to the right arrow
  } else if (keyCode === RIGHT_ARROW) {
    // the snakes direction moves right
    snake.dir = "RIGHT"
  } 
}

// Constructor function of the Snake object
function Snake() {
  this.x = 0;  // X value of the snake
  this.y = 0;  // Y value of the snake
  this.dir= "RIGHT";  // Beginning direction of the snake is always right
  this.tail = []; // Array to store its tail
  this.total = 0; // Begins with 0 as snake hasn't ate anything yet
    this.update = function() {
      
        if(this.dir === "RIGHT") {    // If the direction of the snake is right
            this.x = this.x + scl;    // it's x value is added by 1 to the scale 
        } else if(this.dir === "LEFT") {  // If it is left
            this.x = this.x - scl;        // It's x value is taken away 1 from the scale
        } else if(this.dir === "UP") {   // If its directon is upwards
            this.y = this.y - scl;       // The y value is shifted 1 down from the scale
        } else {                       // And finally, if the direction is down
            this.y = this.y + scl;    // The y value is added 1 up from the scale
        }

      // This is to recreate the snake when it goes off canvas
        if(this.x >= sWidth) {  // If the x value is greater than or equal to the canvas width
           this.x = 0;         // it would come back to the canvas from the other side
        } if(this.x < 0) {     // If it is less than 0
            this.x = sWidth;    // It equals to the width
        } if(this.y >= sHeight) {  // If the y value is greater than or equal to the canvas height
            this.y = 0;           // It would come back to the canvas from the other side
        } if(this.y < 0) {      // If it is less than 0
            this.y = sHeight;    // It equals to the height
        }

      // This is to check if the x value of the food equals to the y value of food
        if(this.x === food.x && this.y === food.y) { // If this is correct for the game
            this.eat();   // The snake eats the food
        }

      // This stores the tail of the snake in an array, its length increases each time
        for(var i=this.tail.length-1; i>=1; i--) { 
            this.tail[i] = this.tail[i-1];
            }
        // Array always begins with 0 and stores the x & y val of the snake
        this.tail[0] = [this.x, this.y];
    };
    
    // This is the eat funciton 
    this.eat = function() {
        // Once food is eaten the position of the food changes
        food.changeofPos();
        // The food eaten then gets pushed into the array of the snake
        this.tail.push([this.x, this.y]);
        
        // Increment score count upon eating
        score++;
        
        eatSong.play(); // Plays the eat sound 
    };
    
    // This displays the snake 
    this.display = function() {
        // Snake colour
        fill(255, 204, 229);
        // This stores the snakes values in an array
        // each time it moves the length is increased by 1
        for(var i=0; i<this.tail.length; i++) {
           // This creates a rectangle with one added on to its location behind the snake itself
            rect(this.tail[i][0],this.tail[i][1], scl, scl);
        }
    }
    
}