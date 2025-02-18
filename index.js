const movieWrapper = document.querySelector(".movies");
const loading = document.getElementById("loading");

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

const randomQuery =
  randomQueries[Math.floor(Math.random() * randomQueries.length)];

/*load state and fetching/mapping data */

async function getMovies(query = randomQuery) {
  loading.style.display = "block";
  movieWrapper.style.opacity = "0";
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=3e69d01d&s=${query}`
  );
  const moviesData = await movies.json();
  movieWrapper.innerHTML = moviesData.Search.map((movie) =>
    movieHTML(movie)
  ).join("");
  loading.style.display = "none";
  movieWrapper.style.opacity = "1";
}

getMovies();

function movieHTML(movie) {
  return `<div class="movie__wrapper">
    <figure class="movie__img--wrapper">
      <img class="movie__img" src="${movie.Poster}" alt="">
    </figure>
    <div class="movie__details">
      <div class="movie__title">
        Title: ${movie.Title}
      </div>
      <div class="movie__release">
        Released: ${movie.Year}
      </div>
      <div class="movie__type">
       Type: ${movie.Type}
      </div>
    </div>
  </div>`;
}

/* search function using enter as event key and helping make search cleaner */

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
