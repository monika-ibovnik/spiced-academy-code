const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    const {method, url, headers} = request;
    const userAgent = headers['user-agent'];
    fs.appendFile('requests.txt',  `\r${new Date()}, method: ${method}, URL: ${url}, headers: ${headers}, user-agent: ${userAgent}`, (err) => {console.log(err);});
    var body = '';

    request.on('error', (err) => {console.log(err);});
    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {
        console.log('Method:', method);
        console.log('URL:', url);
        console.log('Headers: ', headers);
    });

    response.on('error', (err) => {
        console.log(err);
    });
    response.setHeader('Lolcat', 'meow');
    if(method == 'GET' || method == 'HEAD'){
        response.statusCode = 200;
        response.setHeader('content-type', 'text/html');
        if(method == 'GET'){
            response.write(`<!doctype html>
                            <html>
                                <head>
                                    <title>Hello World</title>
                                </head>
                                <body>
                                    <p>Hello World</p>
                                </body>
                            </html>`);
        }
    }else if(method == 'POST'){
        console.log('Body:',body);
        response.setHeader('Location', '/');
        response.statusCode = 302;
    }else{
        response.statusCode = 403;
    }
    response.end();
});

server.listen(8080, ()=>{
    console.log('listening');
});
