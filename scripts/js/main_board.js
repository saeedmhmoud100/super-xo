import Board from "./board.js";

class MainBoard{
    static reset_game_func;

    constructor(root_element_id) {
        Board.x_turn = false;
        this.winner = '';
        this.draw = false;
        this.boards = []
        this.render_board_html(root_element_id)
        for (let i = 0; i < 9; i++) {
            this.boards.push(new Board('board-' + i))
        }
        this.layout =false;
        this.root_element_id=root_element_id;


        document.getElementById(root_element_id).addEventListener('click',e=>{

            if(e.target.classList.contains("cell")){
                let all =false;
                if(this.winner === ''){

                    this.boards.map((e,i) => {
                        if(!all && i===Board.last_index){
                            if(e.is_winning || e.n_move===9){
                                all = true
                            }
                            else
                                e.remove_layout()
                        }else{
                            e.add_layout()
                        }
                    })
                }

                if(all){
                    this.boards.map(e => {
                        if(!e.is_winning){
                            e.remove_layout()
                        }
                    })
                }
                this.check_winning();
            }

        })
    }


    render_board_html(root=this.root_element_id){
        let html ='<div class="lines"></div>'
        for (let i = 0; i < 9; i++) {
            html += `<div id="board-${i}"></div>`
        }

        document.getElementById(root).innerHTML = html;
    }

    add_wins(){
        this.winner = Board.x_turn ? 'x' : 'o';
    }

    add_layout(){
        if(!this.layout){
            this.layout = true;
            if(this.winner)
                document.getElementById(this.root_element_id).innerHTML +=(`<div id="main_layout" class="layout"><h3>winner is ${this.winner}${'\n'}<button id="play_again_button">play again</button></h3></div>`)
            else if(this.draw)
                document.getElementById(this.root_element_id).innerHTML +=(`<div id="main_layout" class="layout"><h3>no one wins${'\n'}<button id="play_again_button" >play again</button></h3></div>`)

            document.getElementById("play_again_button").addEventListener('click',MainBoard.reset_game_func)
        }
    }

    check_winning(){
        let b;
        if(this.boards[0].winner === this.boards[1].winner && this.boards[0].winner === this.boards[2].winner && this.boards[2].winner !==''){
            this.add_wins(0,1,2)
            b=true;
        }else if(this.boards[3].winner === this.boards[4].winner && this.boards[3].winner === this.boards[5].winner &&this.boards[5].winner !==''){
            b=true;
            this.add_wins(3,4,5)
        }else if(this.boards[6].winner === this.boards[7].winner && this.boards[6].winner === this.boards[8].winner &&this.boards[8].winner!==''){
            b=true;
            this.add_wins(6,7,8)
        }
        else if(this.boards[0].winner === this.boards[3].winner && this.boards[0].winner === this.boards[6].winner&& this.boards[6].winner!==''){
            b=true;
            this.add_wins(0,3,6)
        }else if(this.boards[1].winner === this.boards[4].winner && this.boards[1].winner === this.boards[7].winner&&this.boards[7].winner !==''){
            b=true;
            this.add_wins(1,4,7)
        }else if(this.boards[2].winner === this.boards[5].winner && this.boards[2].winner === this.boards[8].winner&& this.boards[8].winner!==''){
            b=true;
            this.add_wins(2,5,8)
        }
        else if(this.boards[0].winner === this.boards[4].winner && this.boards[0].winner === this.boards[8].winner&& this.boards[8].winner !==''){
            b=true;
            this.add_wins(0,4,8)
        }else if(this.boards[2].winner === this.boards[4].winner && this.boards[2].winner === this.boards[6].winner&& this.boards[6].winner!==''){
            b=true;
            this.add_wins(2,4,6)
        }

        if(b){
            this.add_layout()
        }
    }

}
export default MainBoard