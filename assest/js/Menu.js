export default class Menu {
    constructor() {
        this.container=document.getElementById("menu");
    }
    setGame(game){
        this.game=game;
    }
    show() {
        switch (this.game.state) {
            case 0:
                this.container.innerHTML = ` 
                <h2> BIEVENIDO</h2>
                <li id="start">Empezar</li>
                <li id="option">Opciones</li>`;
                
                this.setOnClick(["start","option"]);
                break;
            case 1:
                this.container.innerHTML = ` 
                <h2 class="score">Score: ${this.game.score}</h2>
                <li  id="start">Continuar</li>
                <li  id="reset">Reiniciar</li>
                <li id="option">Opciones</li>`;                
                this.setOnClick(["start","reset","option"]);
                break;
            case -1:
                this.container.innerHTML = `
                <h2>Perdiste</h2>
                <h2 class="score">Score: ${this.game.score}</h2>                
                <li id="start">Volver a intentar</li>
                <li id="option">Opciones</li>`;
                this.setOnClick(["start","option"]);
                break;
        }
        
        this.container.classList.remove("hide");
    }
    setOnClick(events){
        events.forEach(key => {
            document.getElementById(key).onclick=()=>this.game[key]();
        });
    }
    hide(){
        this.container.classList.add('hide')
    }
}