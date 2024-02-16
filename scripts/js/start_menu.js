
import MainBoard from "./main_board.js";

function render_help_page(element_id){
    document.getElementById(element_id).innerHTML = `
        <div class="help-container" id="help-container">
        <ol>
        <li>Each player takes turns making a move.</li>
        <li>When it’s your turn, you place your mark (either “X” or “O”) in one of the smaller boards.</li>
        <li>Your move guides your opponent to the corresponding mini-board on the larger grid.</li>
        <li>If you win a small board, it becomes yours on the larger grid.</li>
        <li>Beware of closed boards: If a mini-board is already won or tied, you cannot play there, you can play in any place</li>
        </ol>
        <button id="menu-button" class="my-button">menu</button>
      </div>
    `

    document.getElementById('menu-button').addEventListener('click',_=>{
        render_menu()
    })
}


function render_menu(element_id='root'){

    document.getElementById(element_id).innerHTML = `<div class="menu" id="menu">
      <img src="images/menu-img.jpg" alt="img">
      <div class="menu-buttons">
        <button class="play-button" id="play-button">Play</button>
        <button class="help-button" id="help-button">Help</button>
      </div>
    </div>`

    document.getElementById('play-button').addEventListener('click',_=>{
        render_xo()
    })

    document.getElementById('help-button').addEventListener('click',_=>{
        render_help_page(element_id)
    })
}

function render_xo(element_id='root'){
    document.getElementById(element_id).innerHTML = `<div class="container" id="container"></div><button id="menu-button" class="my-button">Menu</button>`
    let board = new MainBoard('container')
    document.getElementById('menu-button').addEventListener('click',_=> {
        render_menu()
    })

    function reset_game(e){
        e.stopPropagation();
        delete board[0];
        board = new MainBoard('container');
    }

    MainBoard.reset_game_func = reset_game
}


window.addEventListener('load',_=>{
    render_menu()
})