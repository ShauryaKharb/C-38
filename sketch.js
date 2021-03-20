// const Engine = Matter.Engine;
// const World = Matter.World;
// const Bodies = Matter.Bodies;
// const Constraint = Matter.Constraint;
// var canvas,engine,world;
// var canvasW,canvasH;

var runner,bg;
var runAnime , hurdleI , LoadingImg;
var track,line1,line2,line3,line4,startLine1,startLine2;
var hurdle,hurdleG;
var playerBehindWall;
var score=0;
var gameState = 0 ;

function preload(){

  r2 = loadAnimation("Images/nd.png");
  r3 = loadAnimation("Images/rd.png");
  r6 = loadAnimation("Images/sth.png");

  runAnime = loadAnimation("Images/st.png","Images/nd.png","Images/rd.png","Images/fth.png","Images/fith.png","Images/sth.png");

  hurdleI = loadImage("Images/Hu.png");

  bgImage = loadImage("Images/Sample_track.jpg");

  // finishLineI = loadImage("Images/FinishLine.png");

}

function setup(){
  canvasW = 1600*0.84;
  canvasH =  900*0.84;
  canvas  = createCanvas(canvasW,canvasH);

  bg = createSprite(width/2+510,307,20,20);
  bg.addImage("audience",bgImage);
  bg.scale = 1.5;

  track = createSprite(canvasW,canvasH-100,100000,250);
  track.shapeColor = "#ff6633";

  line1 = createSprite(canvasW,canvasH-230,100000,15)
  line1.shapeColor = "white";

  line2 = createSprite(canvasW,canvasH-160,100000,8);
  line2.shapeColor = "white";

  line3 = createSprite(canvasW,canvasH-90,100000,8);
  line3.shapeColor = "white";

  line4 = createSprite(canvasW,canvasH-20,100000,8);
  line4.shapeColor = "white";

  startLine1 = createSprite(canvasW/2-400,canvasH/2+280,8,250);
  startLine1.shapeColor = "white";

  startLine2 = createSprite(canvasW/2-600,canvasH/2+280,8,250);
  startLine2.shapeColor = "white";

  player = new Runner(200,468,20,20);

  // GROUPS
  hurdleG = createGroup();

}

function draw(){

  // CALL FUNCTIONS () {
    spawnHurdles();
  // }

  background(bgImage); 

  // GRAVITY
  player.body.velocityY+=1.1;

  // PLAYER COLLISION
  player.body.collide(line2);

  // STATICITY
  player.body.velocityX = 0;

  // CAMERA
  if(player.body.x>canvasW/2){
    camera.x = player.body.x;
  }

  if(gameState === 0){
    player.body.changeAnimation("pause2",r2);

    if(keyWentDown("SPACE")){
      gameState = 1;
    }

    drawSprites();

    fill ("white")
    textSize(30);
    text("Press SPACE to start",canvasW/2-180,canvasH/2+50);
    text("And UP ARROW to jump",canvasW/2-200,canvasH/2+100)

  }else if (gameState === 1){

      bg.velocityX=-1.1;
      player.body.velocityX = 10;          
      startLine1.velocityX = -(player.body.velocityX);
      startLine2.velocityX = -(player.body.velocityX);

      // if(score>9){
      //   player.body.velocityX = score;
      // }

      // SCORE 
      if(player.body.x%750===0){
        score+=1;
      }

      // Collider
      if(player.body.y < 440){
        player.body.setCollider("rectangle",-10,25,125,180,15);
      }
      if(player.body.y > 440){
        player.body.setCollider("rectangle",-10,25,145,180);
      }

      // VELOCITIES
      hurdleG.setVelocityXEach(-10);
    
      if(camera.x === player.body.x){
        bg.velocityX=9;
      }
    
      if(keyDown("UP_ARROW") && player.body.y > 465){
        player.body.velocityY=-23;
      }
    
      if(player.body.y > 460){
         player.body.changeAnimation("animation",runAnime);
      }
    
      if(player.body.y < 465){
         player.body.changeAnimation("jumping",r3);
      }
    
      // END
      if(player.body.isTouching(hurdleG)){
        gameState=2;
      }

      

      // BACKGROUND ADJUSTMENT
      if(bg.x > 9970 && bg.x < 10000){
         bg.x = 9970+1182;
      }
    
      if(bg.x > 9970*2 && bg.x < 10000*2){
         bg.x = 9970*2+1182;
      }
    
      if(bg.x > 9970*3 && bg.x < 10000*3){
         bg.x = 9970*3+1182;
      }
    
      if(bg.x > 9970*4 && bg.x < 10000*4){
         bg.x = 9970*4+1182;
      }
    
      if(bg.x > 9970*5 && bg.x < 10000*5){
         bg.x = 9970*5+1182;
      }

      drawSprites();

  }// GAMESTATE = 1
  else if (gameState===2){
    player.body.changeAnimation("jumping",r3);
    bg.velocityX = 0;
    player.body.velocityX = 0;
    player.body.velocityY = 0;
    startLine1.velocityX = 0;
    startLine2.velocityX = 0;
    hurdleG.setVelocityXEach(0);

    drawSprites();

    fill ("white")
    textSize(30);
    text("GAME OVER!",camera.x-120,canvasH/2-320)
  }
  
  fill("black");
  textSize(30);
  text("Score :"+score,camera.x-100,canvasH/2-275);

}

function spawnHurdles(){
  if(frameCount===1){
      // for(var i = 500 ; i < 10000 ; i = i + rand ){
      // var rand = Math.round(random(900,1200));
      // console.log(rand);
      for(var i = 1500 ; i < 1000000 ; i += 1500){
        hurdle = createSprite(i,510,20,20);
        hurdle.addImage("hurdle",hurdleI);
        hurdle.scale = 0.45;
        // hurdle.debug = true;
        hurdle.setCollider("rectangle",100,-10,90,385);
        // Adding hurdle to group
        hurdleG.add(hurdle);
      }
      // }
  }
}