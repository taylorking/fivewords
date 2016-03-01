var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jp = bodyparser.json();
var up = bodyparser.urlencoded({extended: false});

var words = {};


app.get('/', express.static('./public/submit'));
app.get('/results', express.static('./public/results'));
app.get('/words', function(req, res) {
  return words;
});

app.post('/reset', up, function(req, res) {
  if(req.body.password == 'password') {
    words = {};
  }
});
app.post('/submit', jp, function(req, res) {
  console.log(req.body);
  req.body.foreach(function(word) { 
    if(word in words) {
      words[word]++;
    } else {
      words[word] = 1;
    }
  });
});

app.listen(3000);
