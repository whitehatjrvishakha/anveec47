//THINGS LEFT-
//mam now to generate new body when the player has dropped the coin, 
//ground part , turn , multiplayer settings,ground part , turn ,
//to change the animation on winning condition is left

//QUESTION-
// ??mam how to ensure that each player is only able to drop the coin 
//on its turn
//??????
//mam pls see to ground part

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var squareSize = 60
var database;
var form, player, game;
var board;
var coin;
var col;
var ground;
var playerCount
var allPlayers
var backgroundImg
var gameState = 0
var arrBoard = []
var marginX = 60
var marginY = 100
var canvas
var mouseState = 0
var turn = 1
var fallstate=true;
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function preload(){
  boardImg = loadImage("images/board.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);

  engine = Engine.create();
  world = engine.world;

  database = firebase.database();

  game = new Game();
  game.getGameState();
  game.start();

  form = new Form()

  board = new Board()
  board.pushPosition()
  console.log(arrBoard)
  
  
  ground = new Ground(arrBoard[0][3]["x"],arrBoard[0][0]["y"]+30,420,10)
  coin = new Coin(arrBoard[0][3]["x"],arrBoard[5][0]["y"]-squareSize,50,50);

  var opt={
    mouseConstraint:coin,
    mouseConstraint:ground
  }

  var m= Matter.MouseConstraint.create(engine, opt) ;
  World.add(world,m);
 }



function draw() {
Engine.update(engine);
  if(playerCount === 2){
    game.updateState(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  coin.setCoinX()
 
 
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function mouseClicked(){
  if(fallstate==true){
  coin.coinfall();
  //fallstate=false;
  }

}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function mouseReleased(){
  //coin shud nt follw mouse
  if(Matter.Contact.create(ground.body)){
    fallstate=false;
  } 
  else{
    return false
   fallstate=true;
  }
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function mouseDragged(){
  
  var col = board.getDroppedCoinCol()
  var row = board.getDroppedCoinRow()
  if(isValidCol(col)){
    Matter.Body.setStatic(coin.body, false)
    Matter.Body.setVelocity(coin.body, {x:0,y:10})
    coin.state="Dropped"

    if(horiCheck(row,col)>=4){
      //call winning func

    }else if(vertCheck(row,col)>=4){
     //call winning func
 
    /*}else if(call diag check diagCheck(row,col)>=4){
      call winning func
    }*/
  }else{
    coin.state="Dropped"
    if(turn == 1){
    turn = 2
    }else{
      turn = 1
    }
  }
       
  }
  

  

}
