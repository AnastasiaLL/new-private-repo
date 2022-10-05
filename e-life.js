const iterations = 30;
const iterationInterval = 200;
const planWidth = 28;
const planHeight = 18;
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
    'D': 'image-dobby',
    'S': 'image-sock',
    '~': 'image-water',
    'B': 'image-bird',
    'U': 'image-unicorn',
}

let template =
    ["############################",
        `#~~~~~~#    #             ##`,
        "#~~~~~                     #",
        "#~~~~      #####           #",
        "##~~       #   #    ##     #",
        "###           ##     #     #",
        "#           ###      #     #",
        "#   ####                   #",
        "#   ##                     #",
        "#    #                 ### #",
        "#                          #",
        "#            #             #",
        "#    #                     #",
        "#    #                 ### #",
        "#                          #",
        "#          #####           #",
        "#    #                     #",
        "############################"];

class World {
    constructor() {
        this.animals = [];
        this.log = [];
    }

    start() {
        this.createAnimals(Zebra, 15);
        this.createAnimals(Tiger, 7);
        this.createAnimals(Dobby, 1);
        this.createAnimals(Bird, 1);
        this.createStuff(Sock, 1);
        this.createStuff(Plant, randomNumber(15, 25))
        this.renderAnimals();
        this.view();
    }

    createAnimals(animalClass, population) {
        for (let i = 0; i < population; i += 1) {
            let newAnimal = new animalClass(this);
            this.animals.push(newAnimal);
        }
    }
    renderAnimals() {
        this.animals.forEach(animal => {
            animal.born();
            this._drowUnit(animal, animal.icon)
        })
    }
    _drowUnit(unit, icon) {
        plan[unit.y] = plan[unit.y].slice(0, unit.x) + `${icon}` + plan[unit.y].slice(unit.x + 1);
    }

    view() {

        worldContainer.innerText = '';
        for (let i = 0; i < plan.length; i += 1) {

            for (let j = 0; j < plan[i].length; j += 1) {
                let chunk = document.createElement('div');
                chunk.classList.add(iconsObject[plan[i][j]]);
                chunk.classList.add('image');
                worldContainer.append(chunk);
            }
            let br = document.createElement('br');
            worldContainer.append(br)
        }
    }

    turn() {
        this.animals.forEach(animal => {
            this._drowUnit(animal, animal.step);         //удаляем с карты животное которое будет что-то делать
            animal.act();
            this._drowUnit(animal, animal.icon); //возврвщаем на карту животное  с учетом совершенного действия
        })

        for (let i = 0; i < this.animals.length; i++) {
            if (!this.animals[i].isAlive()) {
                this._drowUnit(this.animals[i], ' ');
                this.animals.splice(i, 1)
            };
        }

        const logInfo = document.querySelector('.description');
        logInfo.textContent = '';
        this.log.forEach(message => {
            let mes = document.createElement('p');
            mes.textContent = message;
            logInfo.append(mes);
        })

        this.createStuff(Plant, randomNumber(0, 2))

    }

    createStuff(stuff, stuffCount) {
        for (let i = 0; i < stuffCount; i += 1) {
            let newStuff = new stuff;
            do {
                newStuff.x = randomNumber(1, planWidth - 2);
                newStuff.y = randomNumber(1, planHeight - 2);
            }
            while (plan[newStuff.y][newStuff.x] !== ' ');
            this._drowUnit(newStuff, newStuff.icon);
        }

    }


}

class Plant {
    constructor() {
        this.y = null;
        this.x = null;
        this.icon = '*';
    }
}

class Sock extends Plant {
    constructor() {
        super();
        this.icon = 'S'
    }
}

class Animal {
    constructor(world) {
        this.y = null;
        this.x = null;
        this.icon = '☺';
        this.directions = [];
        this.name = null;
        this.health = 150;
        this.stamina = 150;
        this.food = null;
        this.foodMessage = null;
        this.world = world;
        this.class = Animal;
        this.step = ' '
    }
    born() {
        do {
            this.x = randomNumber(1, planWidth - 2);
            this.y = randomNumber(1, planHeight - 2);
        }
        while (plan[this.y][this.x] !== ' ')
    }
    randomMove() {
        this._lookingFor(' ');
        if (this.directions.length === 0 || this.stamina < 10) {
            this.sleep();
        } else {
            let randomDirection = randomNumber(0, this.directions.length - 1);
            let vector = this.directions[randomDirection];
            this.move(vector)
        }

    }
    move(vector) {
        this.y += vector[0]
        this.x += vector[1]

        this.health -= 5;
        this.stamina -= 5;
    }
    _lookingFor(aim) {
        this.directions = [];
        for (let i = -1; i <= 1; i += 1) {
            for (let j = -1; j <= 1; j += 1) {
                if (!(i == 0 && j == 0)) {   //пропустить свою текущую позицию
                    if (plan[this.y + i][this.x + j] === aim) {
                        this.directions.push([i, j]) //добавить в массив свободных направлений
                    }
                }
            }
        }
    }
    act() {
        if (this.health > 50 && this.stamina > 50) {
            this.haveFun();
        }
        if (this.health < 50) {
            this.eat();
        } else if (this.stamina < 20) {
            this.sleep();
        } else {
            this.randomMove();
        }
    }
    sleep() {
        this.health -= 5;
        this.stamina += 40;
        if (this.stamina > 150) this.stamina = 150;

    }
    isAlive() {
        return (this.health > 0)
    }
    eat() {
        this._lookingFor(this.food);
        if (this.directions.length == 0) {
            this.randomMove();
        } else {
            let vector = this.directions[0];
            this.move(vector)

            this.health += 40;
            if (this.health > 150) this.health = 150;
            this.world.log.push(this.foodMessage);
        }
    }
    haveFun() {
        this._lookingFor(this.icon);
        if (this.directions.length == 0 || (randomNumber(0, 2) < 2)) {
            this.randomMove();
        } else {
            this.directions = [];
            this._lookingFor(' ');
            if (this.directions.length == 0) {
                this.sleep();
            } else {
                this.world.createAnimals(this.class, 1);
                let newAnimal = this.world.animals[this.world.animals.length - 1];
                newAnimal.y = this.y + this.directions[0][0];
                newAnimal.x = this.x + this.directions[0][1];
                newAnimal.stamina = 50;
                this.world.log.push(`еще один ${this.name} родился в Зоопарке!`);

                this.world._drowUnit(newAnimal, newAnimal.icon);

                this.health -= 50;
                this.stamina -= 50;
            }
        }
    }
}

