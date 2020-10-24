var trex ,trex_running, ground, groundimg, invisibleground, cloudimg,obs1,obs2,obs3,obs4,obs5,obs6,cloudgroup,obstaclegroup, trexcollider, gameover,gameoverImg,restartImg,jump,die,checkpoint,highscore;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var highscore = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");

  groundimg = loadImage("ground2.png");
  
  cloudimg = loadImage("cloud.png");
  
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  trexcollider = loadAnimation("trex_collided.png");
  gameoverImg = loadImage("gameOver-1.png");
  restartImg = loadImage("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3")
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexcollider);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  gameover.scale=0.5;
  gameover.visible=false
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.5
  restart.visible=false
  
  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundimg);
  ground.x = ground.width/2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudgroup=new Group();
  obstaclegroup=new Group();
}

function draw() {
  background(180);
  text("Score :" +score,500,50);
  text("highscore :" +highscore,400,50);
  
  
  
  if(gameState == PLAY){
     ground.velocityX= -(6+3*score/100);
    score = score+Math.round(getFrameRate()/60);
    if(score>0 && score% 100 == 0){
      checkpoint.play();     
    }
    if(keyDown("space")&& trex.y >= 161) {
    trex.velocityY = -13;
      jump.play();
      
  }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnClouds();
    spawnObstacles();
    if (obstaclegroup.isTouching(trex)) {
      gameState=END;
      die.play();
      
    }
  }
  else if(gameState == END){
     ground.velocityX= 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trexcollider);
    gameover.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    
    
  }
  
  if (mousePressedOver(restart)) {
    gameState = PLAY;
    obstaclegroup.destroyEach();
    cloudgroup.destroyEach();
    restart.visible=false;
    gameover.visible=false;
    trex.changeAnimation("running", trex_running);
    trex.depth=ground.depth;
    trex.depth=trex.depth+1;
    if (highscore<score){
      highscore=score;
    }
    score=0;
    
  }
 
  
  
  
  
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  
  //spawn obstacles on the ground
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6+3*score/100);
      // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obs1);
              break;
      case 2: obstacle.addImage(obs2);
              break;
      case 3: obstacle.addImage(obs3);
              break;
      case 4: obstacle.addImage(obs4);
              break;
      case 5: obstacle.addImage(obs5);
              break;
      case 6: obstacle.addImage(obs6);
              break;
      default: break;
      
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 130;
   obstaclegroup.add(obstacle);
  
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }
  
}