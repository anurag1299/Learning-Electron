console.log("I am child");

let request = require("request");
let c = 0;
request(
  "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
  function(err, responce, body) {
    let bodyJson = JSON.parse(body);
    let randomQuote = bodyJson[0]["content"].rendered;
    console.log(randomQuote);

    document.getElementById("quote").innerHTML = randomQuote;
  }
);

setInterval(function() {
  c++;
  request(
    "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
    function(err, responce, body) {
      let bodyJson = JSON.parse(body);
      let randomQuote = bodyJson[c]["content"].rendered;
      console.log(randomQuote);

      document.getElementById("quote").innerHTML = randomQuote;
    }
  );
}, 5000);
