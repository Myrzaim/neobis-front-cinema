const API_TOKEN = "a624030c-f6d9-4629-8b7e-fcc6ef624b92";
const API = "https://kinopoiskapiunofficial.tech/api/v2.2/films/301";
const FILMS_API =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=2";
const TOP_PREMIERS_API =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MARCH";
const TOP_POPULAR_API =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const TOP_WAITING_API =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=APRIL";
const TOP_RELEASES_API =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=FEBRUARY&page=1";
function render(val) {
  let api = FILMS_API;
  let counter = 20;

  let container = document.querySelector(".container");
  localStorage.setItem("favorites", []);
  container.innerHTML = "";
  if (val == "top_premiers") {
    counter = 10;
    api = TOP_PREMIERS_API;
  } else if (val == "top_popular") {
    counter = 10;
    api = TOP_POPULAR_API;
  } else if (val == "top_waiting") {
    counter = 10;
    api = TOP_WAITING_API;
  } else if (val == "releases") {
    counter = 10;
    api = TOP_RELEASES_API;
  }

  fetch(api, {
    method: "GET",
    headers: {
      "X-API-KEY": API_TOKEN,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let datas = val == "releases" ? data.releases : data.items;
      datas.forEach((item) => {
        if (item.nameRu) {
          if (counter == 0) {
            return;
          }
          counter--;
          container.innerHTML += ` 
                <div class="container__card"> 
                
                ${
                  item.ratingKinopoisk
                    ? "<span>" + item.ratingKinopoisk.toFixed(1) + "</span>"
                    : ""
                }
               
                <svg onclick = "favoriteFunc(${item.kinopoiskId})"
                  class="card__favorite-icon"
                  fill="#ffffff"
                  height="30px"
                  width="30px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 500 500"
                  xml:space="preserve"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
        
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
        
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.383-60.399-46.92-99.132-46.92 C57.586,10.346,0,67.931,0,138.714c0,55.426,33.049,119.535,98.23,190.546c50.162,54.649,104.729,96.96,120.257,108.626l9.01,6.769 l9.009-6.768c15.53-11.667,70.099-53.979,120.26-108.625C421.95,258.251,455,194.141,455,138.714 C455,67.931,397.414,10.346,326.632,10.346z"
                    />
                  </g>
                </svg>
        
                <img
                  src="${item.posterUrlPreview}"
                  alt="img"
                />
                <h4>${item.nameRu}</h4>
                <p>${getGenres(item.genres)}</p>
              </div>
                `;
        }
      });
    })
    .catch((err) => alert(err));
}
render("");
let arr = [];
localStorage.setItem("favorites", JSON.stringify(arr));

function getGenres(genres) {
  let result = "";
  genres.forEach((i) => (result += i.genre + ", "));
  return result.substring(0, result.length - 2);
}

function favoriteFunc(id) {
  let arr1 = JSON.parse(localStorage.getItem("favorites"));
  if (arr1.includes(id)) {
    arr1.splice(arr1.indexOf(id), 1);
    console.log(arr1);
  } else {
    arr1.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(arr1));
  console.log(JSON.parse(localStorage.getItem("favorites")));
}
