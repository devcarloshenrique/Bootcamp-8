const express = require('express');

//chamando a função exportada pelo express 
const server = express();

// middleware global
server.use(express.json());

server.use(( req, res, next ) => {

    console.time('Request');

    console.log(`Método: ${req.method}; URL: ${req.url}; `);

    next();

    console.log('Finalizou')
})

// Middleware local checando o campo name, se está preenchido.
function checkUserExists(req, res, next) {
    if( !req.body.name ) {
        return res.status(400).json({ erro: "User not found on request body"});
    }
    return next();
}

function checkUserInArray(req, res, next ){
    const user = users[req.params.index]
    
    if(!user){
        return res.status(400).json({ erro: "User does not exists" });
    }

    // Passando esse novo atributo para essa variável, as funções seguintes teram acesso á esse atributo (req.user)
    req.user = user

    return next();
}

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
server.get('/users/:id', checkUserInArray, (req, res) => {
    const id = req.params.id;

    return res.json({message: `Buscando o usuario ${id}`})
})

// CRUD

// Request body
const users = ['Carlos Henrique', 'Roberio', '1000tu'];

// Listar users
server.get('/listagem', (req, res) => {
    return res.json(users);
})

// Buscar por user pelo id
server.get('/listagem/:index',checkUserInArray , (req, res) => {
    // const { index } = req.params;
    // return res.json(users[index]);


    return res.json(req.user);
})

// cadastrando nome usuario
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
})

// editando nome usuario
server.put('/users/:index',checkUserInArray ,checkUserExists, ( req, res ) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users)
})

// deletando usuario 
server.delete('/users/:index', checkUserInArray, ( req, res ) => {
    const { index } = req.params;

    users.splice(index, 1)

    return res.json(users)
})

// porta chamada na inicialização do servidor
server.listen(3000);
