//VARIABLES ====================================
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 852;
document.body.appendChild(canvas);

var bgReady = false;
var letterAReady = false;
var bgImage = new Image();
var randy = Math.floor(Math.random()* 4);
var xCor = [10, 130, 250, 370];
var letterA = {
    x: xCor[randy],
    y: -100,
    image: new Image()
};
var keysDown = {
    37: 0,
    39: 0
};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode]++;
});

addEventListener("keyup", function(e) {
    keysDown[e.keyCode] = 0;
});
//FUNCTIONS ====================================
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "assets/images/bg.jpg";

letterA.image.onload = function() {
    letterAReady = true;
};
letterA.image.src = "assets/images/A.jpg";

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
	render();
    update(delta / 1000);
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

var update = function () {
    if (letterA.y < 742) {
        letterA.y += 1;
        if (37 in keysDown && letterA.x > 10) {
            letterA.x -= 1;
        }

        if (39 in keysDown && letterA.x < 370) {
            letterA.x += 1;
        }
    }
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

    if (letterAReady) {
        ctx.drawImage(letterA.image, letterA.x , letterA.y);
    }
};
//MAIN PROCESS =================================
var then = Date.now();

main();
