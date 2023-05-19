
// Ian's Code
var mural;
updateMural();
function updateMural() {
    fetch('/get') // get 2d array wth all values
        .then(response => response.json())
        .then(response => {
            mural = response;
        });
}

function createGrid() {
    for (i = 0; i < 2500; i++) {
        const div = document.createElement("div");
        const element = document.querySelector(".muralGrid");
        div.id = i;
        div.className = "div";
        element.appendChild(div);
        div.setAttribute("onclick", "selectTile(this)");
    }
}

async function promptInput() {
    const textInput = document.querySelector(".textInput");
    const wrapper = document.querySelector(".wrapper");
    wrapper.style.filter = "blur(5px)";
    // set tile
    await fetch('/get')
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });

    let text = textInput.value;

}


function load() {
    createGrid();
}
load();

// MORI's CODE
async function addImage() {
    // get the prompt from the input
    const prompt = document.querySelector("#input").value;
    // get the currently selected tile
    const selectedTile = document.querySelector(".selected");
    // get what child number the selected tile is
    const selectedTileNumber = selectedTile.id.slice(4);
    // get the row and column of the selected tile
    const row = Math.floor(selectedTileNumber / 50);
    const col = selectedTileNumber % 50;
    // post the prompt, row, and column to the server
    await fetch(`/set?prompt=${prompt}&row=${row}&col=${col}`)
    // update the mural
    updateMural();
}
function selectTile(elm) {
    // get all the tiles
    const tiles = document.querySelectorAll(".div");
    // remove the selected class from all the tiles
    tiles.forEach(tile => tile.classList.remove("selected"));
    // add the selected class to the clicked tile
    elm.classList.add("selected");
}