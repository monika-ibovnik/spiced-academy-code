const fs = require('fs');
function readdirFunction(path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, files) {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}
function statsFunction(path){
    return new Promise(function(resolve, reject){
        fs.stat(path, function(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

module.exports = {
    readdir: readdirFunction,
    stats : statsFunction
};
