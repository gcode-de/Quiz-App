import {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayQuestions,
} from "./main.js";

let questions = [];

async function init() {
  questions = await loadQuestionsFromLocalStorage();
  displayBadges();
}

init();

const addQuestionForm = document.querySelector("form");

addQuestionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  //set additional properties
  data.id = questions.length;
  data.bookmarked = false;
  data.addedByUser = true;
  data.tags = data.tags.trim()
    ? data.tags.split(",").map((tag) => tag.trim())
    : "";
  console.log(data);

  // save question to local storage
  addQuestionToQuestions(data);

  //reset form
  addQuestionForm.reset();
  addQuestionForm.headline.focus();
});

//save new question to local storage
function addQuestionToQuestions(question) {
  console.log("Add question:", question);
  questions.push(question);
  saveQuestionsToLocalStorage(questions);
  displayBadges();
}

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
