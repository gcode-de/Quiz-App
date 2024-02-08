import {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayQuestions,
  displayFooter,
} from "./main.js";

let questions = [];

async function init() {
  const mainDiv = document.querySelector("main");
  questions = await loadQuestionsFromLocalStorage();
  // displayQuestions(questions, mainDiv);
}

init();

displayFooter(document.body.querySelector("footer"));

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
    ? data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 2)
    : "";
  console.log(data);

  // save question to local storage
  addQuestionToQuestions(data);

  //reset form
  addQuestionForm.reset();
  addQuestionForm.question.focus();
});

//save new question to local storage
function addQuestionToQuestions(question) {
  console.log("Add question:", question);
  questions.push(question);
  saveQuestionsToLocalStorage(questions);
}

//Textaera-Inputs inline validation
const inputFields = addQuestionForm.querySelectorAll(".max150");
const maxLength = 150;

inputFields.forEach((field) => {
  const span = field.nextElementSibling;
  field.addEventListener("input", (event) => {
    const typedCharacters = event.target.value.length;
    if (typedCharacters) {
      // span.hidden = false;
      span.textContent = `${maxLength - typedCharacters} characters left`;
    } else {
      // span.hidden = true;
      span.textContent = "";
    }
  });
});
