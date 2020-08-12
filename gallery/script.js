$(init);


function init() {
    $.getJSON("getImages.php", loadGallery)
}



function loadGallery(galleryInfo) {
    let rowWidth = Math.ceil(Math.sqrt(galleryInfo.length))
    let rowPercent=Math.floor(100/rowWidth);
    let deck = shuffle(Array.from(Array(rowWidth * rowWidth).keys()));
    console.log(deck)
    for (i in deck) {
        let currentInfo = galleryInfo[deck[i]];
        if (currentInfo) {
            var image = `../users/${currentInfo.netid}/thumb.png`
        } else {
            var image = `blank.png`;

        }
        var jImage=$('<img>',{src:image,css:{width:`${rowPercent}%`}})
        $('body').append(jImage)
    }

}



function shuffle(deck) {
    for (i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
    return deck;
}