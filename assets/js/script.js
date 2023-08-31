//Dependencies
var highscoreEl = document.querySelector("#highscore-btn");
var timerEl = document.querySelector("#timer");
var contentEl = document.querySelector("#content");
var startQuizEl = document.querySelector("#start-button");

//Data
var correctAnswers = 0;
var incorrectAnswers = 0;
var questionNumber = 0;
var timeLeft = 60;
//data for highscore
var hScoreWins = 0;
var hScorelosses = 0;
var hScoreInitials = "";
//save so can stop timer when required
var stopTime;
var objects = [
  (obj1 = {
    question:
      "Which one of the following also known as Conditional Expression:",
    a: "Alternative to if-else",
    b: "Switch statement",
    c: "If-then-else statement",
    d: "immediate if",
    answer: "immediate if",
    explanation:
      "A conditional expression can only evaluate two things, which either true or false, that are purely based on the evaluation of the condition",
  }),
  (obj2 = {
    question: "In JavaScript, what is a block of statement?",
    a: "Conditional block",
    b: "block that combines a number of statements into a single compound statement",
    c: "both conditional block and a single statement",
    d: "block that contains a single statement",
    answer:
      "block that combines a number of statements into a single compound statement",
    explanation:
      "A block of statement can be understand as the set of the zero or more statements. In general, a block of statement has common definition which combines one or a number of statements into a single statement for ease.",
  }),
];

//Functions

//create a function that generates a div with an h1, paragraph explaining what the quiz is, and a start quiz button
function loadPage() {
  //create
  var headerEl = document.createElement("h1");
  //build
  headerEl.textContent = "Quick Coding Quiz!";
  headerEl.setAttribute("id", "start-header");
  //place
  contentEl.appendChild(headerEl);

  //now create/build/place paragraph
  var paraEl = document.createElement("p");
  paraEl.textContent = `This is a timed quiz built by yours truly to see just how much you know about coding. When you are ready click "Start Quiz", and the quiz and timer will begin`;
  paraEl.setAttribute("id", "start-para");
  contentEl.appendChild(paraEl);

  //now do the same with a button
  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("id", "start-button");
  buttonEl.setAttribute("type", "button");
  buttonEl.textContent = "Start Quiz";
  contentEl.appendChild(buttonEl);

  buttonEl.addEventListener("click", startQuiz);
}

//function to start a timer
function startTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time Left: " + timeLeft;

    if (timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      //you lose function
      youLose();
    }
  }, 1000);
  return timerInterval;
}

//function to delete elements in content section
function deleteChildren() {
  while (contentEl.firstChild) {
    contentEl.removeChild(contentEl.lastChild);
  }
}

//function for when next is clicked, if questionnumber does not = objects.length build another question slide, if it does === objects.length, delete elements and create a highscore page
function nextSlide() {
  if (questionNumber !== objects.length) {
    deleteChildren();

    createSlide(questionNumber, objects);
  } else {
    //stop timer
    clearInterval(stopTime);
    //clear page
    deleteChildren();
    //function to create highscore page
    submitScorePage();
  }
}

function submitScorePage() {
  var headerEl = document.createElement(`h1`);
  headerEl.setAttribute("id", "submit-header");
  headerEl.textContent = "All done! Submit your score below";
  contentEl.appendChild(headerEl);

  var paraEl = document.createElement(`p`);
  paraEl.setAttribute("id", "submit-para");
  paraEl.innerHTML = `Your scores: <p> Correct: ${correctAnswers} </p> <p> Incorrect: ${incorrectAnswers}`;
  contentEl.appendChild(paraEl);

  var inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.setAttribute("id", "input");
  contentEl.appendChild(inputEl);

  var submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.setAttribute("id", "submit-button");
  contentEl.appendChild(submitButton);

  var paraEl2 = document.createElement(`p`);
  paraEl2.setAttribute("id", "submit-para2");
  paraEl2.innerHTML = `Please type your initials into the input field, then press submit to save your highscore.`;
  contentEl.appendChild(paraEl2);

  //event listener
  submitButton.addEventListener("click", storeHighscore);
}

