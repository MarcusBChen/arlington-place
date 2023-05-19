var express = require('express')
var app = express()
app.use(express.static('public'))

require('dotenv').config();

const SimplDB = require('simpl.db');
const db = new SimplDB();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(configuration);

const Murals = db.createCollection('murals');

if (Murals.get(murals => murals.arlington) === null) {
  var mural = [...Array(20)].map(e => Array(20).fill([]));
  Murals.create({ arlington: mural });
}

app.get('/get', async (req, res) => {
  res.send(Murals.get(murals => murals.arlington).arlington);
})

app.get('/set', async (req, res) => {
  var args = req.query;
  const imageUrl = generateImage(args.prompt);
  setTile(args.row,args.col,args.name,imageUrl, userId);
})

async function generateImage (prompt) {
/*const response = await openai.createImage({
  prompt: prompt,
  n: 1,
  size: "1024x1024",
});
*/
return "https://image.com/123.png" //response.data.data[0].url;
}

function getTile(r, c, name) {
  return Murals.get(murals => murals.arlington).arlington[r][c]
}

function setTile(r, c, name, imageUrl, userId) {
  const tile = getTile(r,c)
  tile.name = name
  tile.userId = userId
  tile.imageUrl = imageUrl
}

app.listen(8080);