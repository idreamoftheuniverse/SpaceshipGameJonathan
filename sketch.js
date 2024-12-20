// Variables
var shield;
var timer = 30000;
var score = 0;
var spaceship;
var spaceshipImage;
var bg;
var bgImage;
var meteor1, meteor2, meteor1Image, meteor2Image;
var meteors1, meteors2;
var lives = 3;
var gameOver;
var gameOverImage;
var gameState = "start";
var shields;
var boostImage;
// Preloading images
function preload() {
  spaceshipImage = loadImage("images/spaceshi.png");
  bgImage = loadImage("images/bgspace.jpeg");
  meteor1Image = loadImage("images/m1.png");
  meteor2Image = loadImage("images/m2.png");
  gameOverImage = loadImage("images/Gameover.png");
  boostImage=loadImage("images/boost.png")
}

// Setup function
function setup() {
  createCanvas(1800, 950);
  bg = createSprite(500, 350, 800, 500); // Centered
  bg.addImage(bgImage);
  bg.scale = 1;

  spaceship = createSprite(500, 800, 50, 50);
  spaceship.addImage("spaceship", spaceshipImage);
  spaceship.scale = 0.3;
  spaceship.debug=true
  spaceship.setCollider("circle",0,0,40);



  meteors1 = new Group();
  meteors2 = new Group();
  shields = new Group();

  gameOver = createSprite(800, 400);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2;
  gameOver.visible = false;
}

// Draw function

function draw() {
  background(0); // Black background to ensure proper visuals

  if (gameState === "start") {
    handleStartState();
  }

  if (gameState === "boost") {
    handleBoost();
  }

  if (gameState === "over") {
    handleGameOver();
  }

  drawSprites();
  console.log("Camera Position",camera.position.y)
  console.log("Spaceship Position",spaceship.y)
  //camera.position.y = spaceship.y;
  displayStats();



}

// Handle the start state
function handleStartState() {
  gameOver.visible = false;

  // Spaceship movement
// Spaceship movement

  if (keyDown("up")) {
    spaceship.y -= 8;
  }
  if (keyDown("down")) {
    spaceship.y += 9;
  }


if (keyDown("left")) 
  {
    spaceship.x -= 10;
  }
if (keyDown("right")){
  spaceship.x += 10;
}
if(spaceship.y<=0 || spaceship.y>=950){
  spaceship.y=800
}

  // Background scrolling
  bg.position.y += 3;
  if (bg.position.y > 700) {
    bg.position.y = 350; // Reset position for seamless scrolling
  }

  // Spawn meteors and shields
spawnMeteors1();
spawnMeteors2()
spawnShield();

  // Collision logic
  meteors1.overlap(spaceship, function (meteor) {
    lives -= 1;
    meteor.destroy();
  });

  meteors2.overlap(spaceship, function (meteor) {
    lives -= 1;
    meteor.destroy();
  });

  shields.overlap(spaceship, function (shield) {
    shield.destroy();
    gameState = "boost"; // Transition to Boost State
    timer = 30000; // Reset timer for 30 seconds
  });

  // Check game over condition
  if (lives <= 0) {
    gameOver.visible = true;
    gameState = "over";
  }
}

// Handle the boost state
function handleBoost() {
  timer -= deltaTime;

  // Spaceship movement

    if (keyDown("up")) {
      spaceship.y -= 8;
    }
    if (keyDown("down")) {
      spaceship.y += 9;
    }


  if (keyDown("left")) 
    {
      spaceship.x -= 10;
    }
  if (keyDown("right")){
    spaceship.x += 10;
  }
  if(spaceship.y<=0 || spaceship.y>=950){
    spaceship.y=800
  }
  

  // Background scrolling
  bg.position.y += 3;
  if (bg.position.y > 700) {
    bg.position.y = 350; // Reset position for seamless scrolling
  }

  // Continue spawning meteors and shields
  spawnMeteors1();
  spawnMeteors2();
  spawnShield();

  // Meteors increase score, no life reduction
  meteors1.overlap(spaceship, function (meteor) {
    score += 10;
    meteor.destroy();
  });

  meteors2.overlap(spaceship, function (meteor) {
    score += 10;
    meteor.destroy();
  });

  // End boost if timer reaches 0
  if (timer <= 0) {
    timer = 30000; // Reset timer for next boost
    gameState = "start";
  }
}

// Handle the game over state
function handleGameOver() {
  bg.velocityY = 0;
  meteors1.setVelocityYEach(0);
  meteors2.setVelocityYEach(0);
  meteors1.setLifetimeEach(-1);
  shields.setVelocityYEach(0);
  meteors2.setLifetimeEach(-1);
  spaceship.visible = false;
  score=0
}

// Display score, lives, and timer
function displayStats() {
  textSize(35);
  fill("white");
  text("Score: " + score, 750, 100);
  text("Lives: " + lives, 750, 50);
  if (gameState === "boost") {
    text("Boost Timer: " + Math.ceil(timer / 1000), 750, 150);
  }
 score =  score + Math.round(frameCount/200)
 
}

// Spawn meteors
function spawnMeteors1() {
  if (frameCount % 80 === 0) {
    let x1 = Math.round(random(0, 1500));
    meteor1 = createSprite(x1, -50, 50, 50);
    meteor1.addImage("meteor", meteor1Image);
    meteor1.scale = 0.5;
    meteor1.velocityY = 11;
    meteors1.add(meteor1);
    meteor1.debug=true
    meteor1.setCollider("circle",0,0,40)
    meteor1.lifetime = 300;
   
  }
}
function spawnMeteors2() {
  if (frameCount % 60 === 0) {
    
    let x2 = Math.round(random(0, 1500));
    meteor2 = createSprite(x2, -50, 50, 50);
    meteor2.addImage("meteor", meteor2Image);
    meteor2.scale = 0.8;
    meteor2.velocityY = 13;
    meteors2.add(meteor2);
    meteor2.lifetime = 300;
    meteor2.debug=true
    meteor2.setCollider("circle",0,0,40)
  }
}

// Spawn shields
function spawnShield() {
  if (frameCount % 100 === 0) {
    let x = Math.round(random(0, 1500));
    shield = createSprite(x, -50, 50, 50);
    shield.shapeColor = "purple";
    shield.addImage(boostImage);
    shield.scale = 0.3;
    shield.velocityY = 5;
    shields.add(shield);
    shield.setCollider("circle",0,0,40)

    shield.lifetime = 300;
  }
}
