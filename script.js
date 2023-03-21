var startGameScreen = document.getElementById('start-game');
var startBtn = document.getElementById('start-btn');
var countdown = document.getElementById('countdown');
var questionOne = document.getElementById('question-one');
var nextBtn = document.getElementById('next-button');
var correctText = document.getElementById('correct');
var wrongText = document.getElementById('wrong');
var quizBtn = document.getElementsByClassName('quiz-button');
var score = 0;

var nextBtns; 

startBtn.addEventListener('click', startGame);

function timer() {
    console.log('Timer Started')
}

function startGame() {
    startGameScreen.classList.add('hidden');
    questionOne.classList.remove('hidden');
    timer();
}

function correct() {
    correctText.classList.remove('hidden');
}

function wrong() {
    wrongText.classList.remove('hidden');
}

nextBtn.addEventListener('click', setNextQuestion)


function setNextQuestion() {

}
