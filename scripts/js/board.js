"use strict";
class Board {
    static obj_number;
    static last_index;
    static x_turn;
    constructor(dir_id_to_render) {
        Board.obj_number++;
        this.dir_id_to_render = dir_id_to_render;
        this.buttons = new Array(9);
        this.win1=-1;
        this.win2=-1;
        this.win3=-1;
        this.is_winning=false;
        this.winner='';
        for (let i = 0; i < 9; i++) {
            if (this.buttons) {
                (this.buttons)[i] = -1;
            }
        }
        this.n_move = 0;
        this.layout=false;
        this.render_to_html();
    }
    button_click(ind) {
        if (this.buttons[ind] === -1 && this.win1===-1) {
            this.buttons[ind] = +Board.x_turn;
            Board.x_turn = !Board.x_turn;
            this.n_move++;
            this.check_winning()
            this.render_to_html();
            Board.last_index= ind;
        }
    }

    add_wins(b1,b2,b3){
        this.win1=b1;
        this.win2=b2;
        this.win3=b3;
    }
    check_winning(){
        let b;
        if(this.buttons[0] === this.buttons[1] && this.buttons[0] === this.buttons[2] && this.buttons[2] !==-1){
            this.add_wins(0,1,2)
            b=true;
        }else if(this.buttons[3] === this.buttons[4] && this.buttons[3] === this.buttons[5] &&this.buttons[5] !==-1){
            b=true;
            this.add_wins(3,4,5)
        }else if(this.buttons[6] === this.buttons[7] && this.buttons[6] === this.buttons[8] &&this.buttons[8]!==-1){
            b=true;
            this.add_wins(6,7,8)
        }
        else if(this.buttons[0] === this.buttons[3] && this.buttons[0] === this.buttons[6]&& this.buttons[6]!==-1){
            b=true;
            this.add_wins(0,3,6)
        }else if(this.buttons[1] === this.buttons[4] && this.buttons[1] === this.buttons[7]&&this.buttons[7] !==-1){
            b=true;
            this.add_wins(1,4,7)
        }else if(this.buttons[2] === this.buttons[5] && this.buttons[2] === this.buttons[8]&& this.buttons[8]!==-1){
            b=true;
            this.add_wins(2,5,8)
        }
        else if(this.buttons[0] === this.buttons[4] && this.buttons[0] === this.buttons[8]&& this.buttons[8] !==-1){
            b=true;
            this.add_wins(0,4,8)
        }else if(this.buttons[2] === this.buttons[4] && this.buttons[2] === this.buttons[6]&& this.buttons[6]!==-1){
            b=true;
            this.add_wins(2,4,6)

        }
        else if(this.n_move === 9 && !this.is_winning){
            this.add_layout()
        }

        if(b){
            this.is_winning =true;
            this.winner = Board.x_turn ? 'x' : 'o';
            this.add_layout()

        }

    }

    renderSymbol(index) {
        return this.buttons[index] > -1 ? (this.buttons[index] === 0 ? 'X' : 'O') : '';
    }


    add_layout(){
        this.layout = true;
        this.render_to_html()
    }
    remove_layout(){
        this.layout = false;
        this.render_to_html()
    }

    render_to_html() {
        let html = '';
        for (let i =0;i<9;i++) {
            html += `<div name="${Board.obj_number+'-'+i}" class="cell ${i === this.win1 || i === this.win2 || i === this.win3 ? "win" : ""}">${this.renderSymbol(i)}</div>`;
        }
        let lay='';
        if(this.layout){
            let lay = `<div class="layout"><h3>`
            if(this.is_winning){
                lay+= `${this.winner}`
            }else if(this.n_move ===9){
                lay+=""
            }
            lay+='</h3></div>'
            html+=lay;
        }


        const el = document.getElementById(this.dir_id_to_render);

        if (el != null) {
            el.innerHTML = html;

            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('cell')) {
                    this.button_click(parseInt(e.target.getAttribute('name').slice(-1)));
                }
            });


            el.addEventListener('mousedown' ,e=>{
                if (e.target.classList.contains('cell')) {
                    e.target.classList.toggle("cell-focus");
                }
            })
            el.addEventListener('mouseup' ,e=>{
                if (e.target.classList.contains('cell')) {
                    e.target.classList.toggle("cell-focus");
                }
            })

        }
    }
}

Board.obj_number =0;

/*
*   Board{
*       is_winning => true,false
*       winner => 'x', 'o'
*       n_move => number ov moves
*       add_layout => to add layout
*       remove_layout => to remove layout
*       render_to_html => to rerender the html
*   }
*
*
* */




export default  Board;
