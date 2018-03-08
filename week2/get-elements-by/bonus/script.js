/**
In your function that returns all of the elements in the page that have a given class name, do not use the classList property of elements to determine whether or not they have the class.
*/
function getByClassName(className){
    var classArr = [];
    (function search(element){
        var children = element.children;
        for(var i=0; i<children.length; i++){
            if(children[i].className === className){
                classArr.push(children[i]);
            }
            search(children[i]);
        }
    })(document);
    return classArr;
}

console.log(getByClassName('lolcat'));
