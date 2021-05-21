let tmplCache = {};
const tmpl = function (str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
        tmplCache[str] = tmplCache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
};

const fetchAlbumData = async () => {
    //MOCK
    let checkOrApplyMock =
        new Promise((resolve) => {
            if (!location.search.length === 0)
                location.replace(location + "?albumID=75621062")
            else if (!location.search.includes('albumID'))
                location.replace(location + "&albumID=75621062")
            else resolve()
                ;(function () {
                location.endsWith("&albumID=75621062") ? resolve() : this()
            })();
        })
    console.log( checkOrApplyMock )
    await checkOrApplyMock
    console.log('next')
    //get query
    let urlParams = new URLSearchParams(location.search);
    const albumID = urlParams.get('albumID')
    console.log(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`)

    //fetch starting by album ID

    return await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`)
        .then(res => res.json()).then( (obj) => {
            return { author: obj.artist , songs: obj.tracks.data , title: obj.title  }
            }
        )
}
const populatePage = ( albumObj ) => {
    let data = albumObj

    $('#playlist tbody')[0].innerHTML = tmpl("song_template", data )

    let artistHtml =
    $('#artistSock')[0].innerHTML = tmpl("artist_template", data )

}
window.onload = () => {
    fetchAlbumData()
        .then( populatePage )

    ;

}