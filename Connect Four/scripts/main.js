
var tileWidth = 50;
var tileHeight = 50;
var tilePad = 130;
var playerTurn = 1;
var TURN = 0;
var boardWidth = (((tileWidth*7) + tilePad).toString()) + "px";
var gameWon = 0;
var boardHeight = (((tileHeight*6) + tilePad).toString()) + "px";
document.getElementById("board").style.width = boardWidth;
document.getElementById("board").style.height =  boardHeight;

var gameboard = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

function Vector(string){
  this.x = string.slice(0,1);
  this.y = string.slice(2,3);
}

function placed(gameboard, x, y){
  if (gameboard[x][y] == 0){
    return true;
  }
  else{
    return false; 
  }
}

function placeAble(gameboard, x, y){
  if (placed(gameboard, x, y)){
    if (x == 0){
      return true;
    }
    else if (((gameboard[x-1][y]) == 1) || (gameboard[x-1][y]) == 10){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false; 
  }
}

function playerOneWins(){
  //Do something;
  console.log("player one wins");
  gameWon = 1;
  updateText(TURN, gameWon);
  reSet();
}

function playerTwoWins(){
  //Do Something;
  console.log("player two wins")
}

function playerOneWinCond(gameboard, x, y){

  if (x >= 3){
    var downWin = gameboard[x][y] + gameboard[x-1][y] + gameboard[x-2][y] + gameboard[x-3][y];
    if (downWin == 4 || downWin == 40) {
      playerOneWins();
    }
  }

  if (y >= 3){
    var leftWin = gameboard[x][y] + gameboard[x][y-1] + gameboard[x][y-2] + gameboard[x][y-3];
    if (leftWin == 4 || leftWin == 40){
      playerOneWins();
    }
  }

  if (y <= 3){
    var rightWin = gameboard[x][y] + gameboard[x][y+1] + gameboard[x][y+2] + gameboard[x][y+3];
    if (rightWin == 4 || rightWin == 40){
      playerOneWins();
    }
  }

  if ((y <= 3) && (x <= 2)){
    var rightUpWin = gameboard[x][y] + (gameboard[x+1][y+1]) + (gameboard[x+2][y+2]) + (gameboard[x+3][y+3]);
    if (rightUpWin == 4 || rightUpWin == 40){
      playerOneWins();
    }
  }
  if (y >= 3 && x >= 3){
    var rightDownWin = gameboard[x][y] + gameboard[x-1][y-1] + gameboard[x-2][y-2] + gameboard[x-3][y-3];
    if (rightDownWin == 4 || rightDownWin == 40){
      playerOneWins();
    }
  }
  if (y >= 3 && x <= 2){
    var leftUpWin = gameboard[x][y] + gameboard[x+1][y-1] + gameboard[x+2][y-2] + gameboard[x+3][y-3];
    if (leftUpWin == 4 || leftUpWin == 40){
      playerOneWins();
    }
  }
  if (y <= 3 && x >= 3){
    var lefttDownWin = gameboard[x][y] + gameboard[x-1][y+1] + gameboard[x-2][y+2] + gameboard[x-3][y+3];
    if (rightDownWin == 4 || rightDownWin == 40){
      playerOneWins();
    }
  }
}

function updateText(turn, gameWon){
  if (gameWon == 1)
  {
    document.getElementById("h2").innerHTML = "technically you just lost to yourself..."
  }
  else {
    var funnyStuff = ["I didn't program an AI though...", "So I guess you're just playing against yourself?...", "it looks kinda pretty though brenda...", "I just like the colors...","oh, nice move there...","I was going to display useful things here but I gave up...", "this is so dumb...","what am I doing with my life...?","this took me way too long to make...","the code is a mess...", "I need a job...", "pray for me...", "I wish I was an otter...",];
    document.getElementById("h2").innerHTML = funnyStuff[turn];
    TURN++;
    console.log(turn);
  }
}

function init(){
  var tile = document.getElementsByClassName("tile");
  for ( i = 0; i < tile.length; i++)
  {
    tile[i].onclick = function() {
      if (playerTurn == 1) {
        var x = parseInt((this.id).slice(0,1));
        var y = parseInt((this.id).slice(2,3));
        if ((placeAble(gameboard, x, y))){
          this.style.backgroundColor = "#DD9787";
          console.log(x,y);
          gameboard[x][y] = 1
          playerOneWinCond(gameboard, x, y);
          playerTurn = 2;
          console.log(gameboard);
          updateText(TURN, gameWon);
        }
      }
      else {
        var x = parseInt((this.id).slice(0,1));
        var y = parseInt((this.id).slice(2,3));
        if (placeAble(gameboard, x, y)){
          this.style.backgroundColor = "#BBC8CA";
          console.log(x,y);
          gameboard[x][y] = 10
          playerOneWinCond(gameboard, x, y);
          playerTurn = 1;
          console.log(gameboard, gameWon);
          updateText(TURN);

        }
      }
    }
  }
}

function reSet(){
  var tile = document.getElementsByClassName("tile");
  for ( i = 0; i < tile.length; i++)
  {
    tile[i].onclick = function() {
      this.onclick = undefined;
    }
    console.log("reseting")
  } 
}

init();







