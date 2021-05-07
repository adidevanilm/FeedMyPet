var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("FEED THE DOG");
  feedFood.position(660,95);
  feedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
   var time = database.ref('FeedTime');
  time.on("value", readTime);
  //write code to display text lastFed time here
     fill("black")
    if(lastFed>=12){
      lastTime = lastFed - 12 ;
      text("LAST FED : "+ lastTime + "PM", 350, 30)
    }else if(lastFed == 0){
      text("LAST FED : 12 AM",350, 30 )
    }else{
      text("LAST FED : "+ lastFed+ "AM", 350, 30)
    }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS = foodS-1;
  database.ref('/').update({
    Food:foodS
  })

  hour = hour()
  database.ref('/').update({
    FeedTime:hour
  })
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function readTime(data){
  lastFed = data.val();
}
