import Snake from './Snake.js';
import Screen from './Screen.js';
import Block from './Block.js';
import Countdown from './Countdown.js';
export default class Game {

    constructor() {
        if (this.isMobile()) {
            const mobile = {
                width: parseInt((window.screen.width) / Config.tam) * Config.tam - Config.tam,
                height: parseInt(window.screen.height / 2 / Config.tam) * Config.tam
            }
            this.screen = new Screen(mobile.width, mobile.height);
            this.createControls();
        } else {
            this.screen = new Screen(Config.dimensions.width, Config.dimensions.height);
            document.getElementsByTagName("body")[0].style.maxWidth = Config.dimensions.width + "px";
            document.addEventListener("keydown", (e) => this.onPress(e.key));
        }
        this.snake = new Snake();
        this.tam = Config.tam;
        this.init();
        this.map = 1;
        this.setDifficulty(1);
        this.color = {
            snake: "#1b6f1b",
            food: "white",
            trap: "#333"
        }
    }
    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    setMenu(menu) {
        this.menu = menu;
    }
    setDifficulty(difficulty) {
        this.difficulty = Config.difficultys[parseInt(difficulty)];
        this.difficulty.index = parseInt(difficulty);
        this.screen.updateBorder(this.difficulty.limit);
        this.speed = this.difficulty.speed;
        this.init();
    }
    setMap(map) {
        this.trap = [];
        let blocks = Config.maps[parseInt(map)].blocks;
        for (let key in blocks) {
            this.trap.push(new Block(blocks[key].x, blocks[key].y, this.tam));
        };
        this.map = map;
    }
    getMap() {
        return this.map;
    }
    init() {
        const {
            width,
            height
        } = this.screen.getLimit();
        this.state = 0;
        this.score = 0;
        this.snake.clear();
        this.snake.addPart(new Block(parseInt(width / 2 / this.tam) * this.tam, parseInt(height / 2 / this.tam) * this.tam, this.tam));
        this.direction = this.getRandonDirection();
        this.trap = [];
        this.screen.clear();

    }
    start() {
        if (this.state == -1) {
            this.init();
        }
        this.menu.hide();
        this.screen.changeActionLegend("mostar");
        this.updateScore();
        this.screen.show();
        if (this.isMobile()) {
            this.controls.classList.remove("hide");
        }
        this.state = 1;
        const countdown = new Countdown(3);
        countdown.show(() => this.run());


    }
    showMenu(action) {
        this.menu.hide();
        this.menu.show(action);
        this.screen.changeActionLegend("ocultar");
    }
    pause() {

        this.showMenu('pause');
        this.state = 0;
    }
    reset() {
        this.init();
        this.start();
    }
    pressEscape() {
        if (this.state == 0) {
            this.start();
        } else if (this.state == 1) {
            this.pause();
        }
    }
    options() {
        this.showMenu("options");
    }
    help() {
        this.showMenu("help");
    }
    createControls() {
        this.controls = document.getElementById("controls");
        this.controls.querySelectorAll('[data-key]').forEach((element) => {
            element.onclick = () => this.onPress(element.getAttribute("data-key"))
        })
    }
    onPress(key) {
        switch (key) {
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
    }


    changeDirecction(x, y) {
        if (this.snake.isCanMove(x, y)) {
            this.direction.x = x;
            this.direction.y = y;
        }
    }

    getRandonDirection() {
        let direction = [0, 0];
        direction[parseInt(Math.random() * 2)] = (parseInt(Math.random() * 2) ? -1 : 1) * this.tam;
        return new Block(direction[0], direction[1], this.tam);
    }
    getDifficulty() {
        return this.difficulty;
    }
    run() {
        if (this.state == 1) {

            let newPart = null;
            this.createFood();
            if (this.eated()) {
                newPart = this.snake.getTail()
            }
            this.snake.move(this.direction);
            if (newPart) {
                this.snake.addPart(newPart);
            }
            this.actionsDifficulty();
            this.isLoser();
            this.draw();
            setTimeout(() => this.run(), this.speed);
        }
    }
    actionsDifficulty() {
        const {
            width,
            height
        } = this.screen.getLimit();

        if (!this.difficulty.limit && this.snake.outlimit(width, height)) {
            this.snake.teleport(width, height);
        }
        if (this.difficulty.quantityTrap > 0) {
            this.createTrap(this.difficulty.intervalTrap, this.difficulty.quantityTrap);
        }
    }
    createBlock() {
        let count = 0;
        let block = null;
        const blocks = this.snake.getBody();
        if (this.food) {
            blocks.push(this.food);
        }
        blocks.concat(this.trap);
        const {
            width,
            height
        } = this.screen.getLimit();
        while (!block && count < 10000) {
            let x = parseInt(Math.random() * (width - this.tam));
            let y = parseInt(Math.random() * (height - this.tam));
            let temp = new Block(x - (x % this.tam), y - (y % 10), this.tam);

            if (blocks.findIndex(element => element.x == temp.x && element.y == temp.y) == -1) {
                block = temp;
            }
            count++;

        }
        return block;
    }
    createFood() {
        if (!this.food) {
            this.food = this.createBlock();
        }
    }

    createTrap(interval, quantity) {
        if (this.score == 0 || this.food) {
            return;
        }
        let block;

        while (0 < quantity--) {
            if (this.score % interval == 0) {
                if (block = this.createBlock()) {
                    this.trap.push(block);
                }
            }
        }
    }
    updateScore() {
        document.querySelector(".score").innerHTML = "Puntuacion: " + this.score;
    }
    upScore() {
        this.score++;
        this.updateScore();
    }
    loser() {
        this.state = -1;
        this.showMenu('lose');
    }
    isLoser() {
        const {
            width,
            height
        } = this.screen.getLimit();
        if (this.snake.outlimit(width, height) || this.snake.ICrashMyselfBody() || this.snake.crashed(this.trap)) {
            this.loser();
        }
    }
    eated() {
        if (this.snake.crashed([this.food])) {
            this.upScore();
            this.food = null;
            return true;
        }
        return false;
    }
    draw() {
        this.screen.clear(),
            this.screen.addBlock(this.food, this.tam, this.color.food);
        this.snake.getBody().forEach(element => {
            this.screen.addBlock(element, this.tam, this.color.snake);
        });
        this.trap.forEach(element => {
            this.screen.addBlock(element, this.tam, this.color.trap);
        });
    }
}