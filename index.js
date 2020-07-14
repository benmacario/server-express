const express = require('express');

const server = express();

server.use(express.json());

// CRUD

const projects = [];
let calc = 0;

// // Middlewares
function cleckProject(request, response, next) {
  const { id } = request.params;

  projects.map(project => {
    if(id === project.id) {
      return next();
    };
  });

  return response.status(400).json({ error: "Project is not exist" })
};

function calcRequestTotal(request, response, next) {
  console.log(`Request numbers: ${++calc}`);

  return next();
};

// //

server.get('/projects', calcRequestTotal, (request, response) => {
  response.json(projects);
});

server.post('/projects', calcRequestTotal, (request, response) => {
  const project = request.body;

  projects.push(project);

  response.send();
});

server.post('/projects/:id/task', calcRequestTotal, cleckProject, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  projects.map(project => {
    if( id === project.id ) {
      project.tasks.push(title);
    }
  });

  response.send();
});

server.put('/projects/:id', calcRequestTotal, cleckProject, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  projects.map(project => {
    if( id === project.id ) {
      project.title = title;
    }
  });

  response.send();
});

server.delete('/projects/:id', calcRequestTotal, cleckProject, (request, response) => {
  const { id } = request.params;

  projects.map((elem, index) => {
    if(id === elem.id) {
      console.log(elem)
      projects.splice(index, 1);
    };
  });

  response.send();
});

//

server.listen(3333);