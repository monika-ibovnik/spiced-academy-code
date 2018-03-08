const fs = require('fs');
const http = require('http');
const path = require('path');
const contentTypeObject = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'text/javascript',
    '.json' : 'application/json',
    '.gif' : 'image/gif',
    '.jpg' : 'image/jpge',
    '.png' : 'image/png',
    '.svg' : 'image/svg+xml'
};
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
        let index = -1;
        function checkObject(fileObject){
            while(index < urlArr.length-1){
                index++;
                if(fileObject[urlArr[index]]){
                    return checkObject(fileObject[urlArr[index]]);
                }else{
                    return false;
                }
            }
            return true;
        }
        return checkObject(validFiles);
    }
}//serverstuff
const server = http.createServer((request, response) => {
    const {method} = request;
    var {url} = request;
    request.on('error', err => console.log(err));
    response.on('error', err => console.log(err));

    console.log(method, url);

    if(method != 'GET'){
        response.setHeader('Location', '/');
        response.statusCode = 302;
        response.end();
    }else{
        //write the file tree
        if(!checkValidUrl(url) || url == '/'){
            response.statusCode = 404;
            response.write('404');
            response.end();
        }else if(url != '/' && path.extname(url)==''){
            let p = `${__dirname}\\projects\\${path.parse(url).dir.slice(1)}\\${path.parse(url).name}\\`;
            fs.stat(p, (err,stats) => {
                if(stats.isDirectory()){
                    if(!url.endsWith('/')){
                        url = url+'/';
                    }
                    let path = `${url}index.html`;
                    //console.log('SECOND PATH',path);
                    response.setHeader('Location', `${url}index.html`);
                    response.statusCode = 302;
                    response.end();
                }
            });
        }else{
            response.statusCode = 200;
            let contentType = contentTypeObject[path.extname(url)];
            if(contentType){
                response.setHeader('content-type', contentType);
            }
            const readStream = fs.createReadStream(__dirname + '/projects' + url);
            readStream.pipe(response);
            readStream.on('error', err => console.log(err));
        }
    }
});

server.listen(8080, () => {
    console.log('Listening...');
});
