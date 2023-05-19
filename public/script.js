
// Ian's Code
function createGrid() {
    for (i=0; i<2500; i++) {
        const div = document.createElement("div");
        const element = document.querySelector(".muralGrid");
        div.className = "div";
        element.appendChild(div);
    }
    const tiles = document.querySelectorAll('muralGrid div');
            Array.from(tiles).forEach(div => {
            div.addEventListener('click', tileClicked(div.id));
    })
}

function tileClicked(id) {

    const tile = document.getElementById("tile" + this.id);
    tile.style.backgroundColor = "black";
}

function promptInput() {
    const textInput = document.querySelector(".textInput");
    const blur = document.querySelector(".blur");
    blur.style.transform = "scaleX(1";
/*
    fetch( 'https://domain.com/path/?row=' + variable + '&param2' + variable + '&param2' + variable + '&param2' + variable + '&param2' + variable + '&param2' + variable + '&param2' + variable + '&param2' )
    .then( response => response.json() )
    .then( response => {
        // Do something with response.
    } );
*/
    fetch('/get')
    .then( response => response.json() )
    .then( response => {
        alert(response);
    } );

    let text = textInput.value;
    
}


function load() {
    createGrid();
}
load();