const express = require('express');

// chamando a função express
const server = express();

// MiddleWares Globais
server.use(express.json());

server.use((req, res, next) => {
  console.time('Request');

  console.log(`Método: ${req.method}; URL: ${req.url}; `);
  
  next();
});

// Verificação ID 

function checkUserInArray(req, res, next) {
  const user = dataBase[req.params.index];

  if(!user){
    return res.status(400).json({ erro: "ID inexistente" });
  }

  req.user = user 

  console.log(user)
  
  return next();
}

const dataBase = [];

// Criar nova tarefa
server.post('/projects', (req, res) => {

  const { id, title, tasks} = req.body;

  dataBase.push({id, title, tasks});

  return res.json(dataBase);

});

// Listar Tarefas
server.get('/projects', (req, res) => {

  return res.json({dataBase});

})

// Editar Tarefa
server.put('/projects/:index', checkUserInArray, (req, res) => {

  const { index } = req.params;

  const { id, title, tasks} = req.body;

  dataBase[index] = {id, title, tasks};

  return res.json(dataBase[index]);

})

// Deletar Tarefa
server.delete('/projects/:index', checkUserInArray, ( req, res ) => {

  dataBase.splice(req.user.index, 1);

  return res.json(dataBase);

});

// Criar Tanks por ID
server.post('/projects/:index/tasks', checkUserInArray, ( req, res ) => {
  
  const { index } = req.params;

  const { title } = req.body;

  dataBase[index].tanks = [`${ title }`];

  return res.json(dataBase[index]);
})

// porta que será inicializada o servidor
server.listen(3000);


