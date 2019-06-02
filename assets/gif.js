//  var myGifs = ["unicorns", "food", "gym", "ice cream", "chocolate"]

function displayMyGifs() {
    var gif = $(this).attr("data-name");
    var apiKey = '0ShrzayuUNFBiOJCMLWcRZqyntsbep5T';
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${gif}&api_key=${apiKey}&limit=10`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data; // -> [.....]

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $(`<div>`);

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var gifImage = $(`<img class="myGif">`);
                // var movingGif = results[i].images.fixed_height_small.url;
                // var stillGif = results[i].images.fixed_height_small_still.url;

                var gif ={
                    still: results[i].images.fixed_height_small_still.url,
                    moving: results[i].images.fixed_height_small.url
                }

                // gifImage.attr("src", stillGif);
                // gifImage.attr("data-source-still", stillGif)
                // gifImage.attr("data-source-moving", movingGif)
                // gifImage.attr("data-animate", "still")

                gifImage.attr("src", gif.still);
                gifImage.attr("data-source-still", gif.still)
                gifImage.attr("data-source-moving", gif.moving)
                gifImage.attr("data-animate", "still")




                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);

                $("#gif-view").prepend(gifDiv);

            }


        });
};

function renderButtons() {
    // deletes previous search
    $("#buttons-view").empty();

    for (var i = 0; i < myGifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", myGifs[i]);
        a.text(myGifs[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var userGif = $("#gif-input").val().trim();

    myGifs.push(userGif);
    renderButtons();
});

$(document).on("click", ".gif", displayMyGifs);

$(document).on("click", ".myGif", changeState);

function changeState() {
    console.log('this change state',this);
    var animated = $(this).attr("data-animate")

    if (animated === "still") {
        $(this).attr("data-animate", "animate")
        $(this).attr("src", $(this).attr("data-source-moving"))
    }
    else if (animated === "animate") {
        $(this).attr("data-animate", "still")
        $(this).attr("src", $(this).attr("data-source-still"))

    }

}

renderButtons();
