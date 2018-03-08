var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var adventureGame = {
    q: "Do you want to play a game?\n(write the whole answer or just the number)\n",
    a: {
        yes: {
            q: "You walk. Left or right? ",
            a: {
                left: {
                    q:"You meet a bored zombie. Do you want to say hello?",
                    a: {
                        yes: "Great! The bored zombie eats your brain.",
                        no: "You run away. Goodbye!"
                    }
                },
                right: {
                    q : "You meet a Yeti with cold feet. Do you want to say hello?",
                    a: {
                        yes: "Yeti ignores you.",
                        no: "You walk away"
                    }
                }
            }
        },
        no: "Ok, then goodbye"
    }
};
function checkOptions(gameObject){
    var options = [];
    for (var key in gameObject.a){
        options.push(key);
    }
    return options;
}
function printOptions(arr){
    var answer = '';
    for(var i = 0; i < arr.length; i++){
        answer += '[' + (i+1) + '] ' + arr[i] + '\n';
    }
    answer += '[x] exit\n';
    return answer;
}

function playAdventure(gameObject){
    rl.question(gameObject.q+'\n'+printOptions(checkOptions(gameObject)), function(answer){
        var optionsArr = checkOptions(gameObject);
        if(answer.toLowerCase() == 'x' || answer.toLowerCase() == 'exit'){
            console.log("Have a nice day!");
            rl.close();
        }else if(optionsArr.indexOf(answer) != -1 || optionsArr[answer-1]){
            if(!isNaN(Number(answer))){
                answer = optionsArr[answer-1];
            }
            if(typeof gameObject.a[answer] !== 'object' && gameObject.a !== null){
                console.log(gameObject.a[answer]);
                console.log('The End');
                rl.close();
            }else{
                playAdventure(gameObject.a[answer]);
            }
        }else{
            console.log('I can\'t understand you');
            playAdventure(gameObject);
        }
});

}
playAdventure(adventureGame);
