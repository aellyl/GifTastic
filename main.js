      // Initial array of topics
      var topics = ["Aladdin", "Harry Potter", "Ariel", "Gandalf","Tinker Bell","Pooh","The Doctor","Lestat","Batman","Deadpool"];
      var limit=10;

      function getGifs()
      {
          $("#gifResults").empty()
          var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit="+limit+"&q="+$(this).attr("data-name");

            $.ajax({
              url: queryURL,
              method: "GET"
            })
            .done(function(response) {

              // console.log(response);

              for(var i =0;i<limit;i++)
              {
                var stillImgUrl = response.data[i].images.fixed_height_still.url;
                var animateImgUrl=response.data[i].images.fixed_height.url;

                var displayImg=$("<div>");
                displayImg.append("<p>Rating: "+response.data[i].rating+"</p>");

                var topicImage = $("<img>");
                topicImage.attr("src", stillImgUrl);
                topicImage.attr("data-still", stillImgUrl);
                topicImage.attr("data-animate", animateImgUrl);
                topicImage.attr("data-state", "still");
                topicImage.addClass("gif");

                displayImg.append(topicImage);

                $("#gifResults").append(displayImg);

              }

            });

      };

      function displayButtons() {

        $("#displayBtn").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          a.addClass("topic btn btn-info");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#displayBtn").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#addTopic").on("click", function(event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        displayButtons();

      });

      $(document).on("click", ".topic", getGifs);

      //pause or play the gif images
      $(document).on("click",".gif" ,function() {

        var state=$(this).attr("data-state");

        if(state === "still")
        {
          $(this).attr("src",$(this).attr("data-animate"));
          $(this).attr("data-state","animate");
        }
        else
        {
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state","still");

        }

      });

      // Calling the renderButtons function to display the intial buttons
      displayButtons();