class Zebra extends Animal {
    constructor(world) {
        super(world)
        this.name = 'Зебра';
        this.food = '*';
        this.icon = 'Z';
        this.foodMessage = 'Зебра нашла траву';
        this.class = Zebra;
    }
    haveFun() {
        this._lookingFor(this.icon);
        if (this.directions.length == 0 || (randomNumber(0, 2) < 2)) {
            this.randomMove();
        } else {
            this.directions = [];
            this._lookingFor(' ');
            if (this.directions.length == 0) {
                this.sleep();
            } else {
                let zebraChild = this.class;
                if (randomNumber(0, 20) > 19) {
                    zebraChild = Unicorn;   //вероятность рождения единорога 1/20
                }
                this.world.createAnimals(zebraChild, 1);
                let newAnimal = this.world.animals[this.world.animals.length - 1];
                newAnimal.y = this.y + this.directions[0][0];
                newAnimal.x = this.x + this.directions[0][1];
                newAnimal.stamina = 50;
                if (newAnimal.name === 'Единорог') {
                    this.world.log.push(`ВАУ, РОДИЛСЯ ЕДИНОРОГ!`);
                } else {
                    this.world.log.push(`прекрасная ${newAnimal.name} родилась в этом мире!`);
                }

                this.world._drowUnit(newAnimal, newAnimal.icon);

                this.health -= 50;
                this.stamina -= 50;
            }
        }
    }
}
class Unicorn extends Zebra {
    constructor(world) {
        super(world)
        this.name = 'Единорог';
        this.icon = 'U';
        this.foodMessage = 'Единорог немного поел';
        this.class = Unicorn;
    }
}

class Bird extends Animal {
    constructor(world) {
        super(world)
        this.name = 'Фламинго';
        this.food = '*';
        this.icon = 'B';
        this.foodMessage = 'Фламинго снова наелся рыбы из озера';
        this.class = Bird;
        this.step = '~';
        this.health = 10000;
        this.stamina = 10000;
    }
    born() {
        this.x = randomNumber(1, 4);
        this.y = randomNumber(1, 3);
    }
    randomMove() {
        this._lookingFor('~');
        if (this.directions.length === 0 || this.stamina < 10) {
            this.sleep();
        } else {
            let randomDirection = randomNumber(0, this.directions.length - 1);
            let vector = this.directions[randomDirection];
            this.move(vector)
        }
    }
    act() {
        this.randomMove();
        if ((randomNumber(0, 2) < 2)) {
            this.world.log.push(this.foodMessage);
        }
    }
}

class Tiger extends Animal {
    constructor(world) {
        super(world)
        this.name = 'Тигр';
        this.food = 'Z';
        this.icon = 'T';
        this.foodMessage = 'Тигр СОЖРАЛ Зебру';
        this.class = Tiger;
    }
    eat() {
        super.eat();
        this.world.animals.forEach(animal => { //убьем зебру
            if (animal.x === this.x && animal.y === this.y && animal.icon === 'Z') {
                animal.health = -1000;
            }
        })

    }
}

class Dobby extends Animal {
    constructor(world) {
        super(world)
        this.name = 'Добби';
        this.icon = 'D'
    }
    act() {
        this._lookingFor('S');

        if (this.directions.length == 0) {
            this.randomMove();
        } else {
            let vector = this.directions[0];
            this.move(vector);
            this.world.log.push(`Добби нашел носок! Теперь Добби свободен!`);
            this.health = -1000;
        };
    }
    move(vector) {
        this.y += vector[0]
        this.x += vector[1]
    }

}





















///////////////////////////////////////////////////////////////////////////////////////////////////////
function randomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function createGame() {
    plan = 0;
    plan = template.slice();
    BraveNewWorld = new World;
    BraveNewWorld.start();

}

function update() {
    BraveNewWorld.turn();
    BraveNewWorld.view();
    if (BraveNewWorld.animals.length == 0) clearInterval(gameTimer)
}


function startGame() {
    // повторить с интервалом 1 секунды
    gameTimer = setInterval(() => update(), iterationInterval);

    // остановить вывод через 3 секунд
    setTimeout(() => { clearInterval(gameTimer) }, iterations * iterationInterval);
}



document.querySelector('.button-go').addEventListener('click', startGame);
document.querySelector('.button-create').addEventListener('click', createGame);


createGame()





