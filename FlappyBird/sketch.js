// Flappy Bird
// By Rooha Sulehri

var bird1;      // Create a Bird variable which will be the object that the user controls
var walls;      // These are the walls that will be the challenge of the game, it will be contained in an array
var gameIsOver; // Game Over status - boolean value
var gameWon;    // Game winning state

var bg;         // Variable to store background image
var gbg;        // Variable to store game over background image.
var wbg;        // Variable to store game won background image.

// Instance of the Bird object
var Bird = function(X, Y, W, H){
    
    this.X = X; //X Value of the Bird
    this.Y = Y; // Y Value of the Bird
    this.W = W; // width
    this.H = H; // height
    this.img = loadImage("images/bird.png"); // Load the bird image
    
    // The draw function is to draw the Bird each frame in the canvas.
    this.draw = function(){
        // Velocity of the bird is always falling because of the concept of the game.
        this.Y += 2;
        // Load the bird as an image, exactly the same as creating a rect() but calling it to an image()
        image(this.img, this.X, this.Y, this.W, this.H);
    }
    
    // The probe function fires when the spacebar is pressed acts as the acceleration velocity of the Bird, raising it up.
    // The velocity of the Bird changes in a linear way rising it 7 pixels each frame.
    this.probe = function(){
        this.Y -= 7;
    }
}

// Instance of the Wall object
var Wall = function(X, Y, W, H, type){
    this.X = X; // X value of the Wall
    this.Y = Y; // Y value of the Wall
    this.W = W; // width
    this.H = H; //height
    this.type = type;
    this.topPipe = loadImage("images/topPipe.png");        // Image for the top pipe
    this.bottomPipe = loadImage("images/bottomPipe.png");  // Image for the bottom pipe
    
    // Velocity of the moving wall, this must be a constant value across the game, possibly can be altered to be
    // changed when the game gets more difficult.
    this.V = 2; 
    
    // The draw function will draw the wall on each frame on the canvas.
    this.draw = function(){
        // Check which type of pipe to draw and draw it respectively.
        if(this.type == "top"){
            image(this.topPipe, this.X, this.Y, this.W, this.H);
        } else {
            image(this.bottomPipe, this.X, this.Y, this.W, this.H);
        }
    }
    
    // This function will move the wall each second towards the left hand side of the screen.
    // The game simulates the moving player by actually translating the walls off the canvas.
    this.moving = function(){
        this.X -= this.V;
        this.draw();
    }
    
}

// This function is to detect the Bird's collision with any wall
function collisionDetection(){
    
    // Check if the bird is past the last pipe in the game and if so, set the game winning state.
    if(bird1.X > walls[walls.length-1].X){
        gameWon = true;
        return;
    }
    
    // Check if the bird is out of the canvas, if so the game is over.
    if(bird1.Y < 0 || bird1.Y > height){
        gameIsOver = true;
        return;
    }

    for(var i=0; i<walls.length; i++){

        // To check the collision, we check the bounds of the rect walls against the bounds of the Bird. 
        //To do this we compare the coordinates of the Bird to the coordinates of the wall.
        if(
            bird1.X + bird1.W/2 > walls[i].X &&
            bird1.X < walls[i].X + walls[i].W &&
            bird1.Y + bird1.H > walls[i].Y &&
            bird1.Y < walls[i].Y + walls[i].H
        ){
            gameIsOver = true;
        }
    }
}

function restart(){
    textSize(32);
    color(255);
    text("PRESS SPACE TO RESTART", 80, (height/5)*4)
    if (keyIsDown(32)){
        setup();
    }
}

function setup() {
    createCanvas(600,400);
    angleMode(DEGREES);
    bg = loadImage("images/bg.png");         // Images need to be loaded prior to game starting
    gbg = loadImage("images/gameover.png");  // Images need to be loaded prior to game starting
    wbg = loadImage("images/gameWon.jpg");   // Images need to be loaded prior to game starting
    
    gameIsOver = false; // Starting value of the game over is false.
    gameWon = false; // Starting value of winning state is false.
    
    bird1 = new Bird(60, height/2,30,30) // Create a new Bird that starts at (60, 200)

    walls = new Array(50); // Preload the walls array to be able to add wall objects inside it.

    var startPoint = 30; // Create the start point for the walls.
    var spacing = bird1.H+100; // Set the verticle spacing between the walls.
                               // So that the Bird can pass through

    // In this loop we create a set of two walls at each iteration.
    // The reason for this is so that we can add a spacing between them but keep the X value the same,
    // this mimics the concept of having a gap between one wall.
    // The spacing between each wall is 15 as the startPoint increments.
    for(var i = 0; i < walls.length; i+=2){
        var heightTop = random(height/4, height-50)
        walls[i] = new Wall(startPoint*10, 0, 15, heightTop, "top");
        walls[i+1] = new Wall(startPoint*10, heightTop+spacing, 15, height/2+heightTop, "bottom");
        startPoint+=15;
    }
}

//This is to draw the frames of the game
function draw() {
    
    // Run this function to check for collision on each frame and to check if the bird in in the canvas.
    collisionDetection();

    // Check if game is over, if it is then draw the gameover screen, otherwise if the game is won draw that screen
    // otherwise draw the normal canvas.
    if(gameIsOver){
        background(gbg);
        restart();
    } else if(gameWon) {
        background(wbg);
        restart();
    } else {
        // If spacebar is clicked, probe the Bird to rise.
        if (keyIsDown(32)){
            bird1.probe();
        }
        background(bg);
        // Draw the Bird on the canvas.
        bird1.draw();

        // Draw all the walls in the array on the canvas, but update their position to be
        // moving to the left each frame. This renders as a nice smooth animation.
        for(var i = 0; i<walls.length; i++){
            walls[i].moving();
        }
    }
}