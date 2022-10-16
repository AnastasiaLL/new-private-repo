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
    constructor(iterateData, iterateConfig) {
        this.iterateData = iterateData;
        this.position = 0;
        this.isCyclic = iterateConfig.cyclic;
        this.windowWidth = iterateConfig.windowWidth;
    }

    getCurrent() {
        if (this.isPositionInBorders()) {
            let currentArr = [];
            for (let i = 0; i <= this.windowWidth; i++) {
                currentArr.push(this.iterateData[this.changeOutbordersPositions(this.position + i)]);
            }
            return currentArr
        } else {
            return undefined
        }
    }

    isPositionInBorders() {
        if (this.isCyclic) {
            return true;
        } else {
            if (this.position < 0 || this.position + this.windowWidth + 1 > this.iterateData.length) {
                console.log('No data.');
                return false;
            } else return true;
        }
    }

    changeOutbordersPositions(number) {
        if (number >= this.iterateData.length) {
            return number - this.iterateData.length;
        } else if (number < 0) {
            return number + this.iterateData.length;
        } else return number
    }

    forward() {
        this.position += 1;
        return this.getCurrent();
    }

    back() {
        this.position -= 1;
        return this.getCurrent();
    }

    jumpTo(number) {
        this.position = number;
    }


}

const iterateData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const iterateConfig = { 'cyclic': false, 'windowWidth': 2 }

const customIterator = new CustomIterator(iterateData, iterateConfig)

console.log(customIterator.back())
console.log(customIterator.getCurrent())
console.log(customIterator.forward())
console.log(customIterator.forward())
console.log(customIterator.forward())
console.log(customIterator.jumpTo(10))
console.log(customIterator.getCurrent())
console.log(customIterator.back())
console.log(customIterator.getCurrent()) 
