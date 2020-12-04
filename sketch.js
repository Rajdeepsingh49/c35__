const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;


var dog,dog2;
var food = 30 ;
var text1;      
var database;
var position;
var gameState = "start";



function preload()
{
	 dogimg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  engine = Engine.create();
  world = engine.world;
    
  database = firebase.database();

  dog = new Dog(250,250,120,120);
 
  
  Engine.run(engine);

  var foodstock = database.ref('Food');
  foodstock.on("value", readStock);
  
}


function draw() {  
  rectMode(CENTER);
  background(46,139,87);



  textSize(25);
  fill(random(0, 255), random(0, 255), random(0, 255));
  text("NOTE:press up arrow key to feed the dog",20,40);
  text("FOOD REMAINING:"+food,120,180);

  if(food == 0){
   
    fill(random(0, 255), random(0, 255), random(0, 255));
    text("oh no! the stock is finished.",100,90);
    text("PREE SPACE TO RESTOCK.",88,120);

    
  }

  
  if(food == 0)
  { 
    if(keyCode === 32){
      food = 30;
   }  
  
  }else{
    if(keyWentDown(UP_ARROW)){

      writeStock(foods);
        food = food-1
        
    } 
  }
 

  

  dog.display();
 

 
  drawSprites();
  //add styles here

}

function readStock(data){
  foods = data.val();

}


function writeStock(data){
  if(data<30){
    data = data-data }
  else{
    data = 30
  }
  var v = {
       'Food': data
  }
  database.ref('/').update(v) 
}




  
        
      
      