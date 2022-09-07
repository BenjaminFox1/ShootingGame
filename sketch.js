var player;
var bulletArray = [];
var asteroidArray = [];
var score = 0;
var gameOver = false;

function setup() {
    createCanvas(1200, 800);
    player = new PlayerObject(50);
    asteroidArray = createAsteroid(40, round(random(30,70)), 5);
}
function draw() {
    background(120,120,120,45);

    if (!gameOver){
	drawBullet();

	if (bulletArray.length > 20){
	    bulletArray = [];
	}
	
	player.draw();
	stroke(0);
	drawAsteroidObjects(asteroidArray);
	
	bulletHitsAsteroidObject();
	
	fill(255,255,255,200);
	textSize(50);
	text("Score: " + score ,50,50);
    }    
}
function AsteroidObject (size,speed){
    this.x = round(random(0, width));
    this.y = round(random(0, height));
    this.size = size;
    this.speed = speed;
    this.isHit = false;
    this.hitPoints = 2;
    this.score = this.size;
    this.red = round(random(0,255));
    this.green = round(random(0,255));
    this.blue = round(random(0,255));
    this.draw = function() {
	fill(this.red, this.green, this.blue,150);
	if (this.isHit == false && this.hitPoints == 2){
	    ellipse(this.x = this.x - this.speed, this.y, this.size, this.size);
	} else if (this.isHit == false && this.hitPoints == 1){
	    fill(this.red, this.green, this.blue,150);
	    ellipse(this.x = this.x -  this.speed, this.y, this.size= this.size+0.5, this.size = this.size+0.5);
	    this.score = this.size*2;
	}
	if (this.hitPoints == 0){
	    score = score + this.score;
	}
	if (this.isHit == true || (this.x + this.size) < 0 || this.hitPoints == 0){
	    this.x = width;
	    this.y = round(random(0,height));
	    this.isHit = false;
	    this.hitPoints = 2;
	    this.size = size;
	}
    };
}
function createAsteroid(numberOfAsteroids, size, speed){
    functionArray=[];
    for (let i = 0; i < numberOfAsteroids; i++){
	functionArray.push(new AsteroidObject(size, speed));
    }
    return functionArray;
}
function bulletObject (directionofBullet, speed){
    this.x = mouseX;
    this.y = mouseY-25;
    this.speed = speed;
    this.direction = directionofBullet;
    this.draw = function (){
	if (this.stopped == false){
	    fill(255);
	    if (this.direction == "left"){
		ellipse(this.x-25, this.y+25, 5, 5);
		this.x = this.x - this.speed;
	    }
	    if (this.direction == "right"){
		ellipse(this.x+25, this.y+25, 5, 5);
		this.x = this.x + this.speed;
	    }
	    if (this.direction == "up"){
		ellipse(this.x, this.y, 5, 5);
		this.y = this.y - this.speed;
	    }
	    if (this.direction == "down"){
		ellipse(this.x, this.y+50, 5, 5);
		this.y = this.y + this.speed;
	    }
	}
    };
    this.stopped = false;
}
function drawAsteroidObjects(x){
    for (let i = 0; i < x.length; i++){
	x[i].draw();
    }
}
function drawBullet (){
    for (var i = 0; i < bulletArray.length; i++){
	bulletArray[i].draw();
    }
}
function PlayerObject(size) {
    this.x = mouseX;
    this.y = mouseY;
    this.size = 50;
    this.draw = function(){
	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, size, size);
    };
}
// Logic
function bulletHitsAsteroidObject() {
    for (let i = 0; i < bulletArray.length; i++){
	for (let j = 0; j < asteroidArray.length; j++){
	    if (bulletArray[i].stopped==false &&
		(dist(bulletArray[i].x, bulletArray[i].y, asteroidArray[j].x, asteroidArray[j].y) < asteroidArray[j].size/2)){
		asteroidArray[j].hitPoints = asteroidArray[j].hitPoints - 1;
		bulletArray[i].stopped = true;		
	    }
	}    
    }
}


function keyPressed (){
    if (keyCode == 65){
	bulletArray.push(new bulletObject("left",10));
    }
    if (keyCode == 68){
	bulletArray.push(new bulletObject("right",10));
    }
    if (keyCode == 87){
	bulletArray.push(new bulletObject("up",10));
    }
    if (keyCode == 83){
	bulletArray.push(new bulletObject("down",10));
    }
}
