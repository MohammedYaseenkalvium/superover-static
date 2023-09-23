//strike button
var strikeButton = document.querySelector("#strike");
//reset button
var resetButton = document.querySelector("#reset");

//scoretags
var team1score_tag = document.querySelector("#score-team1");
var team2score_tag = document.querySelector("#score-team2");

//wickets
var wicketTeam1_tag = document.querySelector("#wicket-team1");
var wicketTeam2_tag = document.querySelector("#wicket-team2");

//audio variables
var strikeAudio = new Audio("http://bit.ly/so-ball-hit");
var gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

//variable for helping calculating
var team1Score = 0
var team2Score = 0
var team1Wickets = 0
var team2Wickets = 0
var team1BallsFaced = 0
var team2BallsFaced = 0
var turn = 1

var possibleOutcomes = [0, 1, 2, 3, 4, 5, 6, "W"];

strikeButton.addEventListener("click", strikeButtonClicked);

function strikeButtonClicked() {
    strikeAudio.pause();//pause the audio
    strikeAudio.currentTime = 0;//inorder to start the audio from beggining

    strikeAudio.play();

    //choosing random value
    var randomness = Math.random();

    //random1 will generate values from 0 to less than the length 
    //of array-possibleOutcomes here 0 to 7
    var random1 = randomness * possibleOutcomes.length;

    var randomIndex = Math.floor(random1);

    var randomValue = possibleOutcomes[randomIndex];

    //PAK BATTING
    if (turn == 2) {
        team2BallsFaced++;
        var ball = document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`)
        ball.innerHTML = randomValue;

        if (randomValue == "W") {
            team2Wickets++;
        } else {
            team2Score += randomValue;
        }
        if (team2Score > team1Score || team2Wickets == 2 || team2BallsFaced == 6) {
            turn = 3;
            setTimeout(() => {
                gameOver();
            }, 500);
        }
    }
    //  INDIA BATTING
    if (turn == 1) {
        team1BallsFaced++;
        var ball = document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`);
        console.log(ball)
        ball.innerHTML = randomValue;

        //if random element is wicket then increase wicket count by 1 or just add that random value
        //to total score of team-1 
        if (randomValue == "W") {
            team1Wickets++;
        } else {
            //team1Score = team1Score + randomValue
            team1Score += randomValue;
        }
        if (team1BallsFaced == 6 || team1Wickets == 2) {
            turn = 2;
        }
    }
    updateScore()

}
function updateScore() {
    team1score_tag.innerHTML = team1Score;
    wicketTeam1_tag.innerHTML = team1Wickets;
    team2score_tag.innerHTML = team2Score;
    wicketTeam2_tag.innerHTML = team2Wickets;
}
function gameOver() {
    
    if (team1Score > team2Score) {
        alert("INDIA WINS!!!")
    } else if (team2Score > team1Score) {
        alert("PAKISTAN WINS!!")
    } else {
        alert("IT'S A TIE!!")
    }
    gameOverAudio.play();
    document.querySelectorAll(".ball").forEach(e => {
        if (e.innerHTML == "") {
            e.innerHTML = "X"
            e.style.backgroundColor = "red"
            e.style.textcolor = "white"
        }
    })
}

resetButton.addEventListener("click", resetFunction)
function resetFunction() {
    window.location.reload()
}






