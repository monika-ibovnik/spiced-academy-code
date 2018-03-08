const fs = require('fs');
const path = __dirname + '\\files';
var dirObject = {};

function logDirSync(directory, object){
    var items = fs.readdirSync(directory);
    var itemString = items.join(', ');
    console.log(directory + ' consists of ' + itemString);
    items.forEach(item => {
        let newPath = directory+'\\'+ item;
        let stats = fs.statSync(newPath);
        if(stats.isDirectory()){
            object[item] = {};
            logDirSync(newPath, object[item]);
        }else{
            object[item] = stats.size;
        }
    });
}

logDirSync(path, dirObject);
var json = JSON.stringify(dirObject, null, 4);
var save = fs.writeFileSync('./files.json', JSON.stringify(dirObject, null, 4));
