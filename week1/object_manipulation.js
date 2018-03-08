'use strict';

var a = {
    Berlin: 'Germany',
    Paris: 'France',
    'New York': 'USA'
};

var b = {};

for(var value in a){
    b[a[value]] = value;
}

console.log(a);
console.log(b);
