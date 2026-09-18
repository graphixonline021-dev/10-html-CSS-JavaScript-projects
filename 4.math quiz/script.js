const questionEl = document.getElementById("question");
const answerInput = document.getElementById("user-answer");
const quizForm = document.getElementById("quiz-form");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");

let currentQuestion = {};
let score = 0;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateQuestion = () => {
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let num1, num2, answer;

  switch (operator) {
    case "+":
      num1 = getRandomNumber(1, 50);
      num2 = getRandomNumber(1, 50);
      answer = num1 + num2;
      break;
    case "-":
      num1 = getRandomNumber(1, 50);
      num2 = getRandomNumber(1, num1); // Ensure positive result
      answer = num1 - num2;
      break;
    case "*":
      num1 = getRandomNumber(1, 12);
      num2 = getRandomNumber(1, 12);
      answer = num1 * num2;
      break;
    case "/":
      num2 = getRandomNumber(1, 10);
      answer = getRandomNumber(1, 10);
      num1 = num2 * answer; // Ensure integer result
      break;
  }

  currentQuestion = {
    text: `What is ${num1} ${operator} ${num2}?`,
    answer: answer
  };

  questionEl.textContent = currentQuestion.text;
};

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userAnswer = parseFloat(answerInput.value);

  if (isNaN(userAnswer)) return;

  if (userAnswer === currentQuestion.answer) {
    score += 1;
    scoreEl.textContent = score;
    feedbackEl.textContent = "Correct! Great job!";
    feedbackEl.className = "feedback-msg correct";
  } else {
    feedbackEl.textContent = `Wrong! The correct answer was ${currentQuestion.answer}`;
    feedbackEl.className = "feedback-msg incorrect";
  }

  answerInput.value = "";
  generateQuestion();
});

// Initial call to generate first question
generateQuestion();