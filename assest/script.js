function Main() {}

Main.prototype.run=function(width,height,tam){
    let game = new Game();
    game.constructor(width,height,tam);    
    document.getElementById("start").addEventListener("click", () => game.start());
    document.getElementById("reset").addEventListener("click", () => game.reset());
}



document.addEventListener("DOMContentLoaded", () => {
    let main = new Main();
    /*inicio el programa pasando los detos width,hieght,tamaño del cuerpo  */
    main.run(600,600,10);
});