/*
Write a constructor called Countdown that accepts a single argument - the number of seconds to count down. It should be possible to call the start method of instances of Countdown to initiate the countdown. Once the countdown starts, it should count down to zero starting with the number that was passed to the constructor and logging each number to the console with a one second delay.
*/
var Countdown = function(value){
    this.value = value;
    this.count = function(){
        function timeout(count){
            if(count>=0){
                setTimeout(function(){
                    console.log(count);
                    count--;
                    timeout(count);
                },1000);
            }
        }
        var count = this.value;
        timeout(count);
    };
};

var b = new Countdown(5);
b.count();
