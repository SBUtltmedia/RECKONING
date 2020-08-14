$(init);


function init() {

    $.getJSON("getImages.php", loadGallery)
    $('#largeImagePanel').on("click",function(){$(this).hide()}).click()
 
    resizeWindow();

    // setTimeout(init, 500000)

}
$(window).resize(function () {
    resizeWindow();
});




function loadGallery(galleryInfo) {
    let table = $('<div/>',{id:"table"});
    let rowWidth = Math.ceil(Math.sqrt(galleryInfo.length))
    let rowPercent = Math.floor(100 / rowWidth);
    let deck = shuffle(Array.from(Array(rowWidth * rowWidth).keys()));

    for (i in deck) {
        let currentInfo = galleryInfo[deck[i]];
        if (currentInfo) {
            var image = `../users/${currentInfo.netid}/thumb.png`
            var title = `${currentInfo.first} ${currentInfo.last}
            <br>
            ${currentInfo.title||"No Name"}
           `;
            var id = currentInfo.netid;
        } else {
            var image = `blank.png`;
            var title = `Empty`;
            var id = "noname"

        }
        var jImage = $('<img>', {
            title: title,
            src: image,
            class: "thumb",
            id: id,
            css: {
                width: `${rowPercent}%`
            }
        })
        table.append(jImage)
    }
    $('.container').prepend(table)

    $(".thumb").tooltip({
        content: function () {
            return this.getAttribute("title");
        }
    }).on("click",function(e){showImage(galleryInfo,e.currentTarget.id)});
    console.log(findImage(galleryInfo,"pstdenis25220"))
}

function showImage(galleryInfo,user){
userInfo=findImage(galleryInfo,user)
if(userInfo){
    $('#largeImage').attr("src",``)
$('#largeImage').attr("src",`../users/${userInfo.netid}/large.png`)
$('#title').html(userInfo.title||"No Name");
$('#user').html(`${userInfo.first} ${userInfo.last}`)
$('#largeImagePanel').show(500);
}
}

function findImage(galleryInfo,user){

return galleryInfo.find((userInfo)=>userInfo.netid==user)
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

function resizeWindow() {
    // Get window width and height
    var w = $(window).width();

    $(".container").css({
      
        height: w+ "px",
  
    });
}