// 1. https://www.codewars.com/kata/prefill-an-array



//2. http://www.codewars.com/kata/closures-and-scopes

function createFunctions(n) {
    let arr = [];
    for (let i=0; i<n; i++) {
      arr.push(function() {
        return i;
      });
      console.log(callbacksArr);
    }
    return arr ;
  }

createFunctions(5)


// 3. https://www.codewars.com/kata/5351b35ebaeb67f9110012d2/javascript

function createSecretHolder(secret) {
    return {
      getSecret: function(){return secret},
      setSecret: function(newSecret){secret = newSecret} 
   }
}



//7. https://www.codewars.com/kata/function-composition

function compose(f,g) {
    return (...args) => f ( g (...args))
}


//8. https://www.codewars.com/kata/function-composition-1
function compose(...args) {

    return function (ar) {
      let result = ar;
      for (let i = args.length-1; i >= 0; i--) {
        const f = args[i];
        
        result = f(result)
      }
      
      
      return result;
    }
  }