
var userClickedPattern = [];

var buttoncolors = ["red","blue","green","yellow"];
var gamePattern = [];
var i=0;
var level=0;

$(document).keydown(function(){
  if (i===0)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    i++;
  }
});

$(".start").click(function(){
  $(".start").addClass("pressed");
  setTimeout(function(){
    $(".start").removeClass("pressed")
  },150);

  if (i===0)
  {
    playSound("start");

    setTimeout(function(){
      $("#level-title").text("Level "+level);
      nextSequence()
    },1200);
    i++;
  }
});

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttoncolors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(".btn").click(function()
{
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  var n= userClickedPattern.length;
  checkAnswer((n-1));
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed")
  },150);
}

function checkAnswer(currentLevel)
{

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
      console.log("True");
      if(userClickedPattern.length===gamePattern.length)
      {

      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }
    else
    {
      var wrong=new Audio("sounds/wrong.mp3");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over")
      },200);
      console.log("False");
      startOver();
    }
  }

function startOver()
{
  level=0;
  gamePattern=[];
  i=0;
}
