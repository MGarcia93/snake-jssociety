export default class screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById("screen");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.save();
    }
    addBlock(block, tam, color) {
        if (block) {
            this.context.save();
            this.context.beginPath();
            this.context.fillStyle = color;
            this.context.fillRect(block.x, block.y, tam, tam);
            this.context.restore();
        }
    }
    getLimit() {
        return {
            width: this.width,
            height: this.height
        }
    }
    show() {
        this.canvas.classList.remove('hide');
    }
}