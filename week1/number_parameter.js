
//version with a while loop
/**
function numberParameter(num){
    if(num <= 0 || typeof num !== 'number'){
        return 'ERROR';
    }else if(num > 1000000){
        return num;
    }else{
        while(num < 1000000){
            num *=10;
        }
        return num;
    }
}
*/
//version with recursion

function numberParameter(num){
    if(num <= 0 || typeof num !== 'number'){
        return 'ERROR';
    }else if(num > 1000000){
        return num;
    }else{
        var multiply = function repeat(number){
            if(number < 1000000){
                return repeat(number*10);
            }
            return number;
        };
        return multiply(num);
    }
}


console.log(numberParameter(10));
numberParameter(0);
numberParameter('hello');
numberParameter(10000000);
numberParameter(999);
