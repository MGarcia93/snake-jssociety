import Game from './Game.js';
import Menu from './Menu.js';

const menu = new Menu();
const game = new Game();
const MENUSS = menu;
document.addEventListener("DOMContentLoaded", function () {
    game.setMenu(menu);
    menu.setGame(game);
    menu.show();
})