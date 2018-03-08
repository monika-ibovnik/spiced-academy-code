/**
Make a page that has on it an element that is 100px by 100px in size and has a solid black border. When the user mouses down on this box, its background should change to a randomly selected color. When the user mouses up on it, its background should change to another randomly selected color.
*/

var box = document.getElementById('box');
box.addEventListener('mousedown', function(){
    box.style.backgroundColor ='rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
});
box.addEventListener('mouseup', function(){
    box.style.backgroundColor ='rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
});
