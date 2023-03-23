var startGameScreen = document.getElementById('start-game');
var startBtn = document.getElementById('start-btn');
var countdown = document.getElementById('countdown');
var questionOne = document.getElementById('question-one');
var questionTwo = document.getElementById('question-two');
var questionThree = document.getElementById('question-three');
var questionFour = document.getElementById('question-four');
var correctText = document.getElementById('correct');
var wrongText = document.getElementById('wrong');
var nextBtn = document.getElementById('next-button');
var questionOneBtns = document.getElementById('button-container-one');
var scoreBoard = document.getElementById('score-container');
var score = 0;
var time = 59;
var finalScore = document.getElementById('final-score');

questions = [
    {value: 'Q1', div: questionOne},
    {value: 'Q2', div: questionTwo},
    {value: 'Q3', div: questionThree},
    {value: 'Q4', div: questionFour},
];

// Starting the game

startBtn.addEventListener('click', startGame);

// Logic for the timer

function timer() {
    var countdown = setInterval(() => {
        var countdownEl = document.getElementById('countdown');
        countdownEl.innerText = time;
        
        time--;
        
        if (time === 0) {
            clearInterval(countdown);
            countdownEl.innerText = '0';
            endGame();
        }
    }, 1000);
}


function startGame() {
    startGameScreen.classList.add('hidden');
    questionOne.classList.remove('hidden');
    timer();
}

// Disable buttons on click

questionOneBtns.addEventListener('click', (event) => {
    
    if (event.target.tagName === 'BUTTON') {
        var buttons = questionOneBtns.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            
            // This disables the button
            // buttons[i].disabled = true;
            
            buttons[i].classList.add('hidden');
        }
    }
});

// Functions for getting a question correct or wrong

function correct() {
    correctText.classList.remove('hidden');
    score = score + 10;
}

function wrong() {
    wrongText.classList.remove('hidden');
    time -= 10;
}

let currentIndex = 0;
function nextQuestion() {
  let currentItem = questions[currentIndex];
  currentItem.div.classList.add('hidden');
  currentIndex++; // Move to the next index
  if (currentIndex < questions.length) {
    // If there are more items in the array
    let nextItem = questions[currentIndex];
    nextItem.div.classList.remove('hidden');
  }
}


function setNextQuestion() {
}

function endGame() {
    let finalQuestion = questions[currentIndex];
    finalQuestion.div.classList.add('hidden');
    scoreBoard.classList.remove('hidden');
    finalScore.innerText = score;
    
}

let leaderboard = document.getElementById('leaderboard');

function viewLeaderboard() {
    if (leaderboard.classList.contains('hidden')) {
        leaderboard.classList.remove('hidden');
    } else {
        leaderboard.classList.add('hidden')
    }
}