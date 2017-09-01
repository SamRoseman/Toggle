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
var randyCounter = 4;
var bgReady = false;
var letterReady = false;
var bgImage = new Image();
var xCor = [10, 130, 250, 370];
var randy = 2;
var Letter = function()
{
    this.random = Math.floor(Math.random()* 26);
    this.value = alphabet[this.random];
    this.x = xCor[randy];
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

//looks for stacking
function colFilled(col)
{
    var counter = 0;
    for (var i = 0; i < letters.length-1; i++)
    {
      if(letters[i].x === col)
      {
        counter++;
      }
    }
    //console.log(counter);
    switch (counter)
    {
      case 0:
        return 742;
        break;
      case 1:
        return 632;
        break;
      case 2:
        return 522;
        break;
      case 3:
        return 412;
        break;
      case 4:
        return 800;
        break;
    }
}

function randyFunk()
{
  randy = Math.floor(Math.random()*randyCounter);
  if(randyCounter === 0)
  {
    return;
  }

  for (var i = 0; i < xCor.length; i++)
  {
    if(colFilled(xCor[i]) === 800)
    {
      xCor.splice(i,1);
      console.log(i, xCor);
      randyCounter--;
    }
  }
}

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

var update = function()
{
    if (letter.y < colFilled(letter.x)) {
        letter.y += 5;
        if (keysDownCurrent[37] && !keysDownPrevious[37] && letter.x > 10) {
            letter.x -= 120;
        }
        if (keysDownCurrent[39] && !keysDownPrevious[39] && letter.x < 370) {
            letter.x += 120;
        }
        if(letter.y >= colFilled(letter.x))
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
      ctx.drawImage(letters[i].image, letters[i].x , letters[i].y);
  }
}

function loop() {
  randyFunk();
  //need to figure out randyFunk...
    if(i === 16) {
        return;
    }

    letter = new Letter();
    letters.push(letter);

    letter.image.onload = function() {
        letterReady = true;
    };
    letter.image.src = "assets/images/" + alphabet[letter.random] + ".png";
    console.log(letter);
}
//MAIN PROCESS =================================
// var then = Date.now();
loop();
main();
