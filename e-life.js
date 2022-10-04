const iterations = 50;
const iterationInterval = 100;
const planWidth = 28;
const planHeight = 12;


let plan = ["############################",
            `#      #    #             ##`,
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##                     #",
            "#    #                 ### #",
            "#    #                     #",
            "############################"];

            
// let plan = ["🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵",
//             `🌵🏵🏵🏵🌵⚰⚰⚰⚰⚰⚰🌵🌵🌵`,
//             "🌵                         🌵",
//             "🌵          🌵🌵🌵         🌵",
//             "🌵🌵         🌵   🌵    🌵 🌵",
//             "🌵🌵🌵         🌵          🌵",
//             "🌵          🌵      🌵     🌵",
//             "🌵   🌵🌵                  🌵",
//             "🌵   🌵                    🌵",
//             "🌵   🌵          🌵🌵🌵    🌵",
//             "🌵                         🌵",
//             "🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵🌵"];


// function Vector(x, y) {
//     this.x = x;
//     this.y = y;
// }
// Vector.prototype.plus = function(other) {
//     return new Vector(this.x + other.x, this.y + other.y);
// };
// let directions = {
//     "n":  new Vector( 0, -1),
//     "ne": new Vector( 1, -1),
//     "e":  new Vector( 1,  0),
//     "se": new Vector( 1,  1),
//     "s":  new Vector( 0,  1),
//     "sw": new Vector(-1,  1),
//     "w":  new Vector(-1,  0),
//     "nw": new Vector(-1, -1)
// };


// let grid = ["top left",    "top middle",    "top right",
//             "bottom left", "bottom middle", "bottom right"];
// // console.log(grid[2 + (1 * 3)]);
// // → bottom right


// class Grid {
//     constructor(width, height) {
//         this.space = new Array(width * height);
//         this.width = width;
//         this.height = height;
//     }
//     isInside(vector) {
//         return vector.x >= 0 && vector.x < this.width &&
//             vector.y >= 0 && vector.y < this.height;
//     }
//     get(vector) {
//         return this.space[vector.x + this.width * vector.y];
//     }
//     set(vector, value) {
//         this.space[vector.x + this.width * vector.y] = value;
//     }
// }

// animals

class Animal {
    constructor (){
        this.y = null;
        this.x = null;
        this.icon = '☺';
        this.directions = [];
    }
    born(){
        do {
            this.x = randomNumber(1, planWidth-2);
            this.y = randomNumber(1, planHeight-2);
        }
        while( plan[this.y][this.x] !== ' ' )
    }
    move (){
        let randomDirection = randomNumber(0, this.directions.length-1);

        let vector = this.directions[randomDirection];

        this.y += vector[0]
        this.x += vector[1]
    }
    look (){
        this.directions = [];
        for (let i= -1; i <=1; i+=1){
            for (let j= -1; j <=1; j+=1){
                if (!(i == 0 && j ==0)) {   //пропустить свою текущую позицию
                   if ( plan[this.y+i][this.x+j] !== '#'){
                    this.directions.push([i, j]) //добавить в массив свободных направлений
                   }
                } 
            }
        }
    }
}


function redrawPosition (animal){
    drowUnit(animal, ' ');
    animal.move()
    drowUnit(animal, animal.icon);
}

function drowUnit (unit, icon){
    plan[unit.y] = plan[unit.y].slice(0, unit.x) + `${icon}` + plan[unit.y].slice(unit.x+1);
}

function randomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}



function View(){
    document.body.innerText = '';
    for (let i = 0; i < plan.length; i+=1){
        let chunk = document.createElement('pre');
        chunk.innerText = plan[i];
        document.body.append(chunk);
    }
}


let Vasya = new Animal;
Vasya.born();
drowUnit(Vasya, Vasya.icon)
View();
function update(){
    Vasya.look();
    redrawPosition (Vasya);
    View();
}

// повторить с интервалом 1 секунды
let timerId = setInterval(() => update(), iterationInterval);

// остановить вывод через 3 секунд
setTimeout(() => { clearInterval(timerId) }, iterations*iterationInterval);