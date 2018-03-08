'use strict';
/**
"undefined!"
"null!"
"number!"
"not a number!"
"string!"
"boolean!"
"function!"
"object!"
"array!"
"I have no idea!"
*/
function logType(value){
    if(value === undefined){
        console.log('undefined!');
    }else if(value === null){
        console.log('null!');
    }else if(isNaN(value)  && typeof value === 'number'){
        console.log('not a number!');
    }else if(typeof value ==='number'){
        console.log('number!');
    }else if(typeof value ==='string'){
        console.log('string!');
    }else if(typeof value === 'object' && Array.isArray(value)){
        console.log('array!');
    }else if(typeof value ==='function'){
        console.log('function!');
    }else if(typeof value === 'boolean'){
        console.log('boolean!');
    }else if(typeof value === 'object'){
        console.log('object!');
    }else{
        console.log('I have no idea!');
    }
}
var f = function(){};

logType(undefined);
logType(null);
logType(5);//???????
logType(NaN);
logType('hello');
logType(true);
logType(f);
logType({});
logType([0,2,3]);
