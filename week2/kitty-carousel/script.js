var imgs = document.querySelector('#imgs');
var carousel = document.querySelector('#carousel');
var nav = document.createElement('nav');

//generate divs for navigation, allows to add more pictures to the carousel
(function generateNav(){
    carousel.append(nav);
    var div;
    for(var i = 0; i < imgs.children.length; i++){
        div = document.createElement('div');
        div.classList.add('navi');
        nav.append(div);
    }
})();

//carousel functionality
imgs.firstElementChild.classList.add('in');
nav.firstElementChild.classList.add('current');
var currentImg;
var timeout;
function slideImage(imgElement){
    var index = Array.prototype.indexOf.call(imgs.children, imgElement);
    var navElement = nav.children[index];
    var nextImg;
    var nextNavi;
    currentImg = imgElement;
    if(imgElement.nextElementSibling === null){
        nextImg = imgs.firstElementChild;
        nextNavi = nav.firstElementChild;
    }else{
        nextImg = imgElement.nextElementSibling;
        nextNavi = navElement.nextElementSibling;
    }
    timeout = setTimeout(function(){
        //img class
        nextImg.classList.add('in');
        imgElement.classList.remove('in');
        imgElement.classList.add('out');
        //nav element class
        navElement.classList.remove('current');
        nextNavi.classList.add('current');
        slideImage(nextImg);
    }, 3000);
}

slideImage(imgs.firstElementChild);

//event listeners
carousel.addEventListener('transitionend', function(e){
    if(e.target.classList.contains('out')){
        e.target.classList.remove('out');
    }
});

nav.addEventListener('click', function(e){
    var index = Array.prototype.indexOf.call(nav.children,e.target);
    var currentImgIndex = Array.prototype.indexOf.call(imgs.children, currentImg);
    if(index !== currentImgIndex){
        clearTimeout(timeout);
        for(var i = 0; i < nav.children.length; i++){
            nav.children[i].classList.remove('current');
        }
        nav.children[index].classList.add('current');
        var newImage = imgs.children[index];
        newImage.classList.add('in');
        currentImg.classList.remove('in');
        currentImg.classList.add('out');
        slideImage(newImage);
    }
});
