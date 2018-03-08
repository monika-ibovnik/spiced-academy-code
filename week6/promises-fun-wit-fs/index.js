const fsPromises = require('./promisesModule.js');
const path = `${__dirname}\\files`;

fsPromises.readdir(path).then(files=>{
    return files.map(value => {
        return fsPromises.stats(`${path}\\${value}`).then(stats =>{
            if(stats.isDirectory()){
                console.log(`${path}\\${value} is a directory`);
            }else{
                console.log(`${path}\\${value} is not a directory`);
            }
        }).catch(err=>{
            console.log(err);
        });
    });
}).then((arr)=>{
    Promise.all(arr).then(()=>{
        console.log('done');
    }).catch(()=>{
        console.log('at least one got rejected');
    });
}).catch(err=>{
    console.log(err);
});
