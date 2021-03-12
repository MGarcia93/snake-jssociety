function Main() {}

Main.prototype.run=function(){
    let game = new Game();
    game.constructor();    
    document.getElementById("start").addEventListener("click", () => game.start());
    document.getElementById("reset").addEventListener("click", () => game.reset());
}



document.addEventListener("DOMContentLoaded", () => {
    let main = new Main();
    main.run();
});