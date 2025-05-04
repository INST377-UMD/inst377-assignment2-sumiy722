// Show 10 random dog images in a slider
window.onload = function() {
    fetch("https://dog.ceo/api/breeds/image/random/10")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        var carousel = document.getElementById("dog-carousel");
  
        for (var i = 0; i < data.message.length; i++) {
          var img = document.createElement("img");
          img.src = data.message[i];
          img.style.width = "200px";
          img.style.height = "200px";
          img.style.borderRadius = "10px";
          img.style.margin = "10px";
          carousel.appendChild(img);
        }
  
        // Initialize the simple slider
        new SimpleSlider("#dog-carousel", {
          transition: 'left',
          interval: 3000
        });
      });
  
    // Load dog breeds and make buttons
    fetch("https://api.thedogapi.com/v1/breeds")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        window.allBreeds = data;
        var buttonArea = document.getElementById("breed-buttons");
  
        for (var i = 0; i < data.length; i++) {
          var btn = document.createElement("button");
          btn.innerText = data[i].name;
          btn.className = "custom-button";
          btn.onclick = function() {
            showBreedInfo(this.innerText);
          };
          buttonArea.appendChild(btn);
        }
      });
  };
  
  // Show breed info in a box
  function showBreedInfo(name) {
    var breed = window.allBreeds.find(function(b) {
      return b.name.toLowerCase() === name.toLowerCase();
    });
  
    if (breed) {
      document.getElementById("breed-name").innerText = breed.name;
      document.getElementById("breed-description").innerText = breed.temperament || "No description available.";
      document.getElementById("life-span").innerText = breed.life_span;
      document.getElementById("breed-info").style.display = "block";
    }
  }
  
  // Voice Commands
  function turnOnVoice() {
    if (annyang) {
      var commands = {
        "hello": function() {
          alert("Hello World");
        },
        "change the color to *color": function(color) {
          document.body.style.backgroundColor = color;
        },
        "navigate to *page": function(page) {
          var p = page.toLowerCase();
          if (p === "home") {
            window.location.href = "index.html";
          } else if (p === "stocks") {
            window.location.href = "stocks.html";
          } else if (p === "dogs") {
            window.location.href = "dogs.html";
          }
        },
        "load dog breed *name": function(name) {
          showBreedInfo(name);
        }
      };
  
      annyang.addCommands(commands);
      annyang.start();
    }
  }
  
  function turnOffVoice() {
    if (annyang) {
      annyang.abort();
    }
  }
  