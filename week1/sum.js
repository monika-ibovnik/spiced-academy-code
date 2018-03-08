/**
Write a function that takes any number of numbers as parameters and returns the sum of those numbers.
*/
function sum(){
    var sum = 0;
    for(var i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    console.log(sum);
}

sum(2,3);
sum(5, 10, 15); //30;
sum(5, 10, 15, 100, 200); //330
