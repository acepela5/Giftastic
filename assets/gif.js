$(document).ready(function(){
// open modal with instructions
        $('.modal').modal();
    // array for the first gif buttons displayed
    var myGifs = ["fries", "food", "cake", "ice cream", "soda"]

    function displayMyGifs() {
        // gif becomes the function with the attribute of data-name
        var gif = $(this).attr("data-name");
        var apiKey = '0ShrzayuUNFBiOJCMLWcRZqyntsbep5T';
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${gif}&api_key=${apiKey}&limit=10`;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
    // goes into the data array
                var results = response.data; 
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $(`<div>`);
    // gets the rating info
                    var rating = results[i].rating;
    // turns ratings into a dynamic paragraph
                    var p = $("<p>").text("Rating: " + rating);
                    p.css("font-size", "20px")
                    p.css("position", "relative")
                    p.css("left", "15px")
                    p.css("color", "#5e1c38")
    // creates dynamic images with the class myGif
                    var gifImage = $(`<img class="myGif">`);
    // sources for the still gifs and animated gifs
                    gifImage.css("border-radius", "3px");
                    gifImage.css("position", "relative");
                    gifImage.css("top", "5px");
                    gifImage.css("left", "15px");
                    var gif ={
                        still: results[i].images.fixed_height_small_still.url,
                        moving: results[i].images.fixed_height_small.url
                    }
                    // the source is gif/still
                    gifImage.attr("src", gif.still);
                    // data-source-still is gif.still
                    gifImage.attr("data-source-still", gif.still)
                    // data-source-moving is gif.moving
                    gifImage.attr("data-source-moving", gif.moving)
                    // attributing both moving and still to gifImage
                    gifImage.attr("data-animate", "still")
                    // puts the image first and then the paragraph with the rating text. New searches are added in front
                    gifDiv.prepend(p);
                    gifDiv.prepend(gifImage);
                    $("#gif-view").prepend(gifDiv);
                }

                $(document).on("click", ".myGif", changeState);
            });
    };

    function renderButtons() {
        // prevents multiple searches from happening
        $("#buttons-view").empty();
        // creates dynamic buttons with the search term as their text
        for (var i = 0; i < myGifs.length; i++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", myGifs[i]);
            a.text(myGifs[i]);
            $("#buttons-view").append(a);
            $("button").css("border-radius", "5px");
            $("button").css("background-color", "#ff6997");
            $("button").css("border-color", "#ff6997");
            $("button").css("padding", "3px");
            $("button").css("position", "relative");
            $("button").css("top", "5px");
            $("button").css("margin", "3px");
            $("button").css("left", "5px");
            $("button").css("font-family", "Patrick Hand, cursive");
            $("button").css("font-size", "20px");
            $("button").css("color", "#5e1c38");
            $("button").css("font-weight", "bold");
            $("button").css("height", "35px");
        }
        $(document).on("click", ".gif", displayMyGifs);
    }
    // if user presses enter without putting in a search term, nothing will be added.
    // if user adds a search term already used, nothing will be added.
    $("#add-gif").on("click", function (event) {
        
        event.preventDefault();

        var userGif = $("#gif-input").val().trim();
        console.log(userGif)

        if (!userGif) {
            console.log("needs a search term")
            alert("Add a valid search")
        }
        else if(myGifs.indexOf(userGif) !== -1) {
                console.log("term already used")
                alert("Search term already added. Try a new one!")
        }
        else{
             // pushes searched terms into the original array
            myGifs.push(userGif);
            renderButtons();
        }
           
    });

    
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
    });