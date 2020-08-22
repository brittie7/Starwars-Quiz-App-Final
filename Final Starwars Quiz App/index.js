"use strict";

const STORE = {
  quizBank: [
    //1
    {
      question: "Who is the most loyal friend and first mate of Han Solo’s? ",
      options: ["Chewie", "Jar Jar Binks", "C3PO", "R2D2"],
      answer: "Chewie",
    },
    //2
    {
      question: "Who is Luke and Leia’s mother? ",
      options: [
        "Princess Amidala",
        "Princess Tiana",
        "Princess Palpatine",
        "Princess Jasmine",
      ],
      answer: "Princess Amidala",
    },
    //3
    {
      question: "What bounty hunter captures Han Solo? ",
      options: ["The Sith", "Obie Wann", "Darth Vader", "Boba Fett"],
      answer: "Boba Fett",
    },
    //4
    {
      question: "Who do Obi-Wan and Yoda give Leia to?",
      options: ["Grevious Kahn", "Prad Palto", "Bail Organa", "Count Dooku"],
      answer: "Bail Organa",
    },
    //5
    {
      question: "Who trained Luke Skywalker?",
      options: ["Anakin Skywalker", "Yoda", "Obi-Wan Kenobi", "Qui-Gon Jinn"],
      answer: "Yoda",
    },
  ],
};

let score = 0;
let currentQuestionIndex = 0;
let quizLength = STORE.quizBank.length;

function startQuiz() {
  // this function will be responsible for rendering the start quiz page
  // in the DOM
  console.log("`startQuiz` ran");
  $("#start").on("click", function (event) {
    $(this).hide();
    displayQuizStatus();
    newQuestion();
    createSubmitButton();
  });
}

//This function will display the current quiz question and answers

function displayQuizStatus() {
  console.log("`displayQuizStatus` ran");
  let quizStatusVariable = $(".quizStatus");
  $(`<ul>
  <li class="quizStatusTracker">Question:
      <span class="questionNumber">${currentQuestionIndex}</span>/${quizLength}</li>
  <li class="quizStatusTracker">Score:
      <span class="score">0</span>
  </li>
  </ul>`).appendTo(quizStatusVariable);
}

function newQuestion() {
  console.log("`newQuestion` ran");

  $(".questionNumber").text(currentQuestionIndex + 1);
  let currentQuestion = STORE.quizBank[currentQuestionIndex];
  let currentQuestionPrompt = currentQuestion.question;
  let currentQuestionOptions = currentQuestion.options;
  let quizSet = $(".questions");
  quizSet.html(`<div class = questionOnly> ${currentQuestionPrompt}</div>`);

  currentQuestionOptions.forEach(function (choice, choiceIndex) {
    $(`<div><label class="answerQuiz" for="${choiceIndex}">
        <input class="radio" type="radio" id="${choiceIndex}" value="${choice}" name="answer" required>
        <span>${choice}</span>
      </label></div>
      `).appendTo(quizSet);
  });
}
function createSubmitButton() {
  console.log("`createSubmitButton ran`");
  let unifiedQuestion = $("#trivia");
  $(
    `<input type="submit" id ="checkAnswer" form="trivia" value="Submit">`
  ).appendTo(unifiedQuestion);
}

function submitAnswer() {
  console.log("`submitAnswer ran`");
  $("#trivia").submit(function (event) {
    event.preventDefault();
    let userAnswer = $("input[name=answer]:checked", "#trivia").val();
    let correct = STORE.quizBank[currentQuestionIndex].answer;
    if (userAnswer === correct) {
      answerWellYouHave();
      //show happy baby yoda
      //increase score by 1;}
      // hide submit button
      //show next button
    } else {
      tryAgainYouMust();
      //show disappointed baby yoda
      //show correct.val()
      //show next button
    }
  });
}

function answerWellYouHave() {
  console.log("`answerWellYouHave ran`");
  $("#trivia").hide();
  $(".displayUserStatus").html(
    `<div class=tempAnswer><img src="./img/babyYoda-RightAnswer.jpeg" alt="Baby Yoda smiling" class="answerChecked">
    <span class="rightAnswer">Answer Correctly You Have</span> <button type="button" id="next">Next</button></div>`
  );
  score++;
  $(".score").text(score);

  $("#next").on("click", function (event) {
    if (currentQuestionIndex + 1 === quizLength) {
      endQuiz();
    } else {
      nextQuestion();
    }
  });
  //update the score
  //$('#trivia')
}

function tryAgainYouMust() {
  console.log("`tryAgainYouMust ran`");
  $("#trivia").hide();
  $(".displayUserStatus").html(
    `<div class=tempAnswer><img src="./img/babyYoda-WrongAnswer.jpeg" alt="Baby Yoda looking confused" class="answerChecked">
    <p>So certain were you. Next time, closer you must look. The correct answer is:</p>
    <span class="wrongAnswer">${STORE.quizBank[currentQuestionIndex].answer}</span><button type="button" id="next">Next</button></div>`
  );
  $("#next").on("click", function (event) {
    if (currentQuestionIndex + 1 === quizLength) {
      endQuiz();
    } else {
      nextQuestion();
    }
  });
  //Go to next question function
}

function nextQuestion() {
  console.log("`nextQuestion ran`");
  currentQuestionIndex++;
  $("#trivia").show();
  $(".displayUserStatus").empty();
  newQuestion();
  //submitAnswer();
}

function endQuiz() {
  console.log("`endQuiz ran`");
  $(".quizStatus").hide();
  $(".displayUserStatus").empty();
  $(".displayUserStatus").html(
    `You got ${score} of ${quizLength} questions right`
  );
  $("#trivia").show();
  $("#trivia").empty();
  $("#trivia").html(
    `<button type="button" id="restart">Start New Quiz</button>`
  );
  resetQuiz();
}

function resetQuiz() {
  console.log("`resetQuiz ran`");
  $("#restart").on("click", function (event) {
    score = 0;
    currentQuestionIndex = 0;
    $(".score").text(score);
    $(this).hide();
    $(".displayUserStatus").empty();
    $("#trivia").html(`<div class="questions"></div>`);
    $(".quizStatus").show();
    //displayQuizStatus();
    newQuestion();
    createSubmitButton();

    //location.reload();
    //restartQuiz();
  });
}

function handleQuiz() {
  startQuiz();
  submitAnswer();
  //hideQuizStatus();
  //displayQuizStatus();
}
// when the page loads, call `handleQuiz`
$(handleQuiz);
