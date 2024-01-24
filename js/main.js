async function loadQuestionsFromJSON() {
  try {
    const response = await fetch("questions.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
    return [];
  }
}

function loadQuestionsFromLocalStorage() {
  try {
    const questionsJson = localStorage.getItem("questions");
    if (questionsJson) {
      return JSON.parse(questionsJson);
    } else {
      console.log("Keine Fragen im Local Storage gefunden. Lade aus Datei...");
      return loadQuestionsFromJSON();
    }
  } catch (error) {
    console.error("Fehler beim Laden der Fragen:", error);
    return [];
  }
}

function saveQuestionsToLocalStorage(questions) {
  try {
    const questionsJson = JSON.stringify(questions);
    localStorage.setItem("questions", questionsJson);
    console.log("Fragen wurden erfolgreich gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern der Fragen:", error);
  }
}

function displayQuestions(questions, target) {
  //generate tags
  for (let question of questions) {
    let tagsHTML = "";
    for (let tag of question.tags) {
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

function toggleAnswerDisplay() {
  const answer = this.nextElementSibling;
  const isHidden = window.getComputedStyle(answer).display === "none";
  answer.style.display = isHidden ? "block" : "none";
}

function toggleBookmark() {
  const article = this.parentElement;
  article.classList.contains("article-fav")
    ? article.classList.remove("article-fav")
    : article.classList.add("article-fav");
}

export {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayQuestions,
  toggleAnswerDisplay,
  toggleBookmark,
};
