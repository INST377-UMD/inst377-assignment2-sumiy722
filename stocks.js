// Replace with your actual Polygon.io API key
var apiKey = "YOUR_API_KEY";

// Function to get stock data and draw chart
function getStockData() {
  var symbol = document.getElementById("ticker").value.toUpperCase();
  var days = document.getElementById("days").value;

  var today = new Date();
  var past = new Date();
  past.setDate(today.getDate() - parseInt(days));

  var fromDate = past.toISOString().split("T")[0];
  var toDate = today.toISOString().split("T")[0];

  var url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${apiKey}`;

  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var labels = [];
      var values = [];

      for (var i = 0; i < data.results.length; i++) {
        var date = new Date(data.results[i].t);
        labels.push(date.toLocaleDateString());
        values.push(data.results[i].c); // closing price
      }

      drawChart(labels, values, symbol);
    })
    .catch(function(error) {
      console.log("Error getting stock data", error);
    });
}

// Draw the chart using Chart.js
function drawChart(labels, values, symbol) {
  var ctx = document.getElementById("stockChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: symbol + " Closing Price",
        data: values,
        borderColor: "#d63384",
        borderWidth: 2,
        fill: false
      }]
    }
  });
}

// Show Reddit top 5 stocks
window.onload = function() {
  fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var tableBody = document.querySelector("#redditTable tbody");

      for (var i = 0; i < 5; i++) {
        var stock = data[i];

        var row = document.createElement("tr");

        var linkCell = document.createElement("td");
        var link = document.createElement("a");
        link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        link.target = "_blank";
        link.innerText = stock.ticker;
        linkCell.appendChild(link);

        var commentCell = document.createElement("td");
        commentCell.innerText = stock.no_of_comments;

        var sentimentCell = document.createElement("td");
        if (stock.sentiment === "Bullish") {
          sentimentCell.innerText = "🐂 Bullish";
        } else {
          sentimentCell.innerText = "🐻 Bearish";
        }

        row.appendChild(linkCell);
        row.appendChild(commentCell);
        row.appendChild(sentimentCell);

        tableBody.appendChild(row);
      }
    });
};

// Voice command to lookup stock
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
      "lookup *symbol": function(symbol) {
        document.getElementById("ticker").value = symbol.toUpperCase();
        document.getElementById("days").value = "30";
        getStockData();
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
