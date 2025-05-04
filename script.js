const questions = [
  {
    question: "What is the size of int in Java?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on OS"],
    answer: 1,
    explanation: "In Java, an int is always 4 bytes regardless of OS."
  },
  {
    question: "Who developed Java?",
    options: ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Guido van Rossum"],
    answer: 2,
    explanation: "Java was developed by James Gosling at Sun Microsystems."
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implement", "import", "inherits", "extends"],
    answer: 3,
    explanation: "The 'extends' keyword is used to inherit a class in Java."
  },
  {
    question: "What is JVM?",
    options: ["Java Virtual Machine", "Java Verified Mode", "Java Variable Method", "None"],
    answer: 0,
    explanation: "JVM stands for Java Virtual Machine, which executes Java bytecode."
  },
  {
    question: "Which method is the entry point in Java?",
    options: ["main()", "start()", "run()", "init()"],
    answer: 0,
    explanation: "The main() method is the entry point in any standalone Java application."
  }
];

let current = 0;
let score = 0;
let username = "";
let timer;
let timeLeft = 15;

function startQuiz() {
  username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter your name to start the quiz.");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  document.getElementById("display-name").innerText = username;

  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  document.getElementById("explanation").innerText = "";
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });

  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    disableOptions();
    showExplanation(false);
  }
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[current].answer === selected;
  if (correct) score++;
  disableOptions();
  showExplanation(correct);
}

function disableOptions() {
  document.querySelectorAll("#options button").forEach(btn => {
    btn.disabled = true;
  });
}

function showExplanation(correct) {
  const message = correct
    ? "✅ Correct! " + questions[current].explanation
    : "❌ Wrong! " + questions[current].explanation;
  document.getElementById("explanation").innerText = message;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    clearInterval(timer);
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("final-score").innerText = `${username}, your score is ${score}/${questions.length}`;
  }
}

window.onload = () => {
  document.getElementById("username").focus();
};
