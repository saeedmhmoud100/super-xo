import Board from "./board";



window.addEventListener('load',_=>{
    const board1 = new Board('container');

})

function cell_focus(e:any){
    e.target.classList.toggle("cell-focus")
}


for (let elementsByClassNameElement of document.getElementsByClassName('cell')) {
    elementsByClassNameElement.addEventListener('mousedown',cell_focus)
    elementsByClassNameElement.addEventListener('mouseup',cell_focus)
}