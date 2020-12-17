// Declaring a variable for the start quiz button,
// variable that contains the div for the questions that are being generated,

var stratQuizBtn = document.querySelector(".start-quiz");
var questionsContainer = document.querySelector(".question-container");
var correctOrWrongPopUp = document.querySelector(
    ".correct-wrong-popup-container"
);
// Variable that contains the wrong or correct word that will show up under the question
var correctOrWrongWord = document.querySelector(".correct-wrong-word");

// variable that contains an empty div with an emtpy form tag, which is being 
var submitFormContainer = document.querySelector(".submit-form-container");
var submitForm = submitFormContainer.children[0];

// Declaring the variables to set up the timer and the score couter.
var timer = document.querySelector(".timer");
var secondsLeftSpan = document.querySelector('.seconds-left');
var questionCounter = 0;
var scoreCounter = 0;
var seconds = 70;
var interval;

// Highscore array
var highScores = JSON.parse(localStorage.getItem("highscores")) || [];

// Declaring the highscore btn.
var highscoreBtn = document.querySelector(".highscores");

highscoreBtn.addEventListener("click", showHighScore)


// Declaring an object array that contains the questions and the answers
var questionsAndAnswers = [
    {
        question: "Commonly used data types DO NOT include ____",
        correctAnswer: "alerts",
        allAnswers: ["strings", "boolean", "numbers", "alerts"],
    },
    {
        question: "the condition in an if / else statement is enclosed within____.",
        correctAnswer: "parentheses",
        allAnswers: ["curly brackets", "square brackets", "quotes", "parentheses"],
    },
    {
        question: "Arrays in javascript can be used to store___.",
        correctAnswer: "all of the above",
        allAnswers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above",
        ],
    },
    {
        question:
            "Strings values must be enclosed within____when being assigned to variables.",
        correctAnswer: "quotes",
        allAnswers: ["curly brackets", "commas", "quotes", "parentheses"],
    },

    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        correctAnswer: "console.log",
        allAnswers: ["console.log", "javascript", "terminal / bash", "for loops"],
    },
];

// The timer for the quiz.

function startTimer() {
    interval = setInterval(function () {
        seconds--;
        secondsLeftSpan.textContent = seconds;
        scoreCounter = seconds;
        if (seconds === 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

// Event listener for the start quiz button.
stratQuizBtn.addEventListener("click", showQuestions);

// Using event delegation to listen to the answers container.
questionsContainer.children[0].children[1].addEventListener("click", checkAnswer);

// 


// This function will display all of answers/
function showQuestions() {
    startTimer();

    // Checking if reached to the last question in the question array object to stop the quiz.
    if (questionCounter == questionsAndAnswers.length) {
        showSubmitScoreForm;
        questionCounter = 0;
    }

    // Each time the button is clicked, the question container is displayed with the question and the multiple choise answers
    // The container clears out each time the button is clicked.
    questionsContainer.children[0].children[1].innerHTML = "";
    questionsContainer.children[0].children[0].textContent =
        questionsAndAnswers[questionCounter].question;

    // In this loop, the question counter variable is being used to access the index of the object array.
    // this will make it easier to keep trak of the questions.
    // button is being created for each button. The user will able to click on the answer.
    questionsAndAnswers[questionCounter].allAnswers.forEach((answer) => {
        var liEle = document.createElement("button");
        liEle.className = "btn"
        liEle.textContent = answer;
        questionsContainer.children[0].children[1].appendChild(liEle);
    });

    // The whole container is being displayed and the header container, which contains the start quiz content.
    questionsContainer.style.display = "block";
    document.querySelector(".header-container").style.display = "none";

    // incrementing the counter each time to access the question as the quiz moves forward.
    questionCounter++;
}



// function to check the for the answers
function checkAnswer(e) {
    var clickedAnswer = e.target.textContent;


    if (!e.target.matches("button")) {
        alert("Please click on a button");
    }


    // Chekcing if the answer is correct or wrong.
    if (clickedAnswer !== questionsAndAnswers[questionCounter - 1].correctAnswer) {
        scoreCounter -= 10
    }

    // nextquestion is being called to go forward with questions
    nextQuestion();
}


// This function will be called after the quiz finishes.
function showSubmitScoreForm() {
    // Everything in the screen will be updated to display="none"
    // and the empty sumbit form will populated with the following template, template strings is being used.
    questionsContainer.style.display = "none";
    var submitForm = submitFormContainer.children[0];
    submitForm.innerHTML = `
    <h1>All done</h1>
    <p>
         your final score is ${scoreCounter}
    </p>
    <div class='form-group'>
        <label>Enter your intials</label>
        <input class='form-control input' type='text' placeholder='Enter Initials' required>
    </div>
    <button class='btn' type='submit'>Submit</button>`;

    submitFormContainer.style.display = "block";

    submitForm.addEventListener("submit", showHighScore);
}


function nextQuestion() {
    if (questionCounter == questionsAndAnswers.length) {
        showSubmitScoreForm();
    } else {
        showQuestions();
    }
}

// This is function will be called after the form is submitted.
// it will show the highscores and buttons will be provided.
function showHighScore(e) {
    e.preventDefault();


    var container = document.createElement("div");
    submitForm.style.display = "none";
    var template1 = ` <h1>High Score</h1> `;
    var template2 = `
    <div>
        <button class='btn'onclick='goBack()'>Go Back</button>
        <button class='btn' onclick='clearHighScore()'>Clear Highscores</button>
    </div>
    `;

    // calling the funtion and storing it in a variable.
    // the whole list will be sorted and then displayed.
    highScores.sort(function (a, b) { return b.score - a.score });
    highScores.forEach(score => {
        template1 += `<p>${score.initials}- ${score.score}</p>`;
        console.log(score.name + " " + score.score)
    })
    template1 += template2;
    container.innerHTML = template1;

    submitFormContainer.appendChild(container);
    storeScore();
}

// functions to restart the quiz and/or to clear the highscores.
function goBack() {
    location.reload();
}
function clearHighScore() {
    localStorage.clear();
    submitFormContainer.innerHTML = '';
}

// storing the scores in local storage
function storeScore() {
    var inputInitials = document.querySelector("input").value;
    var highScoresObject = {
        initials: inputInitials,
        score: scoreCounter
    };
    highScores.push(highScoresObject);
    localStorage.setItem("highscores", JSON.stringify(highScores));
}

// this funtion will called only will the timer finishes or will the questions ends
function endQuiz() {
    alert("The timer of the quiz is up!")
    showSubmitScoreForm();
}