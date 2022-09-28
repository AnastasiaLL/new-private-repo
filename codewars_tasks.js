// http://www.codewars.com/kata/opposite-number

const opposite = number => -number ;


// http://www.codewars.com/kata/basic-mathematical-operations


const basicOp = (operation, value1, value2) =>  eval( `${value1} ${operation} ${value2}` )


// http://www.codewars.com/kata/printing-array-elements-with-comma-delimiters


const printArray = arr => arr.join(',');

// http://www.codewars.com/kata/transportation-on-vacation


function rentalCarCost(d) {
    if (d >= 7){return (40 * d) - 50}
    else if (d >= 3 & d < 7){return (40 * d) - 20}
    else return 40*d
}

// http://www.codewars.com/kata/calculating-with-functions

function zero(num) {return typeof (num)=== 'function' ?  num(0) :  0}
function one(num) {return typeof (num)=== 'function' ?  num(1) :  1}
function two(num) {return typeof (num)=== 'function' ?  num(2) :  2}
function three(num) {return typeof (num)=== 'function' ?  num(3) :  3}
function four(num) {return typeof (num)=== 'function' ?  num(4) :  4}
function five(num) {return typeof (num)=== 'function' ?  num(5) :  5}
function six(num) {return typeof (num)=== 'function' ?  num(6) :  6}
function seven(num) {return typeof (num)=== 'function' ?  num(7) :  7}
function eight(num) {return typeof (num)=== 'function' ?  num(8) :  8}
function nine(num) {return typeof (num)=== 'function' ?  num(9) :  9}

function plus(rightSide) { return function( leftSide ) { return leftSide + rightSide; }; };
function minus(rightSide) { return function( leftSide ) { return leftSide - rightSide; }; };
function times(rightSide) { return function( leftSide ) { return leftSide * rightSide; }; };
function dividedBy(rightSide) { return function( leftSide ) { return Math.floor(leftSide / rightSide); }; };


// http://www.codewars.com/kata/get-the-middle-character

function getMiddle(s){
 if (s.length % 2 == 0){
        return s.substr( (s.length/2)-1 , 2 )
    }
    else {
        return s.substr( Math.floor(s.length/2) , 1 )
    }
}



// http://www.codewars.com/kata/partition-on

function partitionOn(pred, items) {

    let trueArr = [];
        
    let i =0;
    while (i < items.length){
        if (pred (items[i]) ) {
            trueArr.push(items[i])
            items.splice(i, 1);
        }else {
            i+=1;
        };
    }
    
    trueArr.forEach( i => items.push(i));
    
    return items.length - trueArr.length
}