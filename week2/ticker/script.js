(function cat(){
    var catTicker = document.getElementById('catTicker');
    catTicker.style.left = '50%';
    var offset = catTicker.getBoundingClientRect().left;
    var myRequest;

    function moveTicker(){
        var element = document.querySelector('#catTicker a');
        offset--;
        if(offset <= 0 - element.offsetWidth){
            catTicker.appendChild(element);
            offset = 0;
        }
        catTicker.style.left = offset + 'px';
        myRequest = requestAnimationFrame(moveTicker);
    }
    moveTicker();

    catTicker.addEventListener('mouseover', function(){
        cancelAnimationFrame(myRequest);
    });
    catTicker.addEventListener('mouseout', function(){
        moveTicker();
    });
})();

(function doge(){
    var dogeTicker = document.getElementById('dogeTicker');
    dogeTicker.style.right = '50%';
    var offset = dogeTicker.getBoundingClientRect().right;
    var myRequest;

    function moveTicker(){
        var element = document.querySelectorAll('#dogeTicker a');
        offset--;
        if(offset <= 0 - element[element.length-1].offsetWidth){
            dogeTicker.insertBefore(element[element.length-1], element[0]);
            offset = 0;
        }
        dogeTicker.style.right = offset + 'px';
        myRequest = requestAnimationFrame(moveTicker);
    }
    moveTicker();

    dogeTicker.addEventListener('mouseover', function(){
        cancelAnimationFrame(myRequest);
    });
    dogeTicker.addEventListener('mouseout', function(){
        moveTicker();
    });
})();
