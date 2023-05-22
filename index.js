// server
var express = require('express')
var app = express()
app.use(express.static('public'))

// file system
const fs = require('fs');
require('dotenv').config();

// openai
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(configuration);


function getMural() {
  // using fs to read the file
  const data = fs.readFileSync('mural.json', 'utf8');
  // parse the data into a JavaScript object
  const mural = JSON.parse(data);
  // return the mural
  return mural;
}
function setMural(thing) {
  // convert the mural to a JSON string
  const data = JSON.stringify(thing);
  // write the data to the file
  fs.writeFileSync('mural.json', data);
}

app.get('/get', async (req, res) => {
  res.send(JSON.stringify(getMural()));
})

app.get('/set', async (req, res) => {
  var args = req.query;
  console.log(args)
  let imageUrl = "https://underminerstudios.com/wp-content/uploads/2018/03/Depositphotos_9750622_m-2015.jpg" //await generateImage(args.prompt);
  setTile(args.name, imageUrl, args.prompt, args.id);
  res.send(imageUrl);
})

async function generateImage(prompt) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  const url = await response.data.data[0].url;
  console.log(url)
  return url;
}

//console.log(generateImage("a happy community of people"))

function getTile(r, c, name) {
  return getMural()[r][c];
}

function setTile(name, imageUrl, prompt, id) {
  let mural = getMural();
  let tile = {};
  tile.name = name
  tile.imageUrl = imageUrl
  tile.prompt = prompt
  if(id && id < mural.length) mural[id] = tile;
  else mural.push(tile);
  setMural(mural);
}

app.listen(8080);