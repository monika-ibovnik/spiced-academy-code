const fs = require('fs');
const path = __dirname+'\\files';

function logDirAsync(directory){
    var items = fs.readdir(directory, function(err, items){
        if(err){
            console.log('Error:', err);
        }else{
            for(var i = 0; i<items.length; i++){
                let newPath = directory+'\\'+items[i];
                fs.stat(newPath, function(err,stats){
                    if(err){
                        console.log(err);
                    }else{
                        if(stats.isDirectory()){
                            logDirAsync(newPath);
                        }
                    }
                });
            }
            //log your directory
            items = items.join(', ');
            var log = directory + ' contains ' + items;
            console.log(log);
        }
    });
}

logDirAsync(path);
