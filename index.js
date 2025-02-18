const movieWrapper = document.querySelector(".movies");
const loading = document.getElementById("loading");
const sortSelect = document.getElementById("sortSelect");

/* create "random" first page" */
const randomQueries = [
  "fast",
  "star",
  "love",
  "war",
  "hero",
  "space",
  "magic",
  "adventure",
  "comedy",
  "drama",
];

const randomQuery = getRandomQuery(randomQueries);

function getRandomQuery(queries) {
  return queries[Math.floor(Math.random() * queries.length)];
}

/* Load state and fetching/mapping data */
async function getMovies(query = randomQuery) {
  toggleLoading(true);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=3e69d01d&s=${query}&type=movie`
  );
  const moviesData = await response.json();
  movieWrapper.innerHTML = moviesData.Search.map(movieHTML).join("");
  toggleLoading(false);
  sortMovies({ target: { value: sortSelect.value } });
}

getMovies();

function movieHTML(movie) {
  return `
    <div class="movie__wrapper">
      <figure class="movie__img--wrapper">
        <img class="movie__img" src="${movie.Poster}" alt="">
      </figure>
      <div class="movie__details">
        <div class="movie__title">Title: ${movie.Title}</div>
        <div class="movie__release">Released: ${movie.Year}</div>
      </div>
    </div>`;
}

/* Search function using enter as event key */
function searchMovies(event) {
  if (event.key === "Enter") {
    const query = event.target.value.trim();
    if (query.length > 2) {
      getMovies(query);
    }
  }
}

/* Toggle theme function */
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const themeToggleIcon = document.querySelector("#themeToggle i");
  themeToggleIcon.classList.toggle("fa-toggle-on");
  themeToggleIcon.classList.toggle("fa-toggle-off");
}

/* Toggle loading state */
function toggleLoading(isLoading) {
  loading.style.display = isLoading ? "block" : "none";
  movieWrapper.style.opacity = isLoading ? "0" : "1";
}

/* Sort movies function */
function sortMovies(event) {
  const sortBy = event.target.value;
  const movies = Array.from(document.querySelectorAll(".movie__wrapper"));

  const getValue = (movie, key) => movie.querySelector(key).textContent;

  const sortedMovies = movies.sort((a, b) => {
    if (sortBy === "name") {
      return getValue(a, ".movie__title").localeCompare(
        getValue(b, ".movie__title")
      );
    } else if (sortBy === "date") {
      return (
        new Date(getValue(a, ".movie__release")) -
        new Date(getValue(b, ".movie__release"))
      );
    }
    return 0; // No sorting if sortBy is not recognized
  });

  // Clear and append sorted movies
  movieWrapper.innerHTML = "";
  sortedMovies.forEach((movie) => movieWrapper.appendChild(movie));
}

sortSelect.addEventListener("change", sortMovies);
