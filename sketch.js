var PLAY = 1
var END = 0
var score=  0
var trex, trex_running, trex_collided;
var blueGhost, blueGhostGroup
var redGhost, redGhostGroup
var greenGhost, greenGhostGroup
var pinkGhost, pinkGhostGroup
var yellowGhost, yellowGhostGroup
var ground, inivisibleGround, groundImg
var obstaclesGroup, obstacle1, obstacle2, obstacle3
var gameOver
var backgroundImg
var zombie
var gameState = "play"
function preload(){
backgroundImg = loadImage("backgroundImg.png");
sunAnimation = loadImage("sun.png");
groundImg = loadImage("ground.png");
obstacle1 = loadImage("obstacle1.png")
osbstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
gameOverImg = loadImage("gameOver.png")
trex_running = loadAnimation("trex_2.png","trex_1.png","trex_3.png");
  trex_collided = loadAnimation("trex_collided.png");
}

function setup() {
 createCanvas(600,600)
 
 trex = createSprite(40,height-70,20,50);
trex.addAnimation("running", trex_running);
 trex.addAnimation("collided", trex_collided);
 trex.setCollider('circle',0,0,350)
 trex.scale = 0.08;
 

 sun = createSprite(width-30,100,10,10)
 sun.scale = 1

 ground = createSprite(width/2,height,width,2);
 ground.addImage("ground",groundImg);
 ground.x = width/2
 ground.velocityX = -(6 + 3*score/100);

 invisibleGround = createSprite(width/2,height-10,width,125);  
invisibleGround.shapeColor = "#f4cbaa";

 gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5
gameOver.visible = false;

blueGhostGroup= new Group();
redGhostGroup = new Group();
greeenGhostGroup = new Group();
yellowGhostGroup = new Group();
pinkGhostgroup = new Group();
}

function draw() {
background("white")
textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
      jumpSound.play( )
      trex.velocityY = -11;
       touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnBlueGhosts();
    spawnRedGhosts();
    spawnGreenGhosts();
    spawnYellowGhosts();
    spawnPinkGhosts();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
       // collidedSound.play()
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    blueGhostGroup.setVelocityXEach(0);
    redGhostGroup.setVelocityXEach(0);
    greenGhostGroup.setVelocityXEach(0);
    yellowGhostGroup.setVelocityXEach(0);
    pinkGhostGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
    
    
    obstaclesGroup.setLifetimeEach(-1);
    blueGhostGroup.setLifetimeEach(-1);
    redGhostGroup.setLifetimeEach(-1);
    greenGhostGroup.setLifetimeEach(-1);
    yellowhostGroup.setLifetimeEach(-1);
    pinkGhostGroup.setLifetimeEach(-1);
    
    
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
    
  }
  drawSprites()
}
function spawnBlueGhosts(){
    if (frameCount % 60 === 0) {
        var blueGhost = createSprite(width+20,height-300,40,10);
        blueGhost.y = Math.round(random(100,220));
        blueGhost.addImage(blueGhost.png);
       blueGhost.scale = 0.5;
        blueGhost.velocityX = -3;
    
       blueGhost.lifetime = 300;
        
       blueGhost.depth = trex.depth;
       trex.depth = trex.depth+1;
        blueGhostGroup.add(blueGhost);
      }
      
    }
    function spawnRedGhosts(){
        if (frameCount % 60 === 0) {
            var redGhost = createSprite(width+20,height-300,40,10);
            redGhost.y = Math.round(random(100,220));
           red.addImage(redGhost.png);
           redGhost.scale = 0.5;
            redGhost.velocityX = -3;
            
           redGhost.lifetime = 300;
    
            redGhost.depth = trex.depth;
            trex.depth = trex.depth+1;
            
            redGhostGroup.add(redGhost);
          }
          
        }

        function spawnGreenGhosts(){
            if (frameCount % 60 === 0) {
                var greenGhost = createSprite(width+20,height-300,40,10);
                greenGhost.y = Math.round(random(100,220));
                greenGhost.addImage(blueGhost.png);
               greenGhost.scale = 0.5;
                greenGhost.velocityX = -3;
                
               greenGhost.lifetime = 300;
                
               greenGhost.depth = trex.depth;
               trex.depth = trex.depth+1;
                greenGhostGroup.add(greenGhost);
              }
              
            }
        function spawnYellowGhosts(){
            if (frameCount % 60 === 0) {
                var yellowGhost = createSprite(width+20,height-300,40,10);
                yellowGhost.y = Math.round(random(100,220));
                yellowGhost.addImage(yellowGhost.png);
               yellowGhost.scale = 0.5;
                yellowGhost.velocityX = -3;
                
               yellowGhost.lifetime = 300;
            
               yellowGhost.depth = trex.depth;
               trex.depth = trex.depth+1;
                
                yellowGhostGroup.add(yellowGhost);
              }
              
            }
            function spawnPinkGhosts(){
                if (frameCount % 60 === 0) {
                    var pinkGhost = createSprite(width+20,height-300,40,10);
                   pinkGhost.y = Math.round(random(100,220));
                    pinkGhost.addImage(pinkGhost.png);
                   pinkGhost.scale = 0.5;
                    pinkGhost.velocityX = -3;
                    
                   pinkGhost.lifetime = 300;
                    
                   pinkGhost.depth = trex.depth;
                   trex.depth = trex.depth+1;
                    pinkGhostGroup.add(pinkGhost);
                  }
                  
                }
                function spawnObstacles() {
                    if(frameCount % 60 === 0) {
                      var obstacle = createSprite(600,height-95,20,30);
                      obstacle.setCollider('circle',0,0,45)
                      obstacle.velocityX = -(6 + 3*score/100);
        
                      var rand = Math.round(random(1,2,3));
                      switch(rand) {
                        case 1: obstacle.addImage(obstacle1);
                                break;
                        case 2: obstacle.addImage(obstacle2);
                                break;
                        case 3: obstacle.addImage(obstacle3);
                        default: break;
                      }           
                      obstacle.scale = 0.3;
                      obstacle.lifetime = 300;
                      obstacle.depth = trex.depth;
                      trex.depth = trex.depth + 1
                      //trex.depth +=1;
                      obstaclesGroup.add(obstacle);
                    }
                  }
                  
                  function reset(){
                    gameState = PLAY;
                    gameOver.visible = false;
                    
                    
                    obstaclesGroup.destroyEach();
                    blueGhostGroup.destroyEach();
                    redGhostGroup.destroyEach();
                    greenGhostGroup.destroyEach();
                    yellowGhostGroup.destroyEach();
                    pinkGhostGroup.destroyEach();
                    
                    
                    
                    trex.changeAnimation("running",trex_running);
                    
                    score = 0;
                    
                  }
                  
