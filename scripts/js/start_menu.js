
import MainBoard from "./main_board.js";




function render_menu(element_id='root'){

    document.getElementById(element_id).innerHTML = `<div class="menu" id="menu">
      <img src="images/menu-img.jpg" alt="img">
      <div class="menu-buttons">
        <button class="play-button" id="play-button">Play</button>
        <button class="help-button">Help</button>
      </div>
    </div>`
    document.getElementById('play-button').addEventListener('click',_=>{
        render_xo()
    })
}

function render_xo(element_id='root'){
    document.getElementById(element_id).innerHTML = `<div class="container" id="container"></div><button class="my-button">Menu</button>`
    let board = new MainBoard('container')


    function reset_game(e){
        e.stopPropagation();
        delete board[0];
        board = new MainBoard('container');
    }

    MainBoard.reset_game_func = reset_game
}


window.addEventListener('load',_=>{
    console.log('s')
    render_menu()
})