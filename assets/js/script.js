//Dependencies
var highscoreEl = document.querySelector("#highscore-btn");
var timerEl = document.querySelector("#timer");
var contentEl = document.querySelector("#content");
var startQuizEl = document.querySelector("#start-button");
//Data
var questionCard = 0;
var timeLeft = 60;
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
function startQuiz() {
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
  buttonEl.textContent = "Start Quiz";
  contentEl.appendChild(buttonEl);

  console.log(objects[0]);
}

//create a function that deletes the DOM elements that we just created, and a function that replaces them with newly created elements in quiz format, while adding 1 to the question card data, so we can iterate through the list of objects that represent each "slide"
//User Interactions

//Initialization
startQuiz();
