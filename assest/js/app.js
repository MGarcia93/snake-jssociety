import Game from './Game.js';
import Menu from './Menu.js';
document.addEventListener("DOMContentLoaded",function(){
    const menu= new Menu();
    const game= new Game({width:500,height:500,tam:10,interval:100});
    game.setMenu(menu);
    menu.setGame(game);
    menu.show();
})