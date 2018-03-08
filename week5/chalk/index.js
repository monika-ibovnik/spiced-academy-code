const http = require('http');
const qs = require('querystring');
const chalk = require('chalk');

const server = http.createServer((request, response) => {
    const {method} = request;
    //console.log(method);
    request.on('error', (err) => {
        console.log(err);
    });
    response.on('error', (err) => {
        console.log(err);
    });
    if(method == 'GET'){
        response.statusCode = 200;
        response.setHeader('content-type','text/html');
        response.write(`<!doctype html>
                        <html>
                            <head>
                                <title>Colors</title>
                            </head>
                            <body>
                                <form method="POST">
                                    <input type="text" name="text">
                                    <select name="color">
                                        <option value="red">red</option>
                                        <option value="blue">blue</option>
                                        <option value="green">green</option>
                                        <option value="yellow">yellow</option>
                                        <option value="gray">gray</option>
                                        <option value="magenta">magenta</option>
                                        <option value="cyan">cyan</option>
                                    </select>
                                    <button type="submit">Go</button>
                                </form>
                            </body>
                        </html>`);
        response.end();
    }else if(method == 'POST'){
        var body = '';
        request.on('data', (data) => {
            body += data;
            if(body.length > 1e6){
                request.connection.destroy();
            }
        });
        request.on('end', () => {
            var obj = qs.parse(body);
            if(!obj.text){
                response.setHeader('Location', '/');
                response.statusCode = 302;
            }else{
                response.setHeader('content-type', 'text/html');
                response.statusCode = 200;
                response.write(`<!doctype html>
                                <html>
                                    <title>${obj.text}</title>
                                    <a href="/" style="color:${obj.color};">${obj.text}</a>
                                </html>`);
                console.log(chalk[obj.color](obj.text));
            }
            response.end();
        });
    }
});

server.listen(8080, ()=>{console.log('Listening...');});
