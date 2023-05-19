var mural;
function updateMural() {
    fetch('/get') // get 2d array wth all values
        .then(response => response.json())
        .then(response => {
            mural = response;
            console.log(mural);
            for (i = 0; i < 10; i++) {
                for(k = 0; k < 10; k++) {
                    let div = document.querySelector(`[data-id="${i * 10 + k}"]`);
                    div.style.backgroundImage = mural[i][k].imageUrl;
                }
            }
        });
}

function createGrid() {
    for (i = 0; i < 100; i++) {
        const div = document.createElement("div");
        const element = document.querySelector(".muralGrid");
        div.setAttribute("data-id", i);
        if (i == 0) div.classList.add("selected");
        div.classList = "div";
        element.appendChild(div);
        div.setAttribute("onclick", "selectTile(this)");
    }
    updateMural();
}


function load() {
    createGrid();
}
load();

// MORI's CODE
async function addImage() {
    // get the prompt from the input
    const prompt = document.querySelector("#input").value;
    // get the row and column of the selected tile
    let { row, col } = getSelectedRC();
    // post the prompt, name and id to the server
    let img = await fetch(`/set?prompt=${prompt}&name=${"John"}&id=${"206027"}&elm=${document.querySelector(".selected").getAttribute("data-id")}`)
    img  = await img.text()
    // update the mural
    // change the selected tile to the image retruned
    const selectedTile = document.querySelector(".selected");
    selectedTile.style.backgroundImage = `url(${img})`;
    //updateMural();
}
function getSelectedRC() {
    // get the currently selected tile
    const selectedTile = document.querySelector(".selected");
    // get what child number the selected tile is
    const selectedTileNumber = selectedTile.getAttribute("data-id");
    // get the row and column of the selected tile
    const row = Math.floor(selectedTileNumber / 10);
    const col = selectedTileNumber % 10;
    return { row, col };
}
function selectTile(elm) {
    // get all the tiles
    const tiles = document.querySelectorAll(".div");
    // remove the selected class from all the tiles
    tiles.forEach(tile => tile.classList.remove("selected"));
    // add the selected class to the clicked tile
    elm.classList.add("selected");
}