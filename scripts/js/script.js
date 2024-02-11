"use strict";
import MainBoard from "./main_board.js";

let board = [];
board[0] = new MainBoard('container')

function reset_game(e){
    e.stopPropagation();
    delete board[0];
    board[0] = new MainBoard('container');
}

MainBoard.reset_game_func = reset_game