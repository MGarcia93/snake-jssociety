export default class screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById("screen");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        this.legend = document.getElementById("legend");

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
    updateBorder(border) {
        if (border) {
            this.canvas.classList.add("border");
        } else {
            this.canvas.classList.remove("border");
        }
    }
    getLimit() {
        return {
            width: this.width,
            height: this.height
        }
    }
    show() {
        this.legend.classList.remove('hide');
        this.canvas.classList.remove('hide');
    }
    changeActionLegend(action) {
        this.legend.querySelector(".action").innerText = action;
    }
}