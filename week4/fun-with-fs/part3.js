var counter = 0;

function read(path){
    counter++;
    fs.readdir(path, function(err, files){
        counter--;
        filse.forEach(function(file){
            fs.stat(path+'/'+file, function(err,stats){
                counter--;
                if(stat.isDirectory){

                }
            })
        })
    });
}

if counter ==0){
    //write file
}
