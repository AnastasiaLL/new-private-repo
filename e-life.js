const iterations = 50;
const iterationInterval = 100;
const planWidth = 28;
const planHeight = 12;
let BraveNewWorld;
let gameTimer;

const worldContainer = document.querySelector('.world');


let template =
            ["############################",
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
      

let plan;        
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

class World {
    constructor (){
        this.animals = [];
    }
    
    createAnimals(animalClass, population){
        for (let i = 0; i < population; i+=1){
            let newAnimal = new animalClass;
            this.animals.push(newAnimal);
        }
    }
    renderAnimals(){
        this.animals.forEach( animal => {
            animal.born();
            this._drowUnit(animal, animal.icon)
        })
    }
    _drowUnit (unit, icon){
        plan[unit.y] = plan[unit.y].slice(0, unit.x) + `${icon}` + plan[unit.y].slice(unit.x+1);
    }
   
    view(){
        worldContainer.innerText = '';
        for (let i = 0; i < plan.length; i+=1){
            let chunk = document.createElement('pre');
            chunk.innerText = plan[i];
            worldContainer.append(chunk);
        }
    }
    
    act(){
        this.animals.forEach( animal => {
            this._drowUnit(animal, ' ');         //удаляем с карты животное которое будет что-то делать
            animal.randomAct();
            this._drowUnit(animal, animal.icon); //возврвщаем на карту животное которое с учетом совершенного действия
        })
    
        for (let i=0; i < this.animals.length; i++){
            if (!this.animals[i].isAlive()) {
                this._drowUnit(this.animals[i], ' ');
                this.animals.splice(i,1)
            };
        }
    }

}



class Animal {
    constructor (){
        this.y = null;
        this.x = null;
        this.icon = '☺';
        this.directions = [];
        this.name = null;
        this.health = 100;
        this.stamina = 100;
    }
    born(){
        do {
            this.x = randomNumber(1, planWidth-2);
            this.y = randomNumber(1, planHeight-2);
        }
        while( plan[this.y][this.x] !== ' ' )
    }
    randomMove (){
        let randomDirection = randomNumber(0, this.directions.length-1);
        let vector = this.directions[randomDirection];
        this.move(vector)
    }
    move (vector){
        this.y += vector[0]
        this.x += vector[1]

        this.health-=10;
        this.stamina-=10;
    }
    lookingFor (aim){
        this.directions = [];
        for (let i= -1; i <=1; i+=1){
            for (let j= -1; j <=1; j+=1){
                if (!(i == 0 && j ==0)) {   //пропустить свою текущую позицию
                   if ( plan[this.y+i][this.x+j] === aim){
                    this.directions.push([i, j]) //добавить в массив свободных направлений
                   }
                } 
            }
        }
    }
    randomAct(){
        this.lookingFor(' ')
        this.randomMove()
    }
    sleep(){
        this.health-=10;
        this.stamina+=10;
        if (this.stamina >100) this.stamina = 100;
    }
    isAlive(){
      return  (this.health > 0) 
    }
}


function randomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function createGame(){    
    plan = 0;
    plan = template.slice();
    BraveNewWorld = new World;
    BraveNewWorld.createAnimals(Animal, 5);
    BraveNewWorld.renderAnimals();
    BraveNewWorld.view();

}

function update(){
    BraveNewWorld.act();
    BraveNewWorld.view();
    if (BraveNewWorld.animals.length == 0) clearInterval(gameTimer)
}
    

function startGame () {
    // повторить с интервалом 1 секунды
    gameTimer = setInterval(() => update(), iterationInterval);

    // остановить вывод через 3 секунд
    setTimeout(() => { clearInterval(gameTimer) }, iterations*iterationInterval); 
}



document.querySelector('.button-go').addEventListener('click', startGame);
document.querySelector('.button-create').addEventListener('click', createGame);


createGame()

