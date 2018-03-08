'use strict';
(function(){
    function askForNumber(){
        var num = prompt('Insert a number between 1 and 10');
        try{
            num = parseInt(num);
            if(isNaN(num)){
                throw('Not a valid number');
            }else if(typeof num !== 'number'){
                throw('Not a valid number');
            }else if(num < 1 || num > 10){
                throw('Not a valid number');
            }else{
                return num;
            }
        }catch(e){
            return e;
        }
    }
    function translateNumberToGerman(){
        var deNum = ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'];
        try{
            var answer = askForNumber();
            if(typeof answer == 'string'){
                throw answer;
            }
        }catch(e){
            console.log(e);
            return translateNumberToGerman();
        }
        return deNum[answer-1];
    }
    console.log(translateNumberToGerman());
})();