//function that creates simple highscore page, stores the highscore, and displays it
function storeHighscore() {
  //modify highscore data
  hScoreInitials = document.getElementById("input").value;
  hScoreWins = correctAnswers;
  hScorelosses = incorrectAnswers;

  //clear page
  deleteChildren();

  //push values to local storage
  localStorage.setItem("initials", hScoreInitials);
  localStorage.setItem("correct", hScoreWins);
  localStorage.setItem("incorrect", hScorelosses);
  //create elements
  var headerEl = document.createElement(`h1`);
  headerEl.setAttribute("id", "highscore-header");
  headerEl.textContent = "Highscore:";
  contentEl.appendChild(headerEl);

  var paraEl = document.createElement(`p`);
  paraEl.setAttribute("id", "submit-para");
  paraEl.innerHTML = `Highscore: ${hScoreInitials} Correct: ${hScoreWins} Incorrect: ${hScorelosses}`;
  contentEl.appendChild(paraEl);

  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("id", "go-back-button");
  buttonEl.setAttribute("type", "button");
  buttonEl.textContent = "Go Back";
  contentEl.appendChild(buttonEl);

  var buttonEl2 = document.createElement("button");
  buttonEl2.setAttribute("id", "clear-button");
  buttonEl2.setAttribute("type", "button");
  buttonEl2.textContent = "Clear Highscores";
  contentEl.appendChild(buttonEl2);

  buttonEl.addEventListener("click", function () {
    //clear page
    deleteChildren();
    //reset time
    timeLeft = 60;
    //reset question index
    questionNumber = 0;
    //reset correct/incorrect count
    correctAnswers = 0;
    incorrectAnswers = 0;
    //start again
    loadPage();
  });

  buttonEl2.addEventListener("click", function () {
    //clear highscore text
    paraEl.innerHTML = "";
    //reset local storage
    localStorage.setItem("initials", "");
    localStorage.setItem("correct", 0);
    localStorage.setItem("incorrect", hSco0relosses);
  });
}

function getHighscore() {
  //get highscore data
  hScoreInitials = localStorage.getItem("initials", hScoreInitials);
  hScoreWins = localStorage.getItem("correct", hScoreWins);
  hScorelosses = localStorage.getItem("incorrect", hScorelosses);

  //clear page
  deleteChildren();

  //stop time
  clearInterval(stopTime);

  // create elements
  var headerEl = document.createElement(`h1`);
  headerEl.setAttribute("id", "highscore-header");
  headerEl.textContent = "Highscore:";
  contentEl.appendChild(headerEl);

  var paraEl = document.createElement(`p`);
  paraEl.setAttribute("id", "submit-para");
  paraEl.innerHTML = `Highscore: ${hScoreInitials} Correct: ${hScoreWins} Incorrect: ${hScorelosses}`;
  contentEl.appendChild(paraEl);

  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("id", "go-back-button");
  buttonEl.setAttribute("type", "button");
  buttonEl.textContent = "Go Back";
  contentEl.appendChild(buttonEl);

  buttonEl.addEventListener("click", function () {
    //clear page
    deleteChildren();
    //reset time
    timeLeft = 60;
    //reset question index
    questionNumber = 0;
    //reset correct/incorrect count
    correctAnswers = 0;
    incorrectAnswers = 0;
    //start again
    loadPage();
  });
}

//self explanitory
function addOne() {
  questionNumber++;
}

//function to check if event text === question answer, if so, display correct message, if not, display incorrect message
function correctOrNot(questionAnswer, questionExplanation, textContent) {
  //   console.log(textContent);
  if (questionAnswer === textContent) {
    var correct = document.createElement("p");
    correct.innerHTML = `<p>You are CORRECT!</p> 
      <p>Explanation: ${questionExplanation}</p>`;
    correct.setAttribute("id", "correct-answer");
    contentEl.appendChild(correct);

    //build next button
    var nextButton = document.createElement("button");
    nextButton.textContent = "NEXT";
    nextButton.setAttribute("id", "next-button");
    contentEl.appendChild(nextButton);
    //data
    correctAnswers++;
    //event listener
    nextButton.addEventListener("click", nextSlide);
  } else {
    var incorrect = document.createElement("p");
    incorrect.innerHTML = `<p>You are INCORRECT!</p> 
    <p>Explanation: ${questionExplanation}</p>`;
    incorrect.setAttribute("id", "incorrect-answer");
    contentEl.appendChild(incorrect);

    //build next button
    var nextButton = document.createElement("button");
    nextButton.textContent = "NEXT";
    nextButton.setAttribute("id", "next-button");
    contentEl.appendChild(nextButton);
    //data
    incorrectAnswers++;
    //subtract seconds
    timeLeft = timeLeft - 10;
    console.log(timeLeft);
    //set element
    timerEl.textContent = "Time Left: " + timeLeft;
    //event listener
    nextButton.addEventListener("click", nextSlide);
  }
}

