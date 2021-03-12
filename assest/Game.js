function pos(x, y) {
    let rta = {
        x: x || 0,
        y: y || 0
    };
    return rta;
}

/*Clase que se encarga del manejo del juego */
function Game() {};

/*metodo que se encarga de interpetlar la tecla apretada y reliza la opcion si es valida */
Game.prototype = {

    presskey: function (e) {

        switch (e.key) {
            case 'a':
            case 'A':
            case 'ArrowLeft':
                this.changeDirecction(-this.tam, 0)
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                this.changeDirecction(this.tam, 0)
                break;
            case 'W':
            case 'W':
            case 'ArrowUp':
                this.changeDirecction(0, -this.tam);
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                this.changeDirecction(0, this.tam);
                break;
            case 'Escape':
                this.pressEscape();
                break;

        }
    },
    pressEscape: function(){
        if(this.state==0){
            this.start();
        }else if(this.state==1){
            this.pause();
        }
    },
    /*cambia la direccion en que se mueve la vivora*/
    changeDirecction: function (x, y) {
        if (this.snake.length == 1 || this.snake[0].x + x != this.snake[1].x || this.snake[0].y - y != this.snake[1].y) {
            this.direction = pos(x, y);
        }

    },
    /* pausa el juego */
    pause: function () {
        this.state = 0;
        this.showMenu();
    },
    /* resetea el juego*/
    reset: function () {
        this.init();
        this.start();
    },
    /* iniciliza en  todas las varibles*/
    init: function () {
        this.state = 0;
        this.score = 0;
        
        this.snake = [];
        this.snake.push(pos(parseInt(this.width / 2), parseInt(this.height / 2)));
        this.direction = pos();
        this.food = null;
        this.time = 200;
    },

    /*inicia el juego */
    start: function () {
        if (this.state == -1) {
            this.init();
        }
        this.hideMenu();
        this.state = 1;
        this.run();
    },

    /*ejecutador del juego */
    run: function () {
        
        if (this.state == 1) {
            let newPart = null;
            this.createFood();
            if (this.eated()) {
                newPart = this.generateNewPart();
            }
            this.move();
            if (newPart) {
                this.addPart(newPart);
            }
            if (this.crashed()) {
                this.loser();
            }
            this.draw();
            setTimeout(() => this.run(), this.time);
        }        
        document.querySelectorAll(".score").forEach(element=>element.innerHTML = "Score: " + this.score);
    },
    /*metodo de cuando pierde el juego*/
    loser: function () {
        this.state = -1;
        this.showMenu();
    },
    /*mueve la vivora */
    move: function () {
        for (let i = this.snake.length - 1; i > 0; i--) {
            this.snake[i].x = this.snake[i - 1].x;
            this.snake[i].y = this.snake[i - 1].y;
        }
        this.snake[0].x += this.direction.x;
        this.snake[0].y += this.direction.y;
    },
    /* dibuja la pantalla*/
    draw: function () {
        this.screen = this.canvas.getContext("2d");
        this.screen.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.screen.save();
        if (this.food) {
            this.screen.beginPath();            
            this.screen.fillStyle = 'white';
            this.screen.fillRect(this.food.x, this.food.y, this.tam, this.tam);
            this.screen.restore();
        }
        this.snake.forEach(element => {
            this.screen.save();
            this.screen.beginPath();            
            this.screen.fillStyle = '#1b6f1b';
            this.screen.fillRect(element.x, element.y, this.tam, this.tam);
            this.screen.restore();
        });
        

    },
    /*verifica si colisiono la vivora con alguna parte de su cuerpo*/
    crashed: function () {
        let head = this.snake[0];
        if (head.x < 0 || head.x > this.width - this.tam || head.y < 0 || head.y > this.height - this.tam) {
            return true;
        }
        let aux = this.snake.slice(1, this.length);
        if (aux.findIndex(element => element.x == head.x && element.y == head.y) != -1) {
            return true;
        }
        return false;
    },
    /*genera una parte del cuerpo nueva para agregarla despues */
    generateNewPart: function () {
        return pos(this.snake[this.snake.length - 1].x, this.snake[this.snake.length - 1].y);
    },
    /*aggrega una parte a la vivora */
    addPart: function (part) {
        this.snake.push(part);
    },
    /*crea la comida */
    createFood: function () {
        let count = 0;
        while (!this.food && count < 10000) {
            let x = parseInt(Math.random() * (this.width - this.tam));
            let y = parseInt(Math.random() * (this.height - this.tam));
            let food = pos(x - (x % 10), y - (y % 10));

            if (this.snake.findIndex(element => element.x == food.x && element.y == food.y) == -1) {
                this.food = food;
            }
            count++;

        }

    },

    /*verifica si consumio la comida */
    eated: function () {
        let head = this.snake[0];
        /*if (((head.x <= this.food.x + this.tam && head.x >= this.food.x) || (head.x + this.tam >= this.food.x && head.x + this.tam <= this.food.x + this.tam)) &&
            ((head.y <= this.food.y + this.tam && head.y >= this.food.y) || (head.y + this.tam <= this.food.y && head.y + this.tam >= this.food.y))) {*/
        if (head.x == this.food.x && head.y == this.food.y) {
            this.food = null;
            this.score++;
            return true;
        }
        return false;
    },
    /*muestra el menu de pendiendo de si perdio o pauso muestra distinto mensaje */
    showMenu: function () {
        this.menu.classList.remove("hide");
        if (this.state == -1) {
            this.menu.classList.add("loser");
            this.menu.querySelector("#start").innerHTML = "Volver a intentar";
        } else {
            this.menu.querySelector("#start").innerHTML = "Continuar";
            this.menu.classList.remove("loser");
        }
        
    },
    hideMenu: function () {
        this.canvas.classList.remove('hide');
        this.menu.classList.add("hide");
    },

    constructor: function (width,height,tam) {
        this.canvas = document.getElementById("screen");
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.tam = tam; //tamaño de la parte del cuerpo;
        this.init();        
        this.screen = this.canvas.getContext("2d");
        this.menu = document.getElementById("menu");
        document.addEventListener("keyup", (e) => this.presskey(e));

    }
};