//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count;
var trex,trex_running,trex_collided;
var ground,invisibleGround,groundimage;
var cloudimage,CloudsGroup;
var ObstaclesGroup,Obstacle1,Obstacle2,Obstacle3,Obstacle4,Obstacle5,Obstacle6;
var restart,restartimage;
var gameOver,gameoverimage;
var count = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  Obstacle1 = loadImage("obstacle1.png");
  Obstacle2 = loadImage("obstacle1.png");
  Obstacle3 = loadImage("obstacle1.png");
  Obstacle4 = loadImage("obstacle1.png");
  Obstacle5 = loadImage("obstacle1.png");
  Obstacle6 = loadImage("obstacle1.png");
  restartimage = loadImage("restart.png");
  gameoverimage = loadImage("gameOver.png");
  
  

  
}

function setup() {
  createCanvas(600, 200);
  //create a trex sprite
 trex = createSprite(50,180,20,50);
trex.addAnimation("running",trex_running);
trex.addAnimation("collided",trex_collided);
  //scale and position the trex
trex.scale = 0.5;


//create a ground sprite
 ground = createSprite(200,180,400,20);
ground.addImage("ground",groundimage);
ground.x = ground.width /2;
ground.velocityX = -(6+3*count/100);

//invisible Ground to support Trex
 invisibleGround = createSprite(200,180,400,5);
invisibleGround.visible = false;
  //create Obstacle and Cloud Groups
ObstaclesGroup = new Group();
 CloudsGroup = new Group();

//place gameOver and restart icon on the screen
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
 gameOver.addImage(gameoverimage);
gameOver.scale = 0.5;
restart.addImage(restartimage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);
  
}

function draw() {
 
   //set background to white
  background("white");
  //display score
  text("Score: "+ count, 500, 50);
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count+ Math.round(getFrameRate()/60);
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 150){
      trex.velocityY = -12 ;
     
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    spawnObstacles ();
    spawnClouds ();
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function reset(){
   gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  count = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
  switch (rand){
    case 1: obstacle.addImage(Obstacle1);
      break;
       case 2: obstacle.addImage(Obstacle2);
      break;
       case 3: obstacle.addImage(Obstacle3);
      break;
       case 4: obstacle.addImage(Obstacle4);
      break;
       case 5: obstacle.addImage(Obstacle5);
      break;
       case 6: obstacle.addImage(Obstacle6);
      break;
      default:break;
  }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y =  Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
