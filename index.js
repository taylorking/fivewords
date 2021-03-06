var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jp = bodyparser.json();
var up = bodyparser.urlencoded({extended: false});
var auth = require('http-auth');

var words = {};
var submitted = 0;

app.use('/', express.static('./public/submit'));
app.use('/results', express.static('./public/results'));

app.get('/data', function(req,res) {
  res.send(JSON.stringify({results: words, count: submitted}));
});
app.get('/words', function(req, res) {
  return {result: words, count: submitted};
});

var basic = auth.basic({
        realm: "Web."
    }, function (username, password, callback) { // Custom authentication method.
        callback(username === "wilkes" && password === process.env.PW);
    }
);



app.get('/reset',  auth.connect(basic), function(req, res) {
  words = {};
  submitted = 0;
  res.sendStatus(200);
});
app.post('/submit', jp, function(req, res) {
  console.log(req.body);
  submitted++;
  req.body.forEach(function(word) { 
    word = word.toLowerCase();
    if(word in words) {
      words[word]++;
    } else {
      words[word] = 1;
    }
  });
   res.sendStatus(200);
});

app.listen(80);
