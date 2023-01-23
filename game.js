buttonColours = ["red","green","blue","yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;


$(".btn").click(function (){
     
     var userChosenColor = $(this).attr("id");
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length - 1);
})
$(document).keypress(function () {
     if (!started) {
          $("h1").text("Level "+level);
          nextSequence();
          started = true;
     }
     
     
    
});
function nextSequence() {
     level++;
     $("h1").text("Level "+level);
     var randomNumber = Math.floor(Math.random()*4);
     var randomChosenColor= buttonColours[randomNumber];
     gamePattern.push(randomChosenColor);
     $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColor);
     userClickedPattern = [];
}
function playSound(name) {
     var audio = new Audio("sounds/"+name+".mp3");
            audio.play();
}
function animatePress(currentColor) {
     $("#"+currentColor).addClass("pressed")
     setTimeout(function () {
          $("#"+currentColor).removeClass("pressed");
          }, 100);
}
function checkAnswer(currentLevel) {
     if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
          if (userClickedPattern.length === gamePattern.length) {
               setTimeout(function () {
                    nextSequence() 
               }, 1000)   
          } 
           
     } else {
          playSound("wrong");
          $("body").addClass("game-over")
          setTimeout(function () {
               $("body").removeClass("game-over");
               }, 200);
          $("h1").text("Game Over, Press any key to restart");
          startOver();
     }  
     
}
function startOver() {
     level = 0;
     started = false;
     gamePattern = [];
}


 




            