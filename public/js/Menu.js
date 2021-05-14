import Select from './Select.js';
export default class Menu {
    constructor() {
        this.container = document.getElementById("menu")
        this.body = document.querySelector(".bodyMenu");
    }
    setGame(game) {
        this.game = game;
    }
    show(type = "main") {
        this.container.className = "center";
        switch (type) {
            case 'main':
                this.body.innerHTML = ` 
                <h2> BIEVENIDO</h2>
                <li id="start">Empezar</li>
                <li id="options">Opciones</li>
                <li id="help">Ayuda</li>`;
                this.setOnClick(["start", "help", "options"]);
                this.body.classList.add("main");
                break;
            case 'pause':
                this.body.innerHTML = ` 
                <h2 class="score">Score: ${this.game.score}</h2>
                <li  id="start">Continuar</li>
                <li  id="reset">Reiniciar</li>                
                <li id="options">Opciones</li>
                <li id="help">Ayuda</li>`;
                this.setOnClick(["start", "reset", "help", "options"]);
                this.body.classList.add("pause");
                break;
            case 'lose':
                this.body.innerHTML = `
                <h2>Fin del Juego</h2>
                <li id="start">Volver a intentar</li>                
                <li id="options">Opciones</li>
                <li id="help">Ayuda</li>
                <span class="score">ppuntaje: ${this.game.score}</span>`;
                this.setOnClick(["start", "help", "options"]);
                this.body.classList.add("loser");
                break;
            case 'help':
                this.createHelp();
                break;
            case 'options':
                this.createOptions();
                break;

        }
        this.body.classList.remove('hide');
    }
    setOnClick(events) {
        events.forEach(key => {
            if (this.game[key]) {
                document.getElementById(key).onclick = () => this.game[key]();
            } else {
                document.getElementById(key).onclick = () => this[key]();
            }
        });
    }
    createSelectDifuculty() {
        let container = document.createElement("div");
        const description = (level) => {
            const param = Config.difficultys[level];
            let desc = "Modo ";
            desc += param.speed >= 100 ? " con velocidad lenta" : (param.speed > 50 ? "con velocidad rapida" : "con velocidad extrema");
            desc += param.limit ? ", con colicion en los limites de la pantalla " : ", sin coliciones con los limites cuando llegas a estos la cabeza se teleporta al otro limite ";
            desc += param.quantityTrap > 0 ? `y cada ${param.intervalTrap} comida se pone ${param.quantityTrap} trampa en algun lado aletorio del mapa` : "";
            return desc;
        }
        const select = new Select("Dificultad", {
            0: {
                attributes: {
                    difficulty: 1
                },
                label: "Facil"
            },
            1: {
                attributes: {
                    difficulty: 2
                },
                label: "Normal"
            },
            2: {
                attributes: {
                    difficulty: 3
                },
                label: "Dificil"
            }
        })


        container.appendChild(select.getElement());
        let divDescription = document.createElement("div");
        divDescription.className = "description hide";

        container.appendChild(divDescription);
        select.onClick((element) => {
            const difficulty = element.getAttribute("difficulty");
            this.game.setDifficulty(difficulty);
            container.querySelector(".description").innerHTML = description(difficulty);
            container.querySelector(".description").classList.remove('hide');
        });
        select.setSelect(this.game.getDifficulty().index - 1);
        container.classList.add("difficulty");
        return container;
    }
    createSelectMap() {
        let container = document.createElement("div");
        let maps = {};
        for (let key in Config.maps) {
            maps[key] = {
                attributes: {
                    map: key
                },
                label: Config.maps[key].label
            }
        };
        const select = new Select("Mapas", maps);
        container.appendChild(select.getElement());
        let divDescription = document.createElement("div");
        divDescription.className = "description hide";

        container.appendChild(divDescription);
        select.onClick((element) => {
            const map = element.getAttribute("map");
            this.game.setMap(map);
            //container.querySelector(".description").classList.remove('hide');
        });
        select.setSelect(this.game.getMap() - 1);
        container.classList.add("map");
        return container;
    }
    createOptions() {
        this.body.innerHTML = '';
        this.body.appendChild(this.createSelectDifuculty());
        this.body.appendChild(this.createSelectMap());
        let btn = document.createElement("li");
        btn.id = "back";
        btn.innerText = "Volver";
        btn.onclick = () => this.show("main");
        this.body.appendChild(btn);
    }
    createHelp() {
        this.body.innerHTML = `
            <div class="description">
                <h2>Historia</h2>
                Eres una vivorita que tendras que cazar conejos dentro de un corral para sobrevivir y crecer. Esto lo tendras que realizar sin salirte del corral, 
                esquivando las trampas que te pongan para atraparte y sin morderte a vos mismo ya que eres tan veneso que ni tu sobrevives al veneno
            </div>
            <div class="description no-mobile">
             <h2>Controles</h2>
             <p>A/←: cambiar direcccion para la izquierda</p>
             <p>W/↑: cambiar direcccion para arriba</p>
             <p>D/→: cambiar direcccion para la derecha</p>
             <p>S/↓: cambiar direcccion para abajo</p>
             <p>esc: Pausar</p>
            </div>
            <li id="back" >Volver</li>
        `;
        this.body.querySelector("#back").onclick = () => {
            this.show("main")
        };
    }
    help() {
        this.show('help');
    }
    hide() {
        this.container.classList.add('hide');
    }

}