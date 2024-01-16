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

async function init() {
  const questions = await loadQuestions();
  const mainDiv = document.querySelector("main");
  displayQuestions(questions, mainDiv);

  const showAnswerButtons = document.querySelectorAll("button");
  showAnswerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      window.getComputedStyle(answer).display === "none"
        ? (answer.style.display = "block")
        : (answer.style.display = "none");
    });
  });

  const bookmarkIcons = document.querySelectorAll(".bookmark");
  bookmarkIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      const article = this.parentElement;
      article.classList.contains("article-fav")
        ? article.classList.remove("article-fav")
        : article.classList.add("article-fav");
    });
  });
}

init();

function displayQuestions(questions, target) {
  //generate tags
  for (question of questions) {
    let tagsHTML = "";
    for (tag of question.tags) {
      tagsHTML += `<li class="tag">${tag}</li>`;
    }

    target.innerHTML += `
    <article class="article ${question.bookmarked ? "article-fav" : ""}">
        <div class="bookmark" aria-label="bookmark"><i class="fas fa-bookmark"></i></div>
        <div class="headline">${question.headline}</div>
        <button>show answer</button>
        <div class="answer">${question.answer}</div>
        <a href="${question.link}" class="answer-link">${question.link}</a>
        <ul class="tags">
        ${tagsHTML}
        </ul>
      </article>
`;
  }
}
