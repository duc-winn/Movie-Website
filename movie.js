//API KEY: 1b6509cafd56bede8fcf810e4b263997
//Movie poster Link: https://www.themoviedb.org/t/p/original
const moviePosterUrl = `https://www.themoviedb.org/t/p/original`;
const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=1b6509cafd56bede8fcf810e4b263997`;
const urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=1b6509cafd56bede8fcf810e4b263997`;
const urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=1b6509cafd56bede8fcf810e4b263997`;

let movieName;

const dropDownMenuBtn = document.getElementById("dropDownMenuBtn");
const category = document.getElementById("category");
const dropMenuOption = document.getElementById("menuOption");
const menuOption1 = document.getElementById("option1");
const menuOption2 = document.getElementById("option2");
const menuOption3 = document.getElementById("option3");
const moviesContainer = document.getElementById("moviesContainer");
const websiteIcon = document.getElementById("icon");
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("input");
const categoryDiv = document.getElementById("categoryDiv");

getMovie(urlPopular);

let dropMenuShown = false;
dropDownMenuBtn.addEventListener("click", () =>{
    if(!dropMenuShown){
        dropMenuOption.classList.add("show");
        dropMenuShown = true;
    }
    else{
        dropMenuOption.classList.remove("show");
        dropMenuShown = false;
    }
});

menuOption1.addEventListener("click", () =>{ //MOST POPULAR OPTION
    dropMenuOption.classList.remove("show");
    dropMenuShown = false;
    dropDownMenuBtn.innerText = menuOption1.innerText;
    category.innerText = menuOption1.innerText;
    getMovie(urlPopular);
});
menuOption2.addEventListener("click", () =>{  //TOP RATED OPTION
    dropMenuOption.classList.remove("show");  //and track which option is slected
    dropMenuShown = false;  
    dropDownMenuBtn.innerText = menuOption2.innerText;
    category.innerText = menuOption2.innerText;   
    getMovie(urlTopRated);                
});
menuOption3.addEventListener("click", () =>{   //These will perform API Calls for category
    dropMenuOption.classList.remove("show");    //Upcoming movies option
    dropMenuShown = false;
    dropDownMenuBtn.innerText = menuOption3.innerText;
    category.innerText = menuOption3.innerText;
    getMovie(urlUpcoming);
});

websiteIcon.addEventListener("click", ()=> {
    location.reload();
});

searchBtn.addEventListener("click", ()=>{
    getMovie("blank", "search")
});

async function getMovie(url = "blank", type = "none"){ //their default value
    try{
        let data;
        if(type === "search" && url === "blank"){
            moviesContainer.innerHTML = "";

            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjY1MDljYWZkNTZiZWRlOGZjZjgxMGU0YjI2Mzk5NyIsInN1YiI6IjY0ODgwMGY1OTkyNTljMDBjNWI2MTJmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.juzw98ppUuJ08Th2k5vTidErh5zlRaF06bQKrTkMyME'
                }
            };

            movieName = searchBar.value;
            movieName.replaceAll(" ", "%20");
              
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}`, options);
            data = await response.json();

            categoryDiv.innerHTML = "";
            const searchResult = document.createElement("div");
            searchResult.setAttribute("id", "searchResult");
            searchResult.innerText = `Search results for: ${movieName}`;
            categoryDiv.appendChild(searchResult);
        }
        else{
            moviesContainer.innerHTML = "";
            const response = await fetch(url);
            data = await response.json();
        }
        console.log(data);
        for(let movie of data.results){
            const movieDiv = document.createElement("div");
            movieDiv.setAttribute("id", "movieDiv");
            movieDiv.innerHTML = `<a href = "./movieDetail.html" target = "_self"><img width = 240 src = "${moviePosterUrl + movie.poster_path}">
                                    <div id = "info">
                                        <header>${movie.title}</header>
                                        <div id = "score" ><img  width = 15 src = "movieImages/rating.png">  ${Number(movie.vote_average).toFixed(1)}</div>
                                    </div></a>`;
            moviesContainer.appendChild(movieDiv);

            movieDiv.addEventListener("click", ()=> {
                let data = movie.id;
                localStorage.setItem("movieId", JSON.stringify(data));
            })
        }
    }
    catch(error){
        console.log(error);
    }
}