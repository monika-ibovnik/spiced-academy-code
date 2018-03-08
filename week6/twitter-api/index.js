const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('./ticker'));
//a function to filter data from twitter JSON response
function filterData(data){
    data = data.filter(value => value.entities.urls.length == 1 && value.entities.media === undefined);
    data = data.map(value => {
        return{
            text : value.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''),
            url : value.entities.urls[0].url,
            date : value.created_at
        };
    });
    return data;
}
//get token promise
function getToken(){
    return new Promise((resolve,reject)=>{
        const customer = JSON.parse(fs.readFileSync('./consumer.json'));
        var authentication = new Buffer(`${customer.key}:${customer.secret}`).toString('base64');
        var options = {
            host : 'api.twitter.com',
            method : 'POST',
            path : '/oauth2/token',
            headers : {
                Authorization : 'Basic ' + authentication,
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        };
        const req = https.request(options, (res) => {
            var token;
            res.on('data', (d) => {
                token = JSON.parse(d);
            });
            res.on('end', () => resolve(token.access_token));
        });
        req.write('grant_type=client_credentials');
        req.on('error', (err) => reject (err));
        req.end();
    });
}
function getTwitts(token, name){
    return new Promise((resolve,reject)=>{
        var responseData='';
        const options = {
            host: 'api.twitter.com',
            method: 'GET',
            path: `/1.1/statuses/user_timeline.json?screen_name=${name}&count=100`,
            headers: {
                Authorization : 'Bearer ' + token
            }
        };
        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                responseData += d;
            });
            res.on('error', (err)=>{
                reject(err);
            });
            res.on('end', () => {
                responseData = filterData(JSON.parse(responseData));
                resolve(responseData);
            });
        });
        req.end();
    });
}

getToken()
    .then(token=>{
        Promise.all([
            getTwitts(token, 'BarackObama'),
            getTwitts(token, 'britneyspears'),
            getTwitts(token, 'TheOnion')
        ]).then(twittArr => {
            let twittsObject = {};
            //flattening the array of arrays
            twittsObject.headlines = Array.prototype.concat.apply([], twittArr);
            twittsObject.headlines.sort((a,b)=>{
                return new Date(b) - new Date(a);
            });
            console.log(twittsObject.headlines);
            app.get('/headlines.json', (req,res)=>{
                res.json(twittsObject);
            });
            app.listen(8080, ()=>console.log('listening...'));
        }).catch(()=>console.log('at least one was not resolved'));
    });
