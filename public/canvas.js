//VARIABLES ====================================
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 852;
document.body.appendChild(canvas);
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
"T", "U", "V", "W", "X", "Y", "Z"];
var letters = [];
var i = 0;
var bgReady = false;
var letterReady = false;
var bgImage = new Image();
var xCor = [10, 130, 250, 370];
var Letter = function(){
    this.randy = Math.floor(Math.random()* 4);
    this.random = Math.floor(Math.random()* 26);
    this.value = alphabet[this.random];
    this.x = xCor[this.randy];
    this.y = -100;
    this.image = new Image();
}
var letter;

var keysDownCurrent = {

};

var keysDownPrevious = {

};

addEventListener("keydown", function (e) {
	keysDownCurrent[e.keyCode] = true;
});

addEventListener("keyup", function(e) {
    keysDownCurrent[e.keyCode] = false;
});
//FUNCTIONS ====================================
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "assets/images/bg.jpg";



// The main game loop
var main = function () {
// var now = Date.now();
// var delta = now - then;
	render();
// update(delta / 1000);
    update();
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

var update = function() {
    if (letter.y < 742) {
        letter.y += 1;
        if (keysDownCurrent[37] && !keysDownPrevious[37] && letter.x > 10) {
            letter.x -= 120;
        }

        if (keysDownCurrent[39] && !keysDownPrevious[39] && letter.x < 370) {
            letter.x += 120;
        }
        if(letter.y >= 742)
        {
            letterReady = false;
            i++;
            loop();
        }
    }
    keysDownPrevious = Object.assign({}, keysDownCurrent);
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
for (var i = 0; i < letters.length; i++)
{
  if (letterReady)
  {
      ctx.drawImage(letters[i].image, letters[i].x , letters[i].y);
  }
}

};

function loop() {
    if(i === 16) {
        return;
    }

    letter = new Letter();
    letters.push(letter);

    letter.image.onload = function() {
        letterReady = true;
    };
    letter.image.src = "assets/images/" + alphabet[letter.random] + ".jpg";
    console.log(letter);
}
//MAIN PROCESS =================================
// var then = Date.now();
loop();
main();
