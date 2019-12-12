var sad, happy, food, startAtFood, ball, sleep, foodProgress, painting1, painting2, painting3, painting4, painting;
var foodX, foodY, foodW, foodH;
var paintingX, paintingY, paintingW, paintingH;
var ballX, ballY, ballW, ballH;
var sleepX, sleepY, sleepW, sleepH;
var draggingBone = false;
var draggingBall = false;
var draggingSleep = false;
var rolloverBone = false;
var rolloverBall = false;
var rolloverSleep = false;
let font, fontsize = 20;
var offsetX, offsetY;
var dogX = 650;
var sadX = 650;
var dogY = 350;
var dogW, dogH;
var lampOn, lampOff;
var lampOnX, lampOnY, lampOnH, lampOnW;
var lampOffX, lampOffY, lampOffH, lampOffW;
var button;
let lastDogState;
let bg;
let y = 0;
let isLightOn = false;

function preload() {
	soundFormats('mp3', 'ogg');
	sad = loadImage("./image/dog-sad.png");
	food = loadImage("./image/food.png");
	font = loadFont("./assets/OpenSans.ttf");
	happy = loadImage("./image/dog-regular.png");
	sleep = loadImage("./image/sleep.png");
	ball = loadImage("./image/ball.png");
	Sound = loadSound("./assets/song.mp3");
	lampOn = loadImage("./image/lampon.png");
	lampOff = loadImage("./image/lampoff.png");
	dogfood = loadImage("./image/dog-food.png");
	bark = loadSound("./audio/dogbark.mp3");
	dogball = loadImage("./image/dog-ball.png");
	dogsleep = loadImage("./image/dog-sleep.png");
	painting1 = loadImage("./image/painting1.png");
	painting2 = loadImage("./image/painting2.png");
	painting3 = loadImage("./image/painting3.png");
	painting4 = loadImage("./image/painting4.png");
}
const foodOriginalX = 80;
const foodOriginalY = 300;
const ballOriginalX = 80;
const ballOriginalY = 500;
const sleepOriginalX = 80;
const sleepOriginalY = 700;
let pictureFrame = 0;

function setup() {
	bg = loadImage('image/room.jpg');
	Sound.setVolume(0.1);
	Sound.play();
	Sound.loop();
	textFont(font);
	textSize(fontsize);
	textAlign(CENTER, CENTER);
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	createCanvas(windowWidth, windowHeight);
	startAtFood = millis();
	startAtSleep = millis();
	startAtBall = millis();
	foodX = foodOriginalX;
	foodY = foodOriginalY;
	foodW = food.width / 2;
	foodH = food.height / 2;
	ballX = ballOriginalX;
	ballY = ballOriginalY;
	ballW = ball.width / 2;
	ballH = ball.height / 2;
	sleepX = sleepOriginalX;
	sleepY = sleepOriginalY;
	sleepW = sleep.width / 2;
	sleepH = sleep.height / 2;
	lampOnX = 1400;
	lampOnY = 555;
	lampOnW = lampOn.width / 3.5;
	lampOnH = lampOn.height / 3.5;
	lampOffX = 1400;
	lampOffY = 555;
	lampOffW = lampOff.width / 3.5;
	lampOffH = lampOff.height / 3.5;
	paintingX = 1165;
	paintingY = 120;
	paintingW = 228;
	paintingH = 132;
	button = createImg('./image/camera.png');
	button.position(140, 100);
	button.size(100, 95);
	button.mousePressed(screenshot);
}
class ProgressBar {
	constructor(ms, y, maxWidth) {
		this.y = y;
		this.progress = 0;
		this.maxWidth = window.innerWidth - maxWidth;
		this.startTime = Date.now();
		this.maxTime = ms;
		this.endTime = this.startTime + ms;
	}
	isDone() {
		return Date.now() >= this.endTime;
	}
	draw() {
		if (Date.now() < this.endTime) {
			this.progress = map(Date.now(), this.startTime, this.endTime, window.innerWidth - 100, this.maxWidth);
		}
		line(this.progress, this.y, this.maxWidth, this.y);
	}
	reset() {
		this.startTime = Date.now();
		this.endTime = this.startTime + this.maxTime;
	}
}
class TimedState {
	constructor(ms, timedState, otherState) {
		this.startTime = 0;
		this.endTime = 0;
		this.ms = ms;
		this.timedState = timedState;
		this.otherState = otherState;
		this.started = false;
	}
	start() {
		if (this.started) return;
		this.started = true;
		this.startTime = Date.now();
		this.endTime = this.startTime + this.ms;
	}
	state() {
		// console.log(this.started, Date.now(), this.endTime);
		if (this.started && Date.now() < this.endTime) {
			return this.timedState;
		} else {
			this.started = false;
			return this.otherState;
		}
	}
}

