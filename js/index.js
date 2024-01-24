import {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayQuestions,
  toggleAnswerDisplay,
  toggleBookmark,
} from "./main.js";

async function init() {
  const mainDiv = document.querySelector("main");
  const questions = await loadQuestionsFromLocalStorage();
  displayQuestions(questions, mainDiv);

  const showAnswerButtons = document.querySelectorAll("button");
  showAnswerButtons.forEach(function (button) {
    button.addEventListener("click", toggleAnswerDisplay);
  });

  const bookmarkIcons = document.querySelectorAll(".bookmark");
  bookmarkIcons.forEach(function (icon) {
    icon.addEventListener("click", toggleBookmark);
  });
}

init();
