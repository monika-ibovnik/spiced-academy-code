function getByClassName(className){
    var classArr = [];
    (function search(element){
        var children = element.children;
        for(var i=0; i<children.length; i++){
            if(children[i].classList.contains(className)){
                classArr.push(children[i]);
            }
            search(children[i]);
        }
    })(document);
    return classArr;
}

console.log(getByClassName('lolcat'));
