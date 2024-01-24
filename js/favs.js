import {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayQuestions,
  toggleAnswerDisplay,
  toggleBookmark,
} from "./main.js";

async function init() {
  const questions = await loadQuestionsFromLocalStorage();
  const mainDiv = document.querySelector("main");
  displayQuestions(
    questions.filter((q) => q.bookmarked),
    mainDiv
  );

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
