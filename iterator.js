// Написать простой Итератор
// -итерация в обе стороны
// -мы можем конфигурировать, итерировать бесконечно либо,
// дойдя до конца итерируемых данных показывать юзеру сообщение, 
// что больше нет данных, так же мы можем задавать любую ширину окна итерации.


// пример:
//customIterator.getCurrent()  // [0,1,2]
// customIterator.forward() // [1,2,3]
// customIterator.jumpTo(3) // undefined
// customIterator.getCurrent() // [3,4,5]
// customIterator.back() // [2,3,4]


class CustomIterator {
    constructor (iterateData, iterateConfig){
        this.iterateData = iterateData;
        this.position = 0;
        this.isCyclic = iterateConfig.cyclic;
        this.windowWidth = iterateConfig.windowWidth;
        this.generator = this.generatePosition(this);
    }

    generatePosition = function* (){
        while(true){
           console.log(this.position)
           yield this.position
           this.position += this.windowWidth + 1;
       }
    }    

    
      getCurrent(){

         this.generator.next()

        if (this.position + this.windowWidth + 1 > this.iterateData.length) {
            console.log('No more data.');
            return undefined
        } else {
            let currentArr = this.iterateData.slice(this.position, this.position + this.windowWidth + 1);
            return currentArr;
        }    
       
             
    }
        
    // forward(){
    //     this.position -= this.windowWidth ;
    //     return resultArr;
    // }


}

const iterateData = [0,1,2,3,4,5,6,7,8,9,10,11]
const iterateConfig = {'cyclic': true, 'windowWidth': 2}

const customIterator = new CustomIterator(iterateData, iterateConfig)


console.log (customIterator.getCurrent())  // [0,1,2]
console.log (customIterator.getCurrent())  // [0,1,2]
console.log (customIterator.getCurrent())  // [0,1,2]
console.log (customIterator.getCurrent())  // [0,1,2]
console.log (customIterator.getCurrent())  // [0,1,2]
