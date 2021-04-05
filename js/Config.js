const Config = {
    tam: 10,
    dimensions: {
        width: 500,
        height: 500,
    },
    difficultys: {
        1: {
            speed: 100,
            intervalTrap: 0,
            quantityTrap: 0,
            limit: false
        },
        2: {
            speed: 80,
            intervalTrap: 10,
            quantityTrap: 1,
            limit: true
        },
        3: {
            speed: 50,
            intervalTrap: 5,
            quantityTrap: 2,
            limit: true
        },
    },
    maps:{
        1:{
            index:1,
            label:"Basico",
            blocks:{}
        },
        2:{
            index:2,
            label:"Medio",
            blocks:[
                {
                    x:10,
                    y:20
                },{
                    x:20,
                    y:20
                },{
                    x:50,
                    y:20
                },{
                    x:60,
                    y:20
                },{
                    x:50,
                    y:30
                },{
                    x:60,
                    y:30
                },{
                    x:20,
                    y:30
                },{
                    x:10,
                    y:30
                },{
                    x:400,
                    y:20
                },{
                    x:410,
                    y:20
                },{
                    x:400,
                    y:30
                },{
                    x:410,
                    y:30
                },{
                    x:400,
                    y:20
                },{
                    x:410,
                    y:20
                },{
                    x:400,
                    y:30
                },{
                    x:410,
                    y:30
                },{
                    x:480,
                    y:20
                },{
                    x:490,
                    y:20
                },{
                    x:480,
                    y:30
                },{
                    x:490,
                    y:30
                },{
                    x:480,
                    y:420
                },{
                    x:490,
                    y:420
                },{
                    x:480,
                    y:430
                },{
                    x:490,
                    y:430
                },{
                    x:50,
                    y:420
                },{
                    x:60,
                    y:420
                },{
                    x:50,
                    y:430
                },{
                    x:60,
                    y:430
                },{
                    x:50,
                    y:320
                },{
                    x:60,
                    y:320
                },{
                    x:50,
                    y:330
                },{
                    x:60,
                    y:330
                }
            ]
        },
    }
}