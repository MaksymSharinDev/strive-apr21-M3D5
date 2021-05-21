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

const fetchArtistData = async () => {
    //MOCK
    let checkOrApplyMock =
        new Promise((resolve) => {
            if (!location.search.length === 0)
                location.replace(location + "?artistID=412")
            else if (!location.search.includes('artistID'))
                location.replace(location + "&artistID=412")
            else resolve()
                ;(function () {
                location.endsWith("&artistID=412") ? resolve() : this()
            })();
        })
    console.log( checkOrApplyMock )
    await checkOrApplyMock
    console.log('next')
    //get query
    let urlParams = new URLSearchParams(location.search);
    const artistID = urlParams.get('artistID')

    //fetch starting by artist ID

    return await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`)
        .then(res => res.json()).then( (obj) => {
            console.log( { name: obj.name , fans: obj.nb_fan , albums: obj.nb_album  } )
            return { name: obj.name , fans: obj.nb_fan , albums: obj.nb_album  }
            }
        )
}
const populatePage = ( artistObj ) => {
    $('#artist-top')[0].innerHTML = tmpl("artist_template", artistObj )
}
window.onload = () => {
    fetchArtistData()
        .then( populatePage )

}