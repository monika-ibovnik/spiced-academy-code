function slide(){
    var carousel = document.querySelector('#carousel');
    var imgArr = document.querySelectorAll('img');
    imgArr = [].slice.call(imgArr);
    var elementIn;
    var elementOut;
    var num = 1;
    imgArr[0].classList.add('in');

    (function slideImage(num){
        if(num == 0){
            elementOut = imgArr[imgArr.length-1];
        }else{
            elementOut = imgArr[num-1];
        }
        elementIn = imgArr[num];
        setTimeout(function(){
            elementIn.classList.add('in');
            elementOut.classList.remove('in');
            elementOut.classList.add('out');
            num++;
            if(num == imgArr.length){
                num = 0;
                slideImage(num);
            }else{
                slideImage(num);
            }
        }, 1000);
    })(num);
    //addEventListener
    carousel.addEventListener('transitionend', function(e){
        if(e.target.classList.contains('out')){
            e.target.classList.remove('out');
            console.log('out!');
        }
    });
}
slide();
