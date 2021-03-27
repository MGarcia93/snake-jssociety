let tam=10;
const Config = {
    tam: tam,
    dimensions : {
        desktop: {
            width: 500,
            height: 500,
        },
        mobile: {
            width: parseInt((window.screen.width)/tam)*tam-tam,
            height: parseInt(window.screen.height / 2 / tam)*tam
        }
    },
    difficultys : {
        1: {
            speed: 100,
            intervalTrap: 0,
            quantityTrap: 0,
            limit:false
        },
        2: {
            speed: 80,
            intervalTrap: 10,
            quantityTrap: 1,
            limit:true
        },
        3: {
            speed: 50,
            intervalTrap: 5,
            quantityTrap: 2,
            limit:true
        },
    }
}