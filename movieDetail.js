
const moviePosterUrl = `https://www.themoviedb.org/t/p/original`;

let movieId = localStorage.getItem("movieId");

let moviePosterVertical = document.getElementById("moviePoster");
let title = document.getElementById("movieTitle");
let movieOverview = document.getElementById("movieOverview");
let movieTitle = document.getElementById("home-movie-title");
let moviePosterHorizontal = document.getElementById("moviePosterHorizontal");
let genre = document.getElementById("genre");
let producers = document.getElementById("producer");
let countries = document.getElementById("country");
let runtime = document.getElementById("runtime");
let releaseDate = document.getElementById("releaseDate");
let imdb = document.getElementById("scoreIMDB");
let voteCount = document.getElementById("scoreVoteCount");


async function getDetail(){
    try{
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjY1MDljYWZkNTZiZWRlOGZjZjgxMGU0YjI2Mzk5NyIsInN1YiI6IjY0ODgwMGY1OTkyNTljMDBjNWI2MTJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juzw98ppUuJ08Th2k5vTidErh5zlRaF06bQKrTkMyME'
            }
        };
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
        const result = await response.json();

        console.log(result);

        moviePosterVertical.setAttribute("src", `${moviePosterUrl}${result.poster_path}`);
        title.innerHTML = result.title;
        movieOverview.innerHTML = result.overview;
        movieTitle.innerText = `Home / Movies / ${result.title}`;
        moviePosterHorizontal.setAttribute("src", `${moviePosterUrl}${result.backdrop_path}`);

        genre.innerHTML = `Genre: ${result.genres.map((element) => {
            return element.name;
        }).join(", ")}`;

        producers.innerHTML = `Producer: ${result.production_companies.map((element) =>{
            return element.name;
        }).join(", ")}`;

        countries.innerHTML = `Country: ${result.production_countries.map((element) =>{
            return element.name;
        }).join(", ")}`;

        runtime.innerHTML = `Duration: ${result.runtime}m`;
        releaseDate.innerHTML = `Release Date: ${result.release_date}`;
        imdb.innerHTML = `IMDB: ${Number(result.vote_average).toFixed(1)}`;
        voteCount.innerHTML = `Vote Count: ${result.vote_count}`;

    }
    catch(error){
        console.log(error);
    }
}

getDetail();

