var trex, trex_img,chao,chaoImg,chao2;
var nuvem_img;
var cacto_img1,cacto_img2,cacto_img3,cacto_img4,cacto_img5,cacto_img6;
var  grupoNuvem, grupoCacto;
var PLAY = 1
var END = 0
var gameState = PLAY;
var trexgameover;
var placar = 0;
var gameover
var GameOver
var restart
var Restart
var jump, checkpoint, die;



//carregar os arquivos
function preload(){

    trex_img = loadAnimation("trex1.png", "trex3.png", "trex4.png")
chaoImg = loadImage ("ground2.png");
nuvem_img = loadImage ("cloud.png")
cacto_img1 = loadImage ("obstacle1.png");
cacto_img2 = loadImage ("obstacle2.png");
cacto_img3 = loadImage ("obstacle3.png");
cacto_img4 = loadImage ("obstacle4.png");
cacto_img5 = loadImage ("obstacle5.png");
cacto_img6 = loadImage ("obstacle6.png");
trexgameover = loadAnimation ("trex_collided.png")
GameOver =  loadImage  ("gameOver.png")
Restart = loadImage ("restart.png")
}


//cria objetos e suas caracteristicas
function setup(){
    createCanvas (windowWidth,windowHeight)
    trex=createSprite(50,height-190,40,70)
    trex.addAnimation("correndo", trex_img);
    trex.addAnimation("morrendo", trexgameover);
trex.scale=0.6

trex.setCollider("rectangle",0,0,50,100);

chao = createSprite(width/2,height-190,600,40);
chao.addImage(chaoImg);

chao2 = createSprite(300,height-180,600,10);

chao2.visible= false;
grupoNuvem = new Group ();
grupoCacto = new Group ();
gameover = createSprite (width/2,height/2 -30);
gameover.addImage(GameOver);
gameover.scale = 0.7
restart = createSprite (width/2,height/2)
restart.addImage(Restart)
restart.scale = 0.4
jump = loadSound("jump.mp3");
checkpoint = loadSound ("checkpoint.mp3")
die = loadSound ("die.mp3")
}




function draw(){
     
    if(placar > 550 && placar < 1030){
        background (0)}else{
            background(240);

        }
    drawSprites();
   textFont("arial black")
   textSize(14);
   textAlign(CENTER)
    text("PLACAR:  "+placar, width/2,30);
   
    if (gameState === PLAY){
        chao.velocityX = -4
        if(placar % 100 === 0 && placar > 0) {
         checkpoint.play();   
        }
        
        
        //chao infinito
    if (chao.x < 0){
        chao.x = chao.width/2;
    }
    if ( touches.length > 0 ||keyDown("space")&& trex.y > 150){
    trex.velocityY = -10;
    jump.play();
    touches = [];
    }
    if (trex.isTouching(grupoCacto)){
    gameState = END;
    die.play()
    }
    gerarNuvens()
    gerarCactos()
placar = placar + Math.round(frameRate()/60);
restart.visible=  false
gameover.visible = false



    }else if (gameState === END){
        chao.velocityX = 0
        grupoCacto.setVelocityXEach (0);
        grupoNuvem.setVelocityXEach (0);
        grupoCacto.setLifetimeEach  (-1);
        grupoNuvem.setLifetimeEach  (-1);
        trex.changeAnimation("morrendo");
        restart.visible= true
gameover.visible = true
    if(touches.length > 0){
        reset()
        touches = []
    }
}




 





//gravidade
trex.velocityY = trex.velocityY + 0.5;


trex.collide(chao2);
 
if(mousePressedOver(restart)){
    reset();
}





}



function gerarNuvens(){
 if(frameCount % 80 === 0){ 
var nuvem = createSprite(600,random(40,100),100,20);
    nuvem.addImage(nuvem_img);
    nuvem.velocityX= - 2;
 nuvem.scale=0.8;
nuvem.depth = trex.depth;
    trex.depth += 1;
nuvem.lifetime = width/2; // distancia dividida pela velocidade do sprite

     grupoNuvem.add (nuvem)
}
   
}
function gerarCactos (){
    if (frameCount % 100 === 0){
        var cacto = createSprite (width,height-210,20,40);
        var num = Math.round(random(1,6)) 
        cacto.velocityX = -4
        cacto.scale = 0.6
        switch(num){
            case 1: cacto.addImage (cacto_img1);
            break;
            case 2: cacto.addImage (cacto_img2);
            break;
            case 3: cacto.addImage (cacto_img3);
            break;
            case 4: cacto.addImage (cacto_img4);
            break;
            case 5: cacto.addImage (cacto_img5);
            break;
            case 6: cacto.addImage (cacto_img6);
            cacto.scale = 0.5
            break;
            default: break;
            
        }
 cacto.lifetime = width/4;   
 grupoCacto.add(cacto)   
}
}
 function reset (){
    gameState = PLAY
    grupoCacto.destroyEach()
    grupoNuvem.destroyEach()
    placar = 0
    trex.changeAnimation ("correndo")

 }