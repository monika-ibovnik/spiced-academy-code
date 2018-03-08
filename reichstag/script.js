var hamburgermenu = document.getElementById('hamburgermenu');
var menu = document.querySelector('nav');
var exit = document.getElementById('exitClick');
var overlay = document.getElementById('container-overlay');




hamburgermenu.addEventListener('click', function fn(e){
    e.stopPropagation();
    menu.classList.add('active');
    overlay.classList.add('visible');
});

exit.addEventListener('click', function fn(){
    menu.classList.remove('active');
    overlay.classList.remove('visible');
});

overlay.addEventListener('click', function fn(){
    menu.classList.remove('active');
    overlay.classList.remove('visible');
});


function showModal(){
    $('#modal').css('visibility', 'visible');
    $('#container-overlay').addClass('modal');
}

$(document).ready(function(){
    setTimeout(showModal, 1000);
});

$('#modalX').on('click', function(){
    $('#modal').css('visibility', 'hidden');
    $('#container-overlay').removeClass('modal');
});
