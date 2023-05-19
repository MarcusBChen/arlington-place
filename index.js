var express = require('express')
var app = express()
app.use(express.static('public'))

const SimplDB = require('simpl.db');
const db = new SimplDB();

const Murals = db.createCollection('murals');

if(Murals.get(arlington => arlington) === null) {
  var mural = [...Array(20)].map(e => Array(20).fill(null));
  Murals.create({ arlington: mural});
}

console.log(getTile(0,0))

app.get('/submit', (req, res) => {
  var params = req.query;
  res.send(params.prompt);
  db.set();
})

function getTile(r, c) {
  return Murals.get(arlington => arlington).arlington[r][c]
}

function getPrompt() {
  var prompt = document.getElementById('input').value // probably doesnt work
}

app.listen(3000);