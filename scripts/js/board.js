"use strict";
class Board {
    static obj_number;
    constructor(dir_id_to_render) {
        Board.obj_number++;
        this.dir_id_to_render = dir_id_to_render;
        this.buttons = new Array(9);
        this.win1=-1;
        this.win2=-1;
        this.win3=-1;
        for (let i = 0; i < 9; i++) {
            if (this.buttons) {
                (this.buttons)[i] = -1;
            }
        }
        this.x_turn = true;
        this.n_move = 0;
        this.render_to_html();
    }
    button_click(ind) {
        if (this.buttons[ind] === -1 && this.win1===-1) {
            this.buttons[ind] = +this.x_turn;
            this.x_turn = !this.x_turn;
            this.n_move++;
            this.check_winning()
            this.render_to_html();
        }

    }

    add_wins(b1,b2,b3){
        this.win1=b1;
        this.win2=b2;
        this.win3=b3;
    }
    check_winning(){
        if(this.buttons[0] === this.buttons[1] && this.buttons[0] === this.buttons[2] && this.buttons[2] !==-1){
            this.add_wins(0,1,2)
        }else if(this.buttons[3] === this.buttons[4] && this.buttons[3] === this.buttons[5] &&this.buttons[5] !==-1){
            this.add_wins(3,4,5)
        }else if(this.buttons[6] === this.buttons[7] && this.buttons[6] === this.buttons[8] &&this.buttons[8]!==-1){
            this.add_wins(6,7,8)
        }else if(this.buttons[0] === this.buttons[3] && this.buttons[0] === this.buttons[6]&& this.buttons[6]!==-1){
            this.add_wins(0,3,6)
        }else if(this.buttons[1] === this.buttons[4] && this.buttons[1] === this.buttons[7]&&this.buttons[7] !==-1){
            this.add_wins(1,4,7)
        }else if(this.buttons[2] === this.buttons[5] && this.buttons[2] === this.buttons[8]&& this.buttons[8]!==-1){
            this.add_wins(2,5,8)
        }else if(this.buttons[1] === this.buttons[4] && this.buttons[1] === this.buttons[8]&& this.buttons[8] !==-1){
            this.add_wins(1,4,8)
        }else if(this.buttons[2] === this.buttons[4] && this.buttons[2] === this.buttons[6]&& this.buttons[6]!==-1){
            this.add_wins(2,4,6)
        }else if(this.n_move === 9){
            for (let i =0;i<9;i++){
                this.buttons[i] =-1;
            }
        }
    }

    renderSymbol(index) {
        return this.buttons[index] > -1 ? (this.buttons[index] === 0 ? 'X' : 'O') : '';
    }


    render_to_html() {
        let html = '';
        for (let i =0;i<9;i++) {
            html += `<div name="${Board.obj_number+'-'+i}" class="cell ${i === this.win1 || i === this.win2 || i === this.win3 ? "win" : ""}">${this.renderSymbol(i)}</div>`;
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
export default  Board;
