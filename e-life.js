const iterations = 50;
const iterationInterval = 100;
const planWidth = 28;
const planHeight = 12;
let BraveNewWorld;
let gameTimer;
let plan;
const worldContainer = document.querySelector('.world');

let iconsObject = {
    '#': 'image-wall',
    'Z': 'image-zebra',
    ' ': 'image-white',
    '*': 'image-plant',
    'T': 'image-tiger',
}

let template =
            ["############################",
            `#      #    #*           *##`,
            "#                          #",
            "#    *     #####           #",
            "##         #   #    ##     #",
            "###     *     ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##        * **         #",
            "#    #                 ### #",
            "#    #   **                #",
            "############################"];
      
            // let template =
            // ["############################",
            // `#      #    #             ##`,
            // "#                          #",
            // "#          #####           #",
            // "##         #   #    ##     #",
            // "###           ##     #     #",
            // "#           ###      #     #",
            // "#   ####                   #",
            // "#   ##                     #",
            // "#    #                 ### #",
            // "#    #                     #",
            // "############################"];
        
class World {
    constructor (){
        this.animals = [];
        this.log = [];
    }

    start(){
        this.createAnimals(Zebra, 10);
        this.createAnimals(Tiger, 5);
        this.renderAnimals();
        this.view();
    }
    
    createAnimals(animalClass, population){
        for (let i = 0; i < population; i+=1){
            let newAnimal = new animalClass(this);
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
            
            for ( let j=0; j < plan[i].length; j+=1){
                let chunk = document.createElement('div');
                chunk.classList.add(iconsObject[plan[i][j]]);
                chunk.classList.add('image');
                worldContainer.append(chunk);                
            }
            let br = document.createElement('br');
            worldContainer.append(br)
        }
    }
    
    turn(){
        this.animals.forEach( animal => {
            this._drowUnit(animal, ' ');         //удаляем с карты животное которое будет что-то делать
            animal.act();
            this._drowUnit(animal, animal.icon); //возврвщаем на карту животное  с учетом совершенного действия
        })
    
        for (let i=0; i < this.animals.length; i++){
            if (!this.animals[i].isAlive()) {    
                this._drowUnit(this.animals[i], ' ');
                this.animals.splice(i,1)
            };
        }

       const logInfo = document.querySelector('.description');
       logInfo.textContent = '';
       this.log.forEach( message => {
        
        let mes = document.createElement('p');
        mes.textContent = message;
        logInfo.append(mes);
       })
      

    }

}
class Animal {
    constructor (world){
        this.y = null;
        this.x = null;
        this.icon = '☺';
        this.directions = [];
        this.name = null;
        this.health = 100;
        this.stamina = 100;
        this.food = null;
        this.world = world;
    }
    born(){
        do {
            this.x = randomNumber(1, planWidth-2);
            this.y = randomNumber(1, planHeight-2);
        }
        while( plan[this.y][this.x] !== ' ' )
    }
    randomMove (){
        this._lookingFor(' ')
        let randomDirection = randomNumber(0, this.directions.length-1);
        let vector = this.directions[randomDirection];
        this.move(vector)
    }
    move (vector){
        this.y += vector[0]
        this.x += vector[1]

        this.health-=5;
        this.stamina-=10;
    }
    _lookingFor (aim){
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
    act(){
        if (this.health < 70){
            this.eat();
        }
        if (this.stamina < 50) {
            this.sleep();
        } else {
            this.randomMove();
        }    
    }
    sleep(){
        this.health-=5;
        this.stamina+=30;
        if (this.stamina >100) this.stamina = 100;

    }
    isAlive(){
      return  (this.health > 0) 
    }
    eat(){
        this._lookingFor (this.food);
        if (this.directions.length == 0){
            this.randomMove ();
        }else {
        let vector = this.directions[0];
        this.move(vector)

        this.health+=30;
        this.stamina-=5;  
        if (this.health >100) this.health = 100;
        }
        

    }
}

class Zebra extends Animal {
    constructor (world){
        super(world)
        this.name = 'Zebra';
        this.food = '*';
        this.icon = 'Z'
    }
    
}

class Tiger extends Animal {
    constructor (world){
        super(world)
        this.name = 'Tiger';
        this.food = 'Z';
        this.icon = 'T'
    }
    eat(){
        super.eat();
        this.world.animals.forEach( animal =>{
            if (animal.x === this.x && animal.y === this.y && animal.icon === 'Z'){
                animal.health = -1000;
                this.world.log.push(`${this.name} СОЖРАЛ ${animal.name}`);
                console.log(`${this.name} СОЖРАЛ ${animal.name}`)
            }
        })

    }
}























///////////////////////////////////////////////////////////////////////////////////////////////////////
function randomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function createGame(){    
    plan = 0;
    plan = template.slice();
    BraveNewWorld = new World;
   BraveNewWorld.start();

}

function update(){
    BraveNewWorld.turn();
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





