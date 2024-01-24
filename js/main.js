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
      console.log("Fragen aus Local Storage geladen.");
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
    <article q-id="${question.id}" class="article ${
      question.bookmarked ? "article-fav" : ""
    }">
        <div class="bookmark" aria-label="bookmark"><i class="fas fa-bookmark"></i></div>
        <div class="question">${question.question}</div>
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

function saveBookmarkState(questions) {
  const article = this.parentElement;
  console.log(
    article,
    article.getAttribute("q-id"),
    questions[article.getAttribute("q-id")].bookmarked
  );
  return questions;
}

function displayFooter(target) {
  target.innerHTML = `
<menu>
        <ul>
          <a href="./index.html" aria-label="home">
            <li>
              <i class="fa-solid fa-house"></i>
            </li>
          </a>
          <a href="./favs.html" aria-label="Favourites">
            <li>
              <i class="fas fa-bookmark"></i>
            </li>
          </a>
          <a href="./form.html" aria-label="Add Question">
            <li>
              <i class="fas fa-circle-plus"></i>
            </li>
          </a>
          <a href="./profile.html" aria-label="Profile">
            <li>
              <i class="fa-solid fa-user"></i></li
          ></a>
        </ul>
      </menu>
`;
}

export {
  loadQuestionsFromLocalStorage,
  saveQuestionsToLocalStorage,
  displayQuestions,
  saveBookmarkState,
  toggleAnswerDisplay,
  toggleBookmark,
  displayFooter,
};
