const handlebars = require('express-handlebars');
const express = require('express');

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');



app.use(express.static('./projects'));
app.use(express.static('./css'));

const projectsModule = require("./projects-module.js");
const projects = projectsModule.projects;

app.get('/projects/:projectName', (request, response) => {
    let projectInfo = projectsModule.findProject(request.params.projectName);
    if(projectInfo){
        response.render('projectpage', {projectList: projects, layout: 'layout', info: projectInfo});
    }
});

app.get('/', (request, response) => {
    response.render('index', {projectList: projects, layout: 'layout'});
});

app.listen(8080, () => console.log("Listening..."));
