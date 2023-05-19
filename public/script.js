
// Ian's Code
function createGrid() {
    for (i=0; i<2500; i++) {
        const div = document.createElement("div");
        const element = document.querySelector(".muralGrid");
        div.className = "div";
        element.appendChild(div);
    }
}


function load() {
    createGrid();
}
load();