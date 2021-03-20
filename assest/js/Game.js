import Snake from './Snake.js';
import Screen from './Screen.js';
import Block from './Block.js';
export default class Game {
    constructor(param) {
        this.screen = new Screen(param.width, param.height);
        this.snake = new Snake();
        this.tam = param.tam;
        this.interval = param.interval;
        this.difficulty = 1;
        document.addEventListener("keydown", (e) => this.presskey(e));
        this.init()
        this.color = {
            snake: "#1b6f1b",
            food: "white",
            obstacle:"#333"
        }
    }
    setInterval(interval) {
        this.interval = interval;
    }
    setMenu(menu) {
        this.menu = menu;
    }
    setDifficulty(difficulty) {
        this.difficulty();
    }
    init() {
        const {
            width,
            height
        } = this.screen.getLimit();
        this.state = 0;
        this.score = 0;
        this.snake.clear();
        this.snake.addPart(new Block(parseInt(width / 2), parseInt(height / 2), this.tam));
        this.direction = this.getRandonDirection();
        this.obstacle = [];
    }
    start() {
        if (this.state == -1) {
            this.init();
        }
        this.menu.hide();
        this.screen.show();
        this.state = 1;
        this.run();
    }
    pause() {

        this.menu.show();
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
    presskey(e) {

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
                this.createObstacle();
            }
            this.isLoser();
            this.draw();
            setTimeout(() => this.run(), this.interval);
        }
    }
    createBlock() {
        let count = 0;
        let block = null;
        const blocks = this.snake.getBody();
        if(this.food){
            blocks.push(this.food);
        }
        blocks.concat(this.obstacle);
        const {width, height} = this.screen.getLimit();
        while (!block && count < 10000) {
            let x = parseInt(Math.random() * (width - this.tam));
            let y = parseInt(Math.random() * (height - this.tam));
            let temp = new Block(x - (x % this.tam), y - (y % 10), this.tam);

            if (blocks.findIndex(element => element.x == temp.x && element.y == temp.y) == -1 ) {
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

    createObstacle() {
        if (this.difficulty === 0 || this.score == 0) {
            return;
        }
        let block;
        switch (this.difficulty) {
            case 1:
                if (this.score % 10 == 0) {
                    if (block = this.createBlock()) {
                        this.obstacle.push(block);
                    }
                }
                break;
            case 2:
                if (this.score % 5 === 0) {
                    if (block = this.createBlock()) {
                        this.obstacle.push(block);
                    }
                }
                break;
        }
    }
    upScore() {
        this.score++;
    }
    loser() {
        this.state = -1;
        this.menu.show();
    }
    isLoser() {
        const {
            width,
            height
        } = this.screen.getLimit();
        if (this.snake.outlimit(width, height) || this.snake.ICrashMyselfBody() || this.snake.crashed(this.obstacle)) {
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
        this.obstacle.forEach(element => {
            this.screen.addBlock(element, this.tam, this.color.obstacle);
        });
    }
}