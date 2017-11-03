var player1Score = 0; // Stores the player 1 score in a variable
var player2Score = 0; // Stores the player 2 score in a variable

var paddle1; // Creates a variable to store the object of paddle 1 that the user controls
var paddle2; // Creates a variable to store the object of paddle 2 that the user controls

var paddle1s; // paddle 1 sound variable
var paddle2s; // paddle 2 sound variable
var bgsong; // background song variable
var bg; // Variable to store the background image


function preload() {
  // Load the sounds for the game
  paddle1s = loadSound("sounds/paddle1.wav")
  paddle2s = loadSound("sounds/paddle2.wav")
  bgsong =  loadSound("sounds/bgsong.mp3")
}


function setup() {
  createCanvas(640, 480); 
  bgsong.play();
  bg = loadImage("img/bg.png")  // This is the background image
  var x = width / 2; 
  var y = random(0, height);
  ball = new Ball(x, y, "#AA00FF"); // Creates a new ball 
  paddle1 = new Paddle(20, height/2, 15, 100, "#00ff0c");  // Creates paddle 1
  paddle2 = new Paddle(width-20, height/2, 15, 100, "#00ffd4"); // Creates paddle 2
  textFont("Calibri");
  textSize(36);
}


function draw() {
  // If player 1 scores is equal to 10 AND player 2 score is equal to 10
  if(player1Score == 10 || player2Score == 10){
    drawGameOver();  // Then the game is over
  } else {          // Otherwise
    DrawLogic();   // The game carries on as usual
    Controls();    // The controls load up as usual
  }
}



// Instance of the Ball object
var Ball = function(ballPosX, ballPosY, Colour){
  
  this.X = ballPosX; //  X value of the ball position
  this.Y = ballPosY; // Y value of the ball positon
  this.sizeX = 10; // X value of the ball size
  this.sizeY = 10; // Y value of the ball size
  this.speedX = 4; // X value of the ball speed
  this.speedY = 4; // Y value of the ball speed
  this.Colour = Colour;
  fill(this.Colour);
  ellipse(this.X, this.Y, this.sizeX, this.sizeY); // This draws the ball
  
  // This function is to check if the ball touches the paddle or not
  this.checkCollision = function(){
    // Checks Paddle 1 collision
    if(
      this.X > paddle1.X && this.X < paddle1.X + paddle1.Width
      && this.Y > paddle1.Y && this.Y < paddle1.Y + paddle1.Height){
        this.speedX = -1*this.speedX; // the -1 is multiplied by the ball speed
        paddle1s.play(); // plays paddle 1 sound
    }
    // Checks Paddle 2 collision
    if(
      this.X > paddle2.X && this.X < paddle2.X + paddle2.Width
      && this.Y > paddle2.Y && this.Y < paddle2.Y + paddle2.Height){
        this.speedX = -1*this.speedX; // the -1 is multiplied by the ball speed
        paddle2s.play(); // plays paddle 2 sound
    }
  
  }
  
  // This function will move the ball
  this.move = function(){
    
    this.X += this.speedX;
    this.Y += this.speedY;
    
    this.checkCollision();
    
    if(this.Y < 0 || this.Y > height){
      this.speedY = -1*this.speedY;
    }
    
    if(this.X > width){    // if the ball goes off the canvas
      player1Score += 1;  // add 1 to the score for player 1
      this.X = width/2;
      this.Y = random(0, height);    // regenerate the ball randomly 
    }
    
    if(this.X < 0){   // if the ball goes off the canvas
      player2Score += 1;  //add 1 to the score for player 2
      this.X = width/2;
      this.Y = random(0, height);  // regenerate the ball randomly
    }

    fill(this.Colour);
    ellipse(this.X, this.Y, this.sizeX, this.sizeY); // this is to draw the ball
  }
}

// Instance of the Paddle object
var Paddle = function(X, Y, Width, Height, colour){
  this.X = X;  // X value of the paddle
  this.Y = Y;  // Y value of the paddle
  this.Width = Width;  // width
  this.Height = Height; // height
  this.colour = colour;  //paddle colour
  
  // paddle is a rectangle
  rect(this.X, this.Y, this.Width, this.Height); 
  fill(this.colour);
  
  // this draws the paddle 
  this.draw = function(){
    fill(this.colour);
    rect(this.X, this.Y-5, this.Width, this.Height);
  }

  // this makes the paddle move up 
  this.movePaddleUp = function(){
    if(this.Y > 5){
      this.Y -= 5;
      this.draw();
    }
  }
  // this makes the paddle move down 
  this.movePaddleDown = function(){
    if(this.Y+this.Height < height){
      this.Y += 5;
      this.draw();
    }
  }
}


// This function allows the game state to change when game is over
function drawGameOver(){
  background(128,0,128);  // This is the new background colour 
  textSize(50);
  textFont("Georgia");
  // if player 1 had a higher score than player 2
  if(player1Score > player2Score){   
    // then show a message saying player 1 has won
    text("Player 1 wins!!", height/3, width/5);
  } else {
    // otherwise show a message saying player 2 has won
    text("Player 2 wins!!", height/3, width/5);
  }
}

//
function DrawLogic(){
  image(bg,0,0,640,480) // This loads the background image
  ball.move();  // This allows the ball to move around
  paddle1.draw(); // This draws paddle 1
  paddle2.draw(); // This draws paddle 2
  text(player1Score, 20, 50);  // Shows player 1 score 
  text(player2Score, width -50, 50); // Shows player 2 score
}


// This function shows how you play the game
function Controls()
{
  if (keyIsDown(87)) {
    paddle1.movePaddleUp();  // Paddle 1 moves up when you press 'W'
  }

  if (keyIsDown(83)) {
    paddle1.movePaddleDown(); // Paddle 1 moves down when you press 'S'
  }


  if (keyIsDown(UP_ARROW)) {
    paddle2.movePaddleUp();  // Paddle 2 moves up when you press the up arrow
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    paddle2.movePaddleDown();  // Paddle 2 moves up when you press the down arrow
  }
}