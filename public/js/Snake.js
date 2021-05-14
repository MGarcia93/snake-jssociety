export default class snake {
    constructor(tam) {
        this.body = [];
        this.tam = tam;
    }
    getBody() {
        return this.body.map((part) => ({
            ...part
        }));
    }
    clear() {
        this.body = [];
    }
    getTail() {
        return Object.assign({},this.body.slice(-1)[0]);
    }
    addPart(block) {
        this.body.push(block);
    }
    isCanMove(x, y) {
        const head =this.body[0];
        if (this.body.length == 1 || (head.x + x != this.body[1].x && head.y - y != this.body[1].y)) {
            return true;
        }
        return false;
    }
    move(direction) {
        for (let i = this.body.length - 1; i > -1; i--) {
            if (i === 0) {
                this.body[i].x += direction.x;
                this.body[i].y += direction.y;
            } else {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
        }
    }
    outlimit(width, height) {
        const head = this.body[0];
        if (head.x < 0 || head.x > width - head.tam || head.y < 0 || head.y > height - head.tam) {
            return true;
        }
        return false;
    }
    teleport(width, height){
        const head = this.body[0];
        head.y= height<=head.y?0:(head.y<0?height-head.tam:head.y);
        head.x= width<=head.x?0:(head.x<0?width-head.tam:head.x);
    }
    crashed(blocks) {
        const head = this.body[0];
        if (blocks.findIndex(element => element.x == head.x && element.y == head.y) != -1) {
            return true;
        }
        return false;
    }
    ICrashMyselfBody() {
        return this.crashed(this.body.slice(1));
    }



}