const fsPromises = require('./promisesModule.js');
const path = `${__dirname}\\files`;

const readdir = fsPromises.readdir;
const stats = fsPromises.stats;

function logDirectory(path){
    return readdir(path).then(files => {
        return Promise.all(files.map(file=>{
            return stats(`${path}\\${file}`).then(stat =>{
                if(stat.isDirectory()){
                    console.log(`${path}\\${file} is a directory`);
                    return logDirectory(`${path}\\${file}`);
                }else{
                    console.log(`${path}\\${file} is a file`);
                }
            });
        }));
    });
}

logDirectory(path).then(()=>console.log('done'));