//function to create elements with content based on which question slide we are on
function createSlide(questionNumber, questionInfo) {
  //adds 1 to slide counter
  addOne();

  //create question
  var headerEl = document.createElement("h1");
  headerEl.textContent = questionInfo[questionNumber]["question"];
  headerEl.setAttribute("id", "slide-question");
  contentEl.appendChild(headerEl);

  //create buttons
  buttonA = document.createElement("button");
  buttonA.textContent = "A) " + questionInfo[questionNumber]["a"];
  buttonA.setAttribute("id", "slide-button");
  contentEl.appendChild(buttonA);

  buttonB = document.createElement("button");
  buttonB.textContent = "B) " + questionInfo[questionNumber]["b"];
  buttonB.setAttribute("id", "slide-button");
  contentEl.appendChild(buttonB);

  buttonC = document.createElement("button");
  buttonC.textContent = "C) " + questionInfo[questionNumber]["c"];
  buttonC.setAttribute("id", "slide-button");
  contentEl.appendChild(buttonC);

  buttonD = document.createElement("button");
  buttonD.textContent = "D) " + questionInfo[questionNumber]["d"];
  buttonD.setAttribute("id", "slide-button");
  contentEl.appendChild(buttonD);

  //store question answer and explanation, along with button text data
  var questionAnswer = questionInfo[questionNumber]["answer"];
  var questionExplanation = questionInfo[questionNumber]["explanation"];
  var buttonAtext = questionInfo[questionNumber]["a"];
  var buttonBtext = questionInfo[questionNumber]["b"];
  var buttonCtext = questionInfo[questionNumber]["c"];
  var buttonDtext = questionInfo[questionNumber]["d"];

  //if user clicks correct answer, display congradulatory message under buttons
  buttonA.addEventListener("click", function () {
    correctOrNot(questionAnswer, questionExplanation, buttonAtext);
  });

  buttonB.addEventListener("click", function () {
    correctOrNot(questionAnswer, questionExplanation, buttonBtext);
  });

  buttonC.addEventListener("click", function () {
    correctOrNot(questionAnswer, questionExplanation, buttonCtext);
  });

  buttonD.addEventListener("click", function () {
    correctOrNot(questionAnswer, questionExplanation, buttonDtext);
  });
}

//function for if timer hits 0
function youLose() {
  //clear page
  deleteChildren();
  //build h1
  var headerEl = document.createElement("h1");
  headerEl.textContent = "YOU LOSE!!!";
  headerEl.setAttribute("id", "start-header");
  contentEl.appendChild(headerEl);
  //build button
  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("id", "go-back-button");
  buttonEl.setAttribute("type", "button");
  buttonEl.textContent = "Go Back";
  contentEl.appendChild(buttonEl);
  //user stuff
  buttonEl.addEventListener("click", function () {
    //clear page
    deleteChildren();
    //reset time
    timeLeft = 60;
    //reset question index
    questionNumber = 0;
    //reset correct/incorrect count
    correctAnswers = 0;
    incorrectAnswers = 0;
    //start again
    loadPage();
  });
}

function startQuiz() {
  //start timer and store interval for later
  stopTime = startTime();

  //delete elements
  deleteChildren();

  //create new slide
  createSlide(questionNumber, objects);
}

//User Interactions
highscoreEl.addEventListener("click", function (event) {
  event.preventDefault();
  getHighscore();
});

//Initialization
loadPage();
