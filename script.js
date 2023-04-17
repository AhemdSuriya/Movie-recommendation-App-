const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    searchMovies(searchTerm);
});

function searchMovies(searchTerm) {
    const apiKey = "your_api_key_here";
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            moviesContainer.innerHTML = "";
            movies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                moviesContainer.appendChild(movieCard);
            });
        })
        .catch(error => console.log(error));
}

function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    moviePoster.alt = `${movie.title} Poster`;
    movieCard.appendChild(moviePoster);

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.title;
    movieCard.appendChild(movieTitle);

    const movieRating = document.createElement("p");
    movieRating.textContent = `Rating: ${movie.vote_average}`;
    movieCard.appendChild(movieRating);

    const movieOverview = document.createElement("p");
    movieOverview.textContent = movie.overview;
    movieCard.appendChild(movieOverview);

    return movieCard;
}
