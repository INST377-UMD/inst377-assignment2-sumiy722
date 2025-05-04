// This makes sure the code runs after the page loads
window.onload = function() {
    // Get a random quote using fetch
    fetch("https://zenquotes.io/api/random")
      .then(function(response) {
        return response.json(); // convert to JSON
      })
      .then(function(data) {
        // Find the quote element and change the text
        var quoteText = data[0].q + " — " + data[0].a;
        var quoteElement = document.getElementById("quote");
        quoteElement.innerText = quoteText;
      })
      .catch(function(error) {
        // If there's a problem show this
        console.log("Something went wrong with the quote!", error);
      });
  };
  
  // Go to stocks page when the Stocks button is clicked
  function goToStocks() {
    window.location.href = "stocks.html";
  }
  
  // Go to dogs page when the Dogs button is clicked
  function goToDogs() {
    window.location.href = "dogs.html";
  }
  
  // This turns on the voice feature
  function turnOnVoice() {
    if (annyang) {
      var commands = {
        // When you say "hello"
        "hello": function() {
          alert("Hello World");
        },
  
        // Say "change the color to pink" or any color
        "change the color to *color": function(color) {
          document.body.style.backgroundColor = color;
        },
  
        // Say "navigate to dogs", "navigate to stocks", etc.
        "navigate to *page": function(page) {
          // Make sure the page is lowercase
          var cleanPage = page.toLowerCase();
  
          if (cleanPage === "home") {
            window.location.href = "index.html";
          } else if (cleanPage === "stocks") {
            window.location.href = "stocks.html";
          } else if (cleanPage === "dogs") {
            window.location.href = "dogs.html";
          }
        }
      };
  
      annyang.addCommands(commands); // Add the voice commands
      annyang.start(); // Start listening
    }
  }
  
  // This turns off the voice feature
  function turnOffVoice() {
    if (annyang) {
      annyang.abort(); // Stop listening
    }
  }
  