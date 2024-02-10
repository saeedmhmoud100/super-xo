

export default class Board{
    private buttons: (1 | 0 | -1)[];
    x_turn:boolean;
    n_move:number;
    constructor(private dir_id_to_render:string) {
        this.buttons = new Array(9);
        for (let i = 0; i < 9; i++) {
            if (this.buttons) {
                (this.buttons)[i] = -1;
            }
        }
        this.x_turn=true;
        this.n_move=0;
        this.render_to_html()
    }

    button_click(ind:number){
        // @ts-ignore
        if(this.buttons[ind] === -1){
        // @ts-ignore
            this.buttons[ind] = +this.x_turn;
            this.x_turn=!this.x_turn;
            this.n_move++;
            this.render_to_html()
        }
    }



    render_to_html():void{
        let html='';
        for (const buttonVal in this.buttons) {
            html+=`<div name="${buttonVal}" class="cell" onclick="button_click(${buttonVal})">${this.buttons[buttonVal]>-1 ? (this.buttons[buttonVal]==0 ?'X' : 'O') : null}</div>`
        }
        const el = document.getElementById(this.dir_id_to_render);
        if(el !=null){
            el.innerHTML=html;
        }
    }
}