function screenshot() {
	save('myCanvas.png');
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
let dogState = "regular"; // regular | wagging | sad | food | ball | sleeping
let progress1 = new ProgressBar(25000, 140, 250);
let progress2 = new ProgressBar(20000, 200, 250);
let progress3 = new ProgressBar(15000, 260, 250);
// time in ms, state  when timer is going, state w hen timer done or not started, duplicate this  for ball
let foodState = new TimedState(2500, "food", "regular");
let ballState = new TimedState(2500, "ball", "regular");
let sleepState = new TimedState(2500, "sleep", "regular");

function draw() {
	lastDogState = dogState;
	textStyle(BOLD);
	if (mouseIsPressed) {
		// only trigger the sound if the mouse
		// is pressed and the sound isn't
		// already playing
		if (bark.isPlaying() == false) {
			console.log("play!");
			bark.play();
		}
	}
	stroke('red');
	strokeWeight(10);
	background(bg);
	switch (dogState) {
		case "regular":
			image(happy, dogX, dogY, dogW, dogH); // Switch dog image  here after  timer.
			break;
		case "sad":
			image(sad, sadX, dogY, dogW, dogH); // Switch dog image  here after  timer.
			break;
		case "food":
			image(dogfood, dogX, dogY, dogW, dogH); // Switch dog image  here after  timer.
			break;
		case "ball":
			image(dogball, dogX, dogY, dogW, dogH); // Switch dog image  here after  timer.
			break;
		case "sleep":
			image(dogsleep, dogX, dogY, dogW, dogH); // Switch dog image  here after  timer.
	}
	if (mouseX > foodX && mouseX < foodX + foodW && mouseY > foodY && mouseY < foodY + foodH) {
		rolloverBone = true;
	} else {
		rolloverBone = false;
	}
	if (draggingBone) {
		foodX = mouseX + offsetX;
		foodY = mouseY + offsetY;
	}
	if (mouseX > ballX && mouseX < ballX + ballW && mouseY > ballY && mouseY < ballY + ballH) {
		rolloverBall = true;
	} else {
		rolloverBall = false;
	}
	if (draggingBall) {
		ballX = mouseX + offsetX;
		ballY = mouseY + offsetY;
	}
	if (mouseX > sleepX && mouseX < sleepX + sleepW && mouseY > sleepY && mouseY < sleepY + sleepH) {
		rolloveSleep = true;
	} else {
		rolloverSleep = false;
	}
	if (draggingSleep) {
		sleepX = mouseX + offsetX;
		sleepY = mouseY + offsetY;
	}
	if ((lastDogState === "regular" || lastDogState === "sad") && foodState.state() !== "regular") {
		dogState = foodState.state();
	}
	if ((lastDogState === "regular" || lastDogState === "sad") && ballState.state() !== "regular") {
		dogState = ballState.state();
	}
	if ((lastDogState === "regular" || lastDogState === "sad") && sleepState.state() !== "regular") {
		dogState = sleepState.state();
	}
	if (lastDogState !== "regular" && foodState.state() === "regular" && ballState.state() === "regular" && sleepState.state() === "regular") {
		dogState = "regular";
	}
	progress1.draw();
	progress2.draw();
	progress3.draw();
	if (progress1.isDone() || progress2.isDone() || progress3.isDone()) {
		dogState = "sad"
	}
	image(food, foodX, foodY, food.width / 2, food.height / 2);
	image(ball, ballX, ballY, ball.width / 2, ball.height / 2);
	image(sleep, sleepX, sleepY, sleep.width / 2, sleep.height / 2);
	if (isLightOn) {
		image(lampOn, lampOnX, lampOnY, lampOnW, lampOnW);
	} else {
		image(lampOff, lampOnX, lampOnY, lampOnW, lampOnW);
	}
	switch (pictureFrame) {
		// Use pictureX, pictureY, etc not lampOnX, lampOnY...
		case 0:
			image(painting1, paintingX, paintingY, paintingW, paintingH);
			break;
		case 1:
			image(painting2, paintingX, paintingY, paintingW, paintingH);
			break;
		case 2:
			image(painting3, paintingX, paintingY, paintingW, paintingH);
			break;
		case 3:
			image(painting4, paintingX, paintingY, paintingW, paintingH);
			break;
	}
	if (!(foodX > dogX + dogW || foodX + foodW < dogX || foodY > dogY + dogH || foodY + foodH < dogY)) {
		progress1.reset();
		foodX = foodOriginalX;
		foodY = foodOriginalY;
		foodState.start();
	}
	if (!(ballX > dogX + dogW || ballX + ballW < dogX || ballY > dogY + dogH || ballY + ballH < dogY)) {
		progress2.reset();
		ballX = ballOriginalX;
		ballY = ballOriginalY;
		ballState.start();
	}
	if (!(sleepX > dogX + dogW || sleepX + sleepW < dogX || sleepY > dogY + dogH || sleepY + sleepH < dogY)) {
		progress3.reset();
		sleepX = sleepOriginalX;
		sleepY = sleepOriginalY;
		sleepState.start();
	}
	textAlign(CENTER);
	drawFont(width * 0.5);
}

function drawFont(x) {
	fill(0);
	noStroke();
	textStyle(BOLD);
	text("FOOD", 1450, 115);
	text("PLAY", 1450, 175);
	text("SLEEP", 1450, 235);
}

function checkCollision() {
	return !(foodX > dogX + dogW || foodX + foodW < dogX || foodY > dogY + dogH || foodY + foodH < dogY);
	console.log('test');
}

function checkCollision() {
	return !(ballX > dogX + dogW || ballX + ballW < dogX || ballY > dogY + dogH || ballY + ballH < dogY);
	console.log('test');
}

function checkCollision() {
	return !(sleepX > dogX + dogW || sleepX + sleepW < dogX || sleepY > dogY + dogH || sleepY + sleepH < dogY);
	console.log('test');
}

function mousePressed() {
	if (mouseX > foodX && mouseX < foodX + foodW && mouseY > foodY && mouseY < foodY + foodH) {
		draggingBone = true;
		offsetX = foodX - mouseX;
		offsetY = foodY - mouseY;
	}
	if (mouseX > ballX && mouseX < ballX + ballW && mouseY > ballY && mouseY < ballY + ballH) {
		draggingBall = true;
		offsetX = ballX - mouseX;
		offsetY = ballY - mouseY;
	}
	if (mouseX > sleepX && mouseX < sleepX + sleepW && mouseY > sleepY && mouseY < sleepY + sleepH) {
		draggingSleep = true;
		offsetX = sleepX - mouseX;
		offsetY = sleepY - mouseY;
	}
	if (mouseX > lampOnX && mouseX < lampOnX + lampOnW && mouseY > lampOnY && mouseY < lampOnY + lampOnH) {
		isLightOn = !isLightOn;
	}
	if (mouseX > paintingX && mouseX < paintingX + paintingW && mouseY > paintingY && mouseY < paintingY + paintingH) {
		if (pictureFrame === 4) {
			pictureFrame = 0;
		} else {
			pictureFrame++;
		}
	}
}

function mouseReleased() {
	draggingBone = false;
	draggingBall = false;
	draggingSleep = false;
}