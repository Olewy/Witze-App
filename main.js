import { fetchJoke } from "./fetching";
import { getSavedJokes, removeJoke, saveJoke } from "./storing";
import "./styles/main.scss";

const LOCAL_STORAGE_KEY = "saved-jokes";

const currentJokeEl = document.querySelector(".current-joke__text");
const saveJokeButton = document.querySelector(".current-joke__save");
const loadNewJokeButton = document.querySelector(".current-joke__generate");
const savedJokesListEl = document.querySelector(".saved-jokes__list");
const removeJokeButton = document.querySelector(".saved-joke__remove");
const savedJokeEl = document.querySelector(".saved-jokes__text");

loadNewJokeButton.addEventListener("click", loadNewJoke);
saveJokeButton.addEventListener("click", saveCurrentJoke);

let currentJoke = "";

async function loadNewJoke() {
  const joke = await fetchJoke();
  if (!currentJoke) {
    saveJokeButton.classList.remove("current-joke__save--disabled");
  }

  currentJoke = joke;
  currentJokeEl.innerText = joke;
}

function saveCurrentJoke() {
  if (currentJoke) {
    saveJoke(currentJoke);
    renderSavedJokes();
  }
}

function removeSavedJoke(index) {
  removeJoke(index);

  renderSavedJokes();
}

window.removeSavedJoke = removeSavedJoke;

function renderSavedJokes() {
  const savedJokes = getSavedJokes();

  let html = "";

  savedJokes.forEach((joke, index) => {
    html += ` 
        <div class="saved-joke">
            <p class="saved-joke__text">
            ${joke}
            </p>
            <button class="saved-joke__remove" onclick="removeSavedJoke()">
              <svg
                class="saved-joke__remove-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                />
              </svg>
            </button>
        </div>
`;
  });

  if (!html) {
    html = "<em>Noch keine Witze gespeichert.<em>";
  }

  savedJokesListEl.innerHTML = html;
}

renderSavedJokes();
