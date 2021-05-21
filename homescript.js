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
  let AlbumToLoad = albums.filter(album => album.artist.name.toLowerCase().includes(searchInputValue.toLowerCase()))
  console.log(albums[0].artist.name.toLowerCase().includes(searchInputValue.toLowerCase()));
  console.log(albums);
  console.log(AlbumToLoad[0])
  let artistName = AlbumToLoad.artist.name
  search(artistName)
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
 }