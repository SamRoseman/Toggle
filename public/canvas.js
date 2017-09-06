//VARIABLES ====================================
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 852;
document.body.appendChild(canvas);
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
"T", "U", "V", "W", "X", "Y", "Z"];
var letters = [];
var word = [];
var i = 0;
var randyCounter = 4;
var bgReady = false;
var letterReady = false;
var bgImage = new Image();
var xCor = [10, 130, 250, 370];
var randy = 2;
var mouseDown = false;
    console.log(mouseDown);
var mousePosX;
var mousePosY;
var Letter = function()
{
    this.random = Math.floor(Math.random()* 26);
    this.value = alphabet[this.random];
    this.x = xCor[randy];
    this.y = -100;
    this.image = new Image();
    this.isStopped = false;

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
    for (var i = 0; i < letters.length; i++)
    {
      if(letters[i].x === col && letters[i].isStopped === true)
      {
        counter++;
      }
    }
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
        return 300;
        break;
    }
}

//returns true if there is a letter that should block current letter.
function collisionRight()
{
  if(colFilled(letter.x+120)+5 < letter.y)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function collisionLeft()
{
  if(colFilled(letter.x-120)+5 < letter.y)
  {
    return true;
  }
  else
  {
    return false;
  }
}

//elimanates full column from possible spawn point
function randyFunk()
{
  if(randyCounter < 0)
  {
    return;
  }

  for (var i = 0; i < xCor.length; i++)
  {
    if(colFilled(xCor[i]) === 300)
    {
      xCor.splice(i,1);
      randyCounter--;
    }
  }
  randy = Math.floor(Math.random()*randyCounter);
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
    if (letter.y < colFilled(letter.x) && !letter.isStopped)
    {
        letter.y += 20;

        if (keysDownCurrent[37] && !keysDownPrevious[37] && letter.x > 10 && !collisionLeft()) {
            letter.x -= 120;
        }
        if (keysDownCurrent[39] && !keysDownPrevious[39] && letter.x < 370 && !collisionRight()) {
            letter.x += 120;
        }
        if(letter.y >= colFilled(letter.x))
        {
          if(letters.length < 15)
          {
            letterReady = false;
          }
            letter.isStopped = true;
            randyFunk();
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
    if(letterReady) {
      ctx.drawImage(letters[i].image, letters[i].x , letters[i].y);
    }
  }
}

function loop()
{
    if(i === 16) {
        console.log(letters);
        return;
    }
    letter = new Letter();
    letters.push(letter);

    letter.image.onload = function() {
        letterReady = true;
    };
    letter.image.src = "assets/images/" + alphabet[letter.random] + ".png";
    i++;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getLetter() {
    for (var i = 0; i < letters.length; i++) {
        if (mousePosX >= letters[i].x + 5 && mousePosX <= letters[i].x + 95 && mousePosY >= letters[i].y + 5 && mousePosY <= letters[i].y + 95) {
            if (word[word.length -1] !== letters[i].value){
                word.push(letters[i].value);
            }
        }
    }
}

function getWord() {
    console.log(word);
    var wordString = word.toString().replace(/,/g, "").toLowerCase();
    console.log(wordString);
    word = [];
}

//MAIN PROCESS =================================
// var then = Date.now();
loop();
main();



canvas.addEventListener('mousemove', function(evt) {
    if (mouseDown) {
        var mousePos = getMousePos(canvas, evt);
        mousePosX = mousePos.x;
        mousePosY = mousePos.y;
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        getLetter();
    }
}, false);


canvas.addEventListener("mousedown", function() {
    mouseDown = true;
    console.log(mouseDown);
});

canvas.addEventListener("mouseup", function() {
    mouseDown = false;
    getWord();
    console.log(mouseDown);



// dictionary api code.... Use when you need it.
var Dictionary = require("oxford-dictionary-api");
var app_id = "106d1fc7";
var app_key = "703b3bcb4b34e247d483d8df00a4c064";
var dict = new Dictionary(app_id,app_key);
//this will log the part of speech the word is.
//if just a letter it is called "Residual"
//if it does not exist "No such entry found"
dict.find("ajaksdfhlkahsdfl",function(error,data)
{
  if(error) return console.log(error);
  console.log(data.results[0].lexicalEntries[0].lexicalCategory);

});
