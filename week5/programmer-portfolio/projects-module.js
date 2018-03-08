const fs = require('fs');
const dirPath = `${__dirname}\\projects`;
const directories = fs.readdirSync(dirPath);

var projectList = directories.map(dir =>{
    let stats = fs.statSync(`${dirPath}\\${dir}`);
    const info = require(`${dirPath}\\${dir}\\info.json`);
    if(stats.isDirectory()){
        return {
            name: dir,
            url: `/${dir}`,
            description : info.description
        };
    }
});

function findProjectByName(propName){
    for (let i = 0; i < projectList.length; i++){
        if(projectList[i].name == propName){
            return projectList[i];
        }
    }
}
module.exports = {
    projects : projectList,
    findProject : findProjectByName
};
