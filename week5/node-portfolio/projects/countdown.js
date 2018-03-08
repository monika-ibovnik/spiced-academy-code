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
