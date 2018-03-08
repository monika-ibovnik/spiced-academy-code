var sum = 0;

var totaler = function getTotaler(num){
    sum += num;
    return sum;
};
totaler(1); //1
totaler(2); //3
totaler(5); //8
console.log(totaler(6));
