/*
Author - Ivaylo Lafchiev (2090886)
Entry point to web application
*/

var express = require('express')
var app = express()

console.log("LOOL");

app.use(express.static('public'))
app.use(express.static('/'))
app.get('/', function (req, res) {
  //res.redirect('/staticFile.html');
  res.sendFile("index.html", {root: './public'});
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})