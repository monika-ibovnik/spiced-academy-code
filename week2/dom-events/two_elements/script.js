
var big = document.getElementById('big');
var small = document.getElementById('small');

big.addEventListener('mousedown', function(){
    big.style.backgroundColor = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
});

small.addEventListener('mousedown', function(e){
    e.stopPropagation();
    small.style.backgroundColor = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
});
