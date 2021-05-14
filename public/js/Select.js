export default class Select {
    constructor(label, options) {
        this.create(label, options);
        this.time = options.time || 0.3;       
        this.hide();
    }
    getElement() {
        return this.select;
    }
    create(label, options) {
        this.select = document.createElement('div');
        this.select.classList.add('select');
        this.select.innerHTML = `<label>${label}</label><div class="options"></div>`;
        this.options = [];
        for (let key in options) {
            let element = document.createElement("li");
            for (const property in options[key].attributes) {
                element.setAttribute(property, options[key].attributes[property]);
            }
            element.innerText = options[key].label;
            element.style.display = "none";
            element.addEventListener('mouseover',function(){
                this.parentNode.querySelector(".selected").classList.remove("selected");
                this.classList.add("selected");
            });
            this.options.push(element);
            
            this.select.querySelector(".options").appendChild(element);

        };
        this.options[0].classList.add("selected");
    }
    show() {
        this.select.classList.add("show");
        let height = this.select.querySelector(".selected").offsetHeight;
        this.select.style.height = height + "px";
        this.options.forEach(element => {
            element.style.display = "block";
        });
        this.animation(height, height * this.options.length);
    }
    onClick(callback) {
        this.callback=callback;
        for(let key in this.options){
            this.options[key].onclick = () => {
                if (this.select.classList.contains("show")) {                    
                    this.changeSeleted(key);
                }else{
                    this.show();
                }
            }
        };
    }
    changeSeleted(index){
        this.callback(this.options[index]);
        this.hide();
        for(let key in this.options){
            this.options[key].classList.remove("selected");
        }
        this.options[index].classList.add("selected");
    }
    setSelect(index){
       this.changeSeleted(index);
    }
    animation(init, end) {
        const repeat = this.time * 1000;
        const sum = (end - init) / repeat;
        let count = 0;
        const changeHeight = setInterval(() => {
            if (count < repeat) {
                this.select.style.height += sum;
                count++;
            } else {
                clearInterval(changeHeight);
            }
        }, 1);
    }
    hide() {

        let height = this.select.querySelector(".selected").offsetHeight;
        this.options.forEach(element => {
            element.style.display = "none";
            
        });
        this.animation(height, height * this.options.length);
        this.select.classList.remove("show");
    }
}