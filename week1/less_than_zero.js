/**
Write a function called getLessThanZero that expects an array of numbers to be passed to it and returns a new array containing only those numbers from the array that was passed in that are less than zero.
*/

function getLessThanZero(arr){
    return arr.filter(function(value){
        return value<0;
    });
}

console.log(getLessThanZero([-2, 5, 6, 7, -100, -21, 6, 7]));
