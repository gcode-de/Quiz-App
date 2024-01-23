async function loadQuestions() {
  try {
    const response = await fetch("questions.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
    return []; // Sie können eine leere Liste oder einen anderen Standardwert verwenden
  }
}

let questions = [];

async function init() {
  questions = await loadQuestions();
  displayBadges();
}

init();

const addQuestionForm = document.querySelector("form");

addQuestionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log(data);
  console.log(questions.length);
  data.id = questions.length;
  data.bookmarked = false;
  data.addedByUser = true;
  console.log(data);

  addQuestionForm.reset();
  addQuestionForm.headline.focus();
});

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
