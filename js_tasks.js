// 1. Подсчет букв
//  Напишите функцию, которая принимает строку и символ в качестве аргументов
//  и возвращает количество символов в данной строке. 
//  Подсчет должен происходить независимо от регистра.

 function countChar(str, s) {
    s = s.toUpperCase();
    str = str.toUpperCase()
    return str.split('').filter(i => i == s).length;
}

console.log(countChar('aakjsdkajshdkajsdhas', 'j')) //  3

// 2. Сложный подсчет букв (^_^)
// Напишите функцию которая посчитает каждую букву в строке и выведет объект, 
// где ключ - это буква, а значение - количетсво букв в строке.

function countAllChar (str) {  
    let obj={};
    str.split('').map((i)=>{
        if (obj[i]){
            obj[i]=obj[i]+1
        } else {
            obj[i]=1 
        }
    })

    return obj;
}

console.log(countAllChar('aabbcccvvv')) // {a: 2, b: 2, c: 3, v:3}  

// 3. Глубокое сравнение
// Напишите функцию, которая возвращает истину, 
// если переданные в нее объекта равны друг другу по содержимому. 
// Поля, значение которых являются примитивами должны сравниваться с помощью оператора ===.


function deepCompare (obj1, obj2) {
    
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    } else {
        return  Object.keys(obj1).every(k => obj1[k] === obj2[k]) 
    }
    
}

console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: '2' }));

//true 

console.log(deepCompare({ one: 1, two: '2' }, { two:'2'}));

//false 

console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: 2 }));

//false

console.log(deepCompare({ one: 1, two: '2' }, { two: '2', one: 1 }));

//true




// 4. Шахматная доска
// Напишите функцию, которая принимает ширину и высоту в качестве аргументов. 
// Функция должна возвращать строку, представляющую собой сочетание пробелов 
// и символов решетки #, в которой линии разделяются символами новой строки. 
// На каждой позиции либо пробел, либо знак #. 

function chessBoard (width, height){
    let str = ``;
    
    let j = 1;
    while(j <= height){
        if (j % 2 ==0){   //первый знак четных строк всегда пробел, а нечетных - #
            str = `${str} `;
        }else {
            str = `${str}#`;
        }
       let end=str.length+width-1;  // конец текущей строки  это всегда длинна всего str
                                    // + длинна текущей строки 
                                    // - 1й знак, который мы нарисовали выше

        for(let i = str.length; i < end; i++){
            if (str[i-1] === `#`) {
                str = `${str} `;
            }else {
                str = `${str}#`;
            }   
        }
        str = `${str}\n`;

        j+=1;
    }
    
   return str
   

}

console.log(chessBoard(8, 4)); 

// 5. Диапазон
//Напишите функцию, принимающую два аргумента, начало и конец диапазона, 
//которая возвращает массив, содержащий все числа из этого диапазона, 
//включая начальное и конечное. Дополнительно функция должна обрабатывать 
//необязательный третий аргумент – шаг для построения массива. 
//Если он не задан, шаг равен единице. Если число, указывающее начало диапазона больше, 
//чем число обозначающее конец диапазона, то шаг д.б. отрицательным


function makeRange (start, end, step=1){
    let newArr= [];

    if (end < start){
        step = -step
        for (let i = start; i >= end; i=i+step) newArr.push(i)
    } else { 
        for (let i = start; i <= end; i=i+step) newArr.push(i)
    }
   
    return newArr    
}

console.log(makeRange(1, 10));
// //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

 console.log(makeRange(1, 10, 1));
// //[1, 3, 5, 7, 9]

 console.log(makeRange(10, 1, 2));
//[10, 8, 6, 4, 2]


// 6. Reverse
// напишите функцию, которая получает массив как аргумент 
// и возвращает тот же массив с обратным порядком элементов. 
// Не используйте стандартный метод массива reverse.

function reverse(arr){
    let end = arr.length-1;
    for (let i=end; i>=0; i--) arr.push(arr[i]);
    arr.splice(0, end+1);
    return arr
}
    
    
let alphabet = ['A', 'B', 'c', 'D', 'e'];
console.log(reverse(alphabet))
// ['e','D','c', 'B','A']


// 7.Merge
// Напишите функцию, которая принимает произвольное количетсво аргументов, 
// которые являются массивами, и возвращает один массив в котором не содержится
//  повторяющихся элементов


function mergeArrays(...args){
    let mergedArr = new Set;
    for (let arg of args) arg.forEach(el => mergedArr.add(el));
    return mergedArr
}

console.log(mergeArrays([1, 2], ['а', 4], ['b', 6]));
//[1, 2, a, 4, b, 6]

console.log(mergeArrays([1, 2], ['a', 4], ['a', 6]));
//[1, 2, a, 4, 6]