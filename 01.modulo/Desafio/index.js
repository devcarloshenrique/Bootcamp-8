const express = require('express');

// chamando a função express
const server = express();

server.use(express.json());

const dataBase = [];

server.post('/projects', (req, res) => {
  const { id, title, tasks} = req.body;

  dataBase.push({id, title, tasks});

  return res.json(dataBase);
});

server.get('/projects', (req, res) => {
  return res.json({dataBase})
})

server.put('/projects/:index', (req, res) => {
  
  const { index } = req.params;

  const { id, title, tasks} = req.body;

  dataBase[index] = {id, title, tasks}

  return res.json(dataBase[index]);

})



// porta que será inicializada o servidor
server.listen(3000)


