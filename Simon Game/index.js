// $("h1").hide();
buttonColours=["red", "blue", "green", "yellow"];
gamePattern=[];
var userClickedPattern=[];
var level=0;
var bol=false;

var randomChosenColour;
function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  level=level+1;
  $("#level-title").text("Level " + level);
  userClickedPattern=[];

}
function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
    $("#"+name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+name).addClass("pressed");
    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#"+name).removeClass("pressed");
    }, 200);
}
$(document).keypress(function(){
  if(!bol){
    $("#level-title").text("Level " + level);
      bol=true;
      nextSequence();
  }
});
$(".btn").click(function(){
  var userChosenColor=this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  check(userClickedPattern.length-1);
});
function check(len){
  if(gamePattern[len]===userClickedPattern[len]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  gamePattern=[];
  level=0;
  bol=false;
  userClickedPattern=[];
}
