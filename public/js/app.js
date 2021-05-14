import Game from './Game.js';
import Menu from './Menu.js';
document.addEventListener("DOMContentLoaded",function(){
    const menu= new Menu();
    const game= new Game();
    game.setMenu(menu);
    menu.setGame(game);
    menu.show();
})