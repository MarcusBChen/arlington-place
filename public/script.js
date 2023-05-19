
// Ian's Code
function createGrid() {
    for (i=0; i<2500; i++) {
        const div = document.createElement("div");
        const element = document.querySelector(".muralGrid");
        div.className = "div";
        element.appendChild(div);
    }
}

function promptInput() {
    const textInput = document.querySelector(".textInput");
    const blur = document.querySelector(".blur");
    blur.style.transform = "scaleX(1";
    let text = textInput.value;

}


function load() {
    createGrid();
}
load();