/**
Write a function that expects a string representing a selector to be passed as a parameter. The function should find all the elements in the document that match the selector and change their style so that the text they contain is italic, underlined, and bold.

Write a function that expects a string representing a class name to be passed as a parameter. The function should return an array containing all the elements in the document that have the class that was passed in.

Write a function that inserts an element into the body of the currently loaded page. That element should have fixed position, z-index of 2147483647, left of 20px, top of 100px, font-size of 200px, and contain the text 'AWESOME'.*/
function changeSelector(selector){
    var elementsArr = document.querySelectorAll(selector);
    elementsArr = Array.prototype.slice.call(elementsArr);

    for(var i = 0; i < elementsArr.length; i++){
        elementsArr[i].style.textDecoration = 'underline';
        elementsArr[i].style.fontWeight = 'bold';
        elementsArr[i].style.fontStyle = 'italic';
    }
}

function classArray(className){
    var arr = document.getElementsByClassName(className);
    return arr;
}

function insertElement(elem){
    var newElement = document.createElement(elem);
    newElement.style.position = 'fixed';
    newElement.style.color = 'DarkBlue';
    newElement.style.top = '100px';
    newElement.style.left = '20px';
    newElement.style.zIndex = '2147483647';
    newElement.style.fontSize = '200px';
    newElement.innerHTML = "AWESOME";
    document.body.append(newElement);
}


changeSelector('h2');
console.log(classArray('lolcat'));
insertElement('p');
