//VARIABLES
var colorPallet = ["red", "green", "blue", "yellow"];
var started = false;
var saveColorRandom = [];
var saveColorChosen = [];
var level = 0;


//MAIN
//starting the game;
$(document).keypress(function(){
    if (!started){
        nextSequence();
        started = true;
    }
});

//user will choose a colored button and that function will save it.
$(".btn").on("click", function(){
    var buttonClickedColored = $(this).attr("id");
    saveColorChosen.push(buttonClickedColored);
    console.log(saveColorChosen);

    //After choosing a color, some kind of sound will play according a color;
    soundRandom(buttonClickedColored);

    //After choosing a color, some effect will appear after clicking;
    pressedBtn(buttonClickedColored);

    //It'll get the 0 element through length;
    compareSequence(saveColorChosen.length-1);
});


//LOGICAL FUNCTIONS
//color chooser
function nextSequence(){
    
    //we need to get a empty array because it need to be filled after the first call;
    saveColorChosen = [];

    //checking level;
    if (level === 0){
        $("h1").text("Level 0");
        level ++;
    }
    else{
        $("h1").text("Level " + level ++);
    }

    //number generator;
    var numReferColor = Math.floor(Math.random()*4);
    var genericParameterToFunctions = colorPallet[numReferColor];

    //number saver;
    saveColorRandom.push(genericParameterToFunctions);
    
    //After choosing a color, some effect will appear;
    animationGeneratorRandom(genericParameterToFunctions);

    //After choosing a color, some kind of sound will play according a color;
    soundRandom(genericParameterToFunctions);

}

//this function will compare arrays through the logical applyed;
function compareSequence(index){
    if (saveColorChosen[index] === saveColorRandom[index]){
        if (saveColorRandom.length === saveColorChosen.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        $("h1").text("Game Over! Please, press a key to restart.");
        errorGot("wrong");
        restart();

    }
}

//this function is actived if we got an user mistake;
function errorGot(word){
    error = $("body");
    error.addClass("game-over");
    setTimeout(function () {
        error.removeClass("game-over");
    }, 200);
    errorSound = new Audio("./sounds/" + word + ".mp3");
    errorSound.play();
}

//this function will restart the game if we have a mistake or clicks not requested
function restart (){
    level = 0;
    saveColorRandom = [];
    started = false;
}



//EFFECTS!!!
//this function will apply some effect to a random color chosen;
function animationGeneratorRandom(buttonColorAnimation){
    $("#" + buttonColorAnimation).fadeOut(200).fadeIn(200);
}

//this function will apply some sound according to color passed;
function soundRandom(colorToSound){
    playSound = new Audio("./sounds/"+colorToSound + ".mp3");
    playSound.play();
}

//this function will apply some effect after clicking on a button;
function pressedBtn(buttonHasPressed){
    bp = $("#" + buttonHasPressed);
    bp.addClass("pressed");
    setTimeout(function(){
        bp.removeClass("pressed");
    }, 100);
}







