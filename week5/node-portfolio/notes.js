const fs = require('fs');
const path = require('path');
//available files
var validFiles = {};
(function logDirSync(path, hostPath, object){
    var items = fs.readdirSync(path);
    items.forEach(item => {
        let newPath = `${path}\\${item}`;
        let newHostPath = `${hostPath}${item}`;
        let stats = fs.statSync(newPath);
        if(stats.isDirectory()){
            object[item] = {};
            newHostPath += '/';
            logDirSync(newPath, newHostPath, object[item]);
        }else{
            object[item] = newHostPath;
        }
    });
})(`${__dirname}\\projects`, '/', validFiles);

function urlToArr(url){
    let parseObject = path.parse(url);
    console.log(parseObject);
    let dir = [];
    if(parseObject.dir == '/'){
        dir.push(parseObject.base);
    }else{
        let str = parseObject.dir.slice(1);
        dir = str.split('/');
        dir.push(parseObject.base);
    }
    return dir;
}

function checkValidUrl(url){
    if(url == '/'){
        return true;
    }else{
        const urlArr = urlToArr(url);
        console.log(urlArr);
        let index = -1;
        function checkObject(fileObject){
            while(index < urlArr.length-1){
                index++;
                if(fileObject[urlArr[index]]){
                    //console.log(fileObject[urlArr[index]]);
                    return checkObject(fileObject[urlArr[index]]);
                }else{
                    //console.log(fileObject[urlArr[index]]);
                    return false;
                }
            }
            return true;
        }
        return checkObject(validFiles);
    }
}
console.log('root',checkValidUrl('/'));
console.log('reichstag',checkValidUrl('/reichstag/img'));
