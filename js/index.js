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
  showAnswerButtons.forEach((button) => {
    button.addEventListener("click", toggleAnswerDisplay);
  });

  const bookmarkIcons = document.querySelectorAll(".bookmark");
  bookmarkIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      toggleBookmark(event);
      questions = saveBookmarkState(event, questions);
      saveQuestionsToLocalStorage(questions);
    });
  });
}

init();

displayFooter(document.body.querySelector("footer"));
