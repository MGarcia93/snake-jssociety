export default class Menu {
    constructor() {
        this.container = document.getElementById("menu");
    }
    setGame(game) {
        this.game = game;
    }
    show(type = "main") {
        this.container.className = "center";
        switch (type) {
            case 'main':
                this.container.innerHTML = ` 
                <h2> BIEVENIDO</h2>
                <li id="start">Empezar</li>
                <li id="option">Opciones</li>`;
                this.setOnClick(["start", "option"]);
                this.container.classList.add("main");
                break;
            case 'pause':
                this.container.innerHTML = ` 
                <h2 class="score">Score: ${this.game.score}</h2>
                <li  id="start">Continuar</li>
                <li  id="reset">Reiniciar</li>
                <li id="option">Opciones</li>`;
                this.setOnClick(["start", "reset"]);
                this.container.classList.add("pause");
                break;
            case 'lose':
                this.container.innerHTML = `
                <h2>Fin del Juego</h2>
                <li class="score">Tu puntaje: ${this.game.score}</li>                
                <li id="start">Volver a intentar</li>
                `;
                this.setOnClick(["start"]);
                this.container.classList.add("loser");
                break;
            case 'difficulty':
                this.createSelectDifuculty();
                break;

        }
        this.container.classList.remove('hide');
    }
    setOnClick(events) {
        events.forEach(key => {
            document.getElementById(key).onclick = () => this.game[key]();
        });
    }
    createSelectDifuculty() {
        const description = (level) => {
            const param = Config.difficultys[level];
            let desc = "Modo ";
            desc += param.speed >= 100 ? " con velocidad lenta" : (param.speed > 50 ? "con velocidad rapida" : "con velocidad extrema");
            desc += param.limit ? ", con colicion en los limites de la pantalla " : ", sin coliciones con los limites cuando llegas a estos la cabeza se teleporta al otro limite ";
            desc += param.quantityTrap > 0 ? `y cada ${param.intervalTrap} comida se pone ${param.quantityTrap} trampa en algun lado aletorio del mapa` : "";
            return desc;
        }
        this.container.innerHTML = `
            <h2>Elija la dificulta</h2>
            <div class="selection">
                <li class="btn btn-difficulty" data-difficulty="1" data-bs-toggle="tooltip" data-bs-placement="right" title="${description(1)}"> Facil</a>
                <li class="btn btn-difficulty" data-difficulty="2" data-bs-toggle="tooltip" data-bs-placement="right" title="${description(2)}"> Normal</a>
                <li class="btn btn-difficulty" data-difficulty="3" data-bs-toggle="tooltip" data-bs-placement="right" title="${description(3)}"> Dificil</a>
            </div>
            <div class="description hide">
            </div>
            <button class="btn" id="selection">Elegir</button>
        `;
        this.container.querySelectorAll(".btn").forEach((element) => {
            element.onclick = () => {
                if(this.container.querySelector(".btn.selected"))
                    this.container.querySelector(".btn.selected").classList.remove("selected");
                element.classList.add("selected");
                this.container.querySelector(".description").innerHTML = description(element.getAttribute("data-difficulty"));
                this.container.querySelector(".description").classList.remove('hide');
                this.game.setDifficulty(element.getAttribute("data-difficulty"));
            }
        });
        this.container.querySelector("#selection").onclick = () => {
            this.game.start();
            this.hide();
        }
        this.container.querySelector('[data-difficulty="1"]').click();
        this.container.classList.add("difficulty");
    }
    hide() {
        this.container.classList.add('hide')
    }
}