const express = require('express');

//chamando a função exportada pelo express 
const server = express();

// Query params = ?users=1
// Route params = /users/1
// Request body = put/post {nome: "Carlos", Sobrenome: "Henrique"}

// localhost:3000/users
server.get('/users', (req, res) => {
    // send() retorna um texto no frontend
    // return res.send('Hello Word');

    // pegando params via query params => localhost:3000/users?nome=Carlos
    const nome = req.query.nome

    // retornando um json
    return res.json({ message: `Hello ${nome}` }); 
})

// Route params
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    return res.json({message: `Buscando o usuario ${id}`})
})


// Request body

const users = ['Carlos Henrique', 'Roberio', '1000tu'];

server.get('/listagem/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
})

// porta chamada na inicialização do servidor
server.listen(3000);
