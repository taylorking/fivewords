var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jp = bodyparser.json();
var up = bodyparser.urlencoded({extended: false});

var words = {};


app.use('/', express.static('./public/submit'));
app.use('/results', express.static('./public/results'));

app.get('/data', function(req,res) {
  res.send(JSON.stringify(words));
});
app.get('/words', function(req, res) {
  return words;
});

app.get('/reset',  function(req, res) {
  words = {};
  res.sendStatus(200);
});
app.post('/submit', jp, function(req, res) {
  console.log(req.body);
  req.body.forEach(function(word) { 
    if(word in words) {
      words[word]++;
    } else {
      words[word] = 1;
    }
  });
   res.sendStatus(200);
});

app.listen(3000);
