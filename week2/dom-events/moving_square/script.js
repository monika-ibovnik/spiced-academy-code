var elem = document.getElementById('element');
document.addEventListener('mousemove', function(e){
    elem.style.visibility = 'visible';
    elem.style.top = e.pageY+'px';
    elem.style.left = e.pageX+'px';
});
