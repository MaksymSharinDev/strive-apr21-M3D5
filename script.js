/* M3-D5 */

let albums =[]
let error = false
function search(query){
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`, {
	"method": "GET",
})
.then(response => response.json())
.then ((data) =>{  
  /*   const obj = {
      title: query,
      albums: data.data,
    }
    albums.push(obj) */
    albums = data.data
    console.log(albums);
    console.log(albums[0].artist.name);

    let homeCardsSection = document.getElementById("first-row")
    homeCardsSection.innerHTML += `<div class=" mb-4 text-center col-sm-6 col-md-4 col-lg-2">
                                     <div class="album-container">
                                          <a href=""><img src="${albums[0].album.cover_medium}" alt="" class="img-fluid" /></a>
                                        <h6 class="album-title text-white mt-4">${albums[0].artist.name}</h6>
                                       </div>
                                    </div>`
    /* let albumImg = document.querySelectorAll('')  */
  
})
.catch(err => {
	console.error(err);
});
}

const searchBar = function(){
  let searchButton = document.querySelector('#search-bar button')
  console.log(searchButton);
  let searchInputValue = document.querySelector("#search-bar input").value 
  let AlbumToLoad = albums.filter(album => album.artist.name.toLowerCase().includes(searchInputValue))
  console.log(AlbumToLoad);
  search(AlbumToLoad)
}

 /* M3-D5 END */
window.onload = function () {
  /* M3-D5 */
  search(`eminem`) 
  search("metallica")
  search('ladygaga')
  search('Pink Floyd')
  search('Eric Clapton')
  search('Jimi Hendrix')

  

  
  
  
  /* M3-D5 END */
let i = 0;
  let songs = document.querySelectorAll(".songs");
  function myLoop() {
    setTimeout(function () {
      songs[i].classList.add("animate__animated", "animate__fadeInDown");
      i++; 
      if (i < songs.length) {
        myLoop();
      } 
    }, 1000);
  }
myLoop();

  let selectionsArr = [...$(".selection-card")];
  //attach event handlers to every selection card
  for (let elem of selectionsArr) {
    elem.addEventListener("click", (e) => {
      let inputs = [...e.currentTarget.parentNode.querySelectorAll("input")];
      console.log(inputs);
      for (let inputElem of inputs) {
        inputElem.removeAttribute("checked");
      }
      e.currentTarget.querySelector("input").setAttribute("checked", true);
      let pageName = e.currentTarget.querySelector("input").value;
      $("iframe")[0].setAttribute("src", pageName);
      $(".card-wrapper")[0].classList.add("collapsed");
    });
  }
  //attach event handler to show/hide

  $(".show-page-list")[0].addEventListener("click", (e) => {
    let btn = e.currentTarget;
    if (!btn.getAttribute("active")) {
      btn.setAttribute("active", true);
      $(".card-wrapper")[0].classList.add("collapsed");
    } else {
      btn.removeAttribute("active");
      $(".card-wrapper")[0].classList.remove("collapsed");
    }
  });
};

/* <div class="container">
                        <h1 style class="animate__animated animate__fadeInTopRight text-white pt-4">#THROWBACKTHURSDAY</h1>
                        <div class="animate__animated animate__slideInRight row py-5">
                            <a href="">
                            <div class=" mb-4 text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href=""><img src="img/card1.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Italian Karaoke</h6>
                                </div>
                            </div>
                            <div class=" mb-4 text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href=""> <img src="img/card2.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Lyricists</h6>
                                </div>
                            </div>
                            <div class=" mb-4 text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href="">  <img src="img/card3.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Italy's Frequent Rotation</h6>
                                </div>
                            </div>
                            <div class=" mb-4 text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href=""><img src="img/card4.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">00s Italy</h6>
                                </div>
                            </div>
                            <div class=" mb-4 text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href=""><img src="img/card5.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Cocktail Hour</h6>
                                </div>
                            </div>
                            <div class=" mb-4 text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href=""> <img src="img/card6.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">I Love My '90s Hip-Hop</h6>
                                </div>
                            </div>
                            
                        </div>
                        <h1 class="animate__animated animate__fadeInTopRight text-white pt-4">Classifiche</h1>
                        <div class="row pt-4">

                        </div>

                        <div class="animate__animated animate__slideInRight row py-5 ">
                            <div class="mb-4  text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container ">
                                    <a href=""> <img src="img/top50.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Top 50 - Global</h6>
                                </div>
                            </div>
                            <div class="mb-4  text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href=""> <img src="img/top50ar.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Top 50 - Argentina</h6>
                                </div>
                            </div>
                            <div class="mb-4  text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href="">  <img src="img/viral.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Viral - 50 Global</h6>
                                </div>
                            </div>
                            <div class="mb-4  text-center col-sm-6 col-md-4 col-lg-2">
                                <div class="album-container">
                                    <a href=""> <img src="img/viral50it.jpeg" alt="" class="img-fluid" /></a>
                                    <h6 class="album-title text-white">Viral 50 - Italy</h6>
                                </div>
                            </div>
                            <div class="mb-4  text-center col-sm-6 col-md-4 col-lg-2">
                            </div>
                        </div>
                    </div> */
