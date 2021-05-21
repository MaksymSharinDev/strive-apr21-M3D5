//
window.onload = function () {

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
        75621062

        let urlParams = new URLSearchParams(location.search);
        const albumID = urlParams.get('albumID')
        console.log(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`)
        let albumData = {}
        //fetch starting by album ID

        return await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`)
            .then(res => res.json()).then((obj) => albumData = { author: obj.data.artist , songs: obj.data['tracks'].data }  )
    }
    const populatePage = ( albumObj ) => {

    }

    fetchAlbumData()
        .then( populatePage )

    ;

}