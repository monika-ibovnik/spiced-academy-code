/**
Write a function that takes an array as a parameter and returns a new array containing all of the items that are in the array that was passed in but in reverse order. Unlike the reverse method that all arrays have, this function should leave the original array unchanged.
*/
function reverseArray(arr){
    var reversed = arr.slice();
    reversed = reversed.reverse();
    return reversed;
}

var testArray = [2,4,5,76,89,3];
console.log('original array: '+ testArray);
console.log('reversed array: ' + reverseArray(testArray));
