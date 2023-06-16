const moviePosterUrl = `https://www.themoviedb.org/t/p/original`;

const xuePiaoUrl = `https://www.youtube.com/watch?v=ue07acmWGNY&ab_channel=MemeGod`;
const rickRollUrl = `https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley`;
const monkeyUrl = `https://www.youtube.com/watch?v=6Cr_8tvvQ0k&ab_channel=Asha7494`;
const alienUrl = `https://www.youtube.com/watch?v=WxrQ3SqSt6Q&ab_channel=Deemz`;
const bangerUrl = `https://www.youtube.com/watch?v=XJWqHmY-g9U&ab_channel=JunkoOhashi%E5%A4%A7%E6%A9%8B%E7%B4%94%E5%AD%90`;

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
let trollLink = document.getElementById("trollLink");


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

        trollLink.setAttribute("href", getLink());

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

function getLink(){
    let random = Math.floor((Math.random() * 5)) + 1;

    switch(random){
        case 1:
            return xuePiaoUrl;

        case 2:
            return rickRollUrl;

        case 3:
            return monkeyUrl;

        case 4:
            return alienUrl;

        case 5:
            return bangerUrl;
    }
}

