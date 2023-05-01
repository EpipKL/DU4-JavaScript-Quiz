const startGameScreen = document.getElementById('start-game');

const countdown = document.getElementById('countdown');

const questionContainer = document.querySelector('#question');
const choicesContainer = document.querySelector('#choices');
const startButton = document.querySelector('#start-btn');

const scoreBoard = document.getElementById('score-container');
let score = 0;
let time = 59;
const finalScore = document.getElementById('final-score');

// quiz questions and answers
const questions = [
  {
    question: 'What is the result of 1 + 1?',
    choices: ['2', '3', '4', '1'],
    correctAnswer: '2'
  },
  {
    question: 'What is the correct way to declare a variable in JavaScript?',
    choices: ['variable x;', 'x = 5;', 'var x;', 'let x;'],
    correctAnswer: 'var x;'
  },
  {
    question: 'What does "typeof" operator do?',
    choices: ['Returns the type of a variable', 'Checks if a variable is defined', 'Converts a value to a boolean', 'Creates a new variable'],
    correctAnswer: 'Returns the type of a variable'
  },
  {
    question: 'What is an array in JavaScript?',
    choices: ['A collection of objects', 'A collection of strings', 'A collection of numbers', 'A collection of any type of data'],
    correctAnswer: 'A collection of any type of data'
  },
  {
    question: 'What does the "===" operator do?',
    choices: ['Checks for equality without type coercion', 'Assigns a value to a variable', 'Checks for equality with type coercion', 'Checks if a variable is defined'],
    correctAnswer: 'Checks for equality without type coercion'
  },
  {
    question: 'What is a function in JavaScript?',
    choices: ['A type of loop', 'A type of variable', 'A block of code that can be called', 'A way to define an object'],
    correctAnswer: 'A block of code that can be called'
  },
  {
    question: 'What is the "this" keyword in JavaScript?',
    choices: ['A reserved keyword that represents the global object', 'A way to refer to the current function', 'A way to refer to the current object', 'A way to refer to the previous object'],
    correctAnswer: 'A way to refer to the current object'
  },
  {
    question: 'What is an object in JavaScript?',
    choices: ['A function that returns a value', 'A collection of properties and methods', 'A type of loop', 'A way to define a variable'],
    correctAnswer: 'A collection of properties and methods'
  },
  {
    question: 'What is the purpose of the "return" keyword in a function?',
    choices: ['To stop the execution of the function', 'To return a value from the function', 'To define a new variable', 'To check if a variable is defined'],
    correctAnswer: 'To return a value from the function'
  },
  {
    question: 'What does the "new" keyword do in JavaScript?',
    choices: ['Creates a new variable', 'Creates a new object', 'Assigns a value to a variable', 'Checks for equality with type coercion'],
    correctAnswer: 'Creates a new object'
  }
];


// Starting the game

startButton.addEventListener('click', startQuiz);

// Logic for the timer

let isTimerRunning = false;

function timer() {
  if (isTimerRunning) {
    return;
  }
  
  isTimerRunning = true;
  let countdown = setInterval(() => {
    let countdownEl = document.getElementById('countdown');
    countdownEl.innerText = time;
    
    time--;
    
    if (time < 0) {
      clearInterval(countdown);
      countdownEl.innerText = '0';
      endQuiz();
    }
  }, 1000);
}



// Function to begin the quiz
function startQuiz() {
    startGameScreen.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    timer();

    // Display the first question
    displayQuestion(0);
  }

  // Function to display a quiz question and its choices
  function displayQuestion(index) {
    // Get the current question object
    const question = questions[index];

  // Create an h1 element for the question text
  const questionText = document.createElement('h1');
  questionText.textContent = question.question;

  // Set the question container's contents to the question text
  questionContainer.innerHTML = '';
  questionContainer.appendChild(questionText);

    // Clear any existing choice buttons from the choices container
    choicesContainer.innerHTML = '';

    // Loop over the choices for the current question and create a button element for each choice
    question.choices.forEach((choice) => {
      const button = document.createElement('button');
      button.classList.add('button')
      button.textContent = choice;
      button.addEventListener('click', () => {
        // Check if the user's answer is correct
        if (choice === question.correctAnswer) {
          // Display the next question if the user's answer is correct
          score += 10;
          if (index < questions.length - 1) {
            displayQuestion(index + 1);
          } else {
            // End the quiz if there are no more questions
            endQuiz();
          }
        } else {
          // Subtract time from the clock if the user's answer is incorrect
          time -= 10;
        }
      });
      choicesContainer.appendChild(button);
    });
  }




function endQuiz() {
  // Hide the question container and show the score container
  questionContainer.classList.add('hidden');
  choicesContainer.classList.add('hidden');
  scoreBoard.classList.remove('hidden');

  time = 0;

  // Display the user's final score
  finalScore.innerText = score;
}

let leaderboard = document.getElementById('leaderboard');

function viewLeaderboard() {
  // Get the <ol> element for the leaderboard
  const leaderboardOl = document.querySelector('.score-list');

  // Remove any existing scores from the leaderboard
  while (leaderboardOl.firstChild) {
    leaderboardOl.removeChild(leaderboardOl.firstChild);
  }

  // Retrieve scores from local storage
  const scores = JSON.parse(localStorage.getItem('scores'));

  // Loop through the scores and create an <li> element for each score
  scores.forEach(score => {
    const li = document.createElement('li');
    li.textContent = score.name + ': ' + score.score + '%';
    leaderboardOl.appendChild(li);
  });

  // Show the leaderboard
  leaderboard.classList.remove('hidden');
}

function saveScore() {
  // Get the user's name and score
  const name = document.getElementById('name-input').value;
  const score = finalScore.innerText;

  // Check if there are any existing scores in local storage
  let scores = JSON.parse(localStorage.getItem('scores')) || [];

  // Add the new score to the array
  scores.push({ name, score });

  // Sort the array in descending order based on score
  scores.sort((a, b) => b.score - a.score);

  // Save the scores back to local storage
  localStorage.setItem('scores', JSON.stringify(scores));

  // Display the leaderboard with the updated scores
  viewLeaderboard();
}

// Retrieve scores from local storage
const scores = JSON.parse(localStorage.getItem('scores')) || [];

// Get the <ol> element for the leaderboard
const leaderboardOl = document.querySelector('.score-list');

// Loop through the scores and create an <li> element for each score
scores.forEach(score => {
  const li = document.createElement('li');
  li.textContent = score.name + ': ' + score.score + '%';
  leaderboardOl.appendChild(li);
});

const submitScoreBtn = document.getElementById("submit-score");
submitScoreBtn.addEventListener("click", function() {
  saveScore();
});

const tryAgainButton = document.querySelector('#try-again');

tryAgainButton.addEventListener('click', function() {
  location.reload();
});