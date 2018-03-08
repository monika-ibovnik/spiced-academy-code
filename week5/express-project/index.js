const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const hb = require('express-handlebars');

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
})); /*This will cause a an object named body containing values from submitted form data to be attached to request objects.*/
app.use(cookieParser());

app.use(function(request,response, next){
    if(request.url != '/cookie' && !request.cookies.accepted){
        response.redirect('/cookie');
    }else{
        next();
    }
});

var auth = function(request, response, next) {
    var creds = basicAuth(request);
    if (!creds || creds.name != 'duck' || creds.pass != 'sesame') {
        response.setHeader('WWW-Authenticate', 'Basic realm="Enter your credentials to see this stuff."');
        response.sendStatus(401);
    } else {
        next();
    }
};
app.use('/reichstag', auth);
app.use(express.static('./projects'));

app.get('/', function(request, response){
    response.render('startpage', { projects: ['reichtsag', 'carousel'],
                                    message: "drink lots of water",
                                    layout: "layout"});
});

app.get('/cookie', function(request, response){
    response.sendFile(`${__dirname}/cookies.html`);
});

app.post('/cookie', function(request, response){
    if(request.body.check === undefined){
        response.sendStatus(404);
    }else if(request.body.check == 'on'){
        response.cookie('accepted', 'true');
        response.redirect('/');
    }
});

app.listen(8080, () => console.log("Listening..."));
