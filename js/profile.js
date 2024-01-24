import {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayQuestions,
  displayFooter,
} from "./main.js";

let questions = [];

displayFooter(document.body.querySelector("footer"));

async function init() {
  questions = await loadQuestionsFromLocalStorage();
  displayBadges();
}

init();

//Display badges for bookmarks and added questions
function displayBadges() {
  const addedQuestionsNumber = document.querySelector(
    '[js-data="added-questions-number"]'
  );
  addedQuestionsNumber.textContent = questions.filter(
    (q) => q.addedByUser
  ).length;

  const bookmarkedQuestionsNumber = document.querySelector(
    '[js-data="bookmarked-questions-number"]'
  );
  bookmarkedQuestionsNumber.textContent = questions.filter(
    (q) => q.bookmarked
  ).length;
}
