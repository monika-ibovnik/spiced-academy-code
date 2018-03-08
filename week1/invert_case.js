/**
Write a function called invertCase that expects a string as a parameter. This function should return a new string with all the same characters as the string that was passed in but with the cases of the alphabetic characters switched. Uppercase characters should become lowercase and lowercase letters should become uppercase. Characters that are not alphabetic should not change. String.prototype.toUpperCase and String.prototype.toLowerCase will come in handy here.
*/

function invertCase(str){
    var arr = str.split('');
    for(var i = 0; i < arr.length; i++){
        var code = arr[i].charCodeAt();
        if(code >= 97 && code <=122){
            arr[i] = arr[i].toUpperCase();
        }else if(code >= 65 && code <= 90){
            arr[i] = arr[i].toLowerCase();
        }else{
            continue;
        }
    }
    var answer = arr.join('');
    return answer;
}
var string = 'KJkjdfadfF';
console.log(string);
console.log(invertCase('KJkjdfadfF'));
