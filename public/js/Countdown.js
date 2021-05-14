export default class countdown {

    constructor(quantity) {
        this.div = document.createElement("div");
        this.div.setAttribute("id", "countdown");
        this.div.innerHTML = "<i></i>";
        this.i = document.create
        this.quantity = quantity;
        document.body.appendChild(this.div);
    }
    show(callback) {
        this.div.classList.add('show');
        this.run().then(() => {
            callback();
            this.exit();
        });

    }
    run() {
        return new Promise(resolve => {
            if (0 < this.quantity) {
                this.div.querySelector("i").innerText = this.quantity-- || 'go';
                setTimeout(
                    () => this.run().then(() => resolve()), 1000);
            } else {
                resolve();
            }

        });
    }

    exit() {
        this.div.remove();
    }

}