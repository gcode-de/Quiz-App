import {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayFooter,
  displayQuestions,
  saveBookmarkState,
  toggleAnswerDisplay,
  toggleBookmark,
} from "./main.js";

let questions = [];

async function init() {
  const mainDiv = document.querySelector("main");
  questions = await loadQuestionsFromLocalStorage();
  displayQuestions(questions, mainDiv);

  const showAnswerButtons = document.querySelectorAll("button");
  showAnswerButtons.forEach(function (button) {
    button.addEventListener("click", toggleAnswerDisplay);
  });

  const bookmarkIcons = document.querySelectorAll(".bookmark");
  bookmarkIcons.forEach(function (icon) {
    icon.addEventListener("click", toggleBookmark);
    // icon.addEventListener("click", (questions = saveBookmarkState(questions)));
  });
}

init();

displayFooter(document.body.querySelector("footer"));
