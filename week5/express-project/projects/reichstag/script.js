var hamburger = document.querySelector('a #hamburger');
var nav = document.querySelector('nav');
var ex = document.getElementById('exit');
var exitClick = document.getElementById('exitClick');

hamburger.addEventListener('click', function(){
    event.stopPropagation();
    nav.classList.add('active');
    exitClick.classList.add('activeExit');
});


ex.addEventListener('click', function(){
    nav.classList.remove('active');
    exitClick.classList.remove('activeExit');
});

exitClick.addEventListener('click', function(){
    nav.classList.remove('active');
    exitClick.classList.remove('activeExit');
});
