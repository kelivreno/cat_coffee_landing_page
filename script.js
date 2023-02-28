const startQuizButton = document.getElementById('start-quiz');

startQuizButton.addEventListener('click', function() {
  window.location.href = 'quiz.html';
});

// Quiz questions
const quizQuestions = [
  {
    question: "What's your favorite kind of cat?",
    answers: [
      { text: "Siamese", points: 2 },
      { text: "Persian", points: 4 },
      { text: "Tabby", points: 6 },
      { text: "Sphynx", points: 8 }
    ]
  },
  {
    question: "What's your favorite kind of coffee?",
    answers: [
      { text: "Espresso", points: 2 },
      { text: "Latte", points: 4 },
      { text: "Cappuccino", points: 6 },
      { text: "Iced coffee", points: 8 }
    ]
  },
  {
    question: "What's your favorite cat-related activity?",
    answers: [
      { text: "Playing with a toy mouse", points: 2 },
      { text: "Watching cat videos", points: 4 },
      { text: "Snuggling with a cat", points: 6 },
      { text: "Cat yoga", points: 8 }
    ]
  }
];

// Get quiz questions and results elements from HTML
const quizQuestionsElement = document.getElementById("quiz-questions");
const quizResultsElement = document.getElementById("quiz-results");

// Initialize variables
let currentQuestion = 0;
let totalPoints = 0;

// Function to display current quiz question
function displayQuestion() {
  const currentQuizQuestion = quizQuestions[currentQuestion];

  // Create question element
  const questionElement = document.createElement("h3");
  questionElement.innerText = currentQuizQuestion.question;

  // Create answer list element
  const answerListElement = document.createElement("ul");
  answerListElement.classList.add("quiz-list");

  // Loop through answers and create answer button elements
  currentQuizQuestion.answers.forEach(answer => {
    const answerButtonElement = document.createElement("button");
    answerButtonElement.classList.add("quiz-answer");
    answerButtonElement.innerText = answer.text;

    // Add event listener to answer button to update total points and display next question or quiz results
    answerButtonElement.addEventListener("click", () => {
      totalPoints += answer.points;

      if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
      } else {
        displayResults();
      }
    });

    // Add answer button to answer list element
    answerListElement.appendChild(answerButtonElement);
  });

  // Clear previous question and answer list elements from HTML
  quizQuestionsElement.innerHTML = "";
  quizQuestionsElement.appendChild(questionElement);
  quizQuestionsElement.appendChild(answerListElement);
}

function displayResults() {
  // Determine cat and coffee type based on total points
  let catType, coffeeType;
  
  if (totalPoints <= 6) {
    catType = "Siamese";
    coffeeType = "Espresso";
  } else if (totalPoints <= 12) {
    catType = "Persian";
    coffeeType = "Latte";
  } else if (totalPoints <= 18) {
    catType = "Tabby";
    coffeeType = "Cappuccino";
  } else {
    catType = "Sphynx";
    coffeeType = "Iced coffee";
  }
  
  // Create results element with cat and coffee types
  const resultsElement = document.createElement("div");
  resultsElement.innerHTML = `<p>You are a <strong>${catType}</strong> person who should drink <strong>${coffeeType}</strong>.</p><p>Thanks for taking the Cat & Coffee quiz!</p>`;
  const quizResults = document.querySelector("#quiz-results");
  quizResults.style.display = "block";
  quizResults.appendChild(resultsElement);
}
