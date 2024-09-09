const express = require('express');
const basicAuth = require('express-basic-auth');
const mysql = require('mysql');
const cors = require('cors');
const port = 3001;
const app = express();

const SECRET_KEY = "playfunkgeneration";

app.use(express.json());
app.use(cors());

let database = "aplicacaopi3";

const banco = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: database
});

banco.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados', err);
    return;
  }
  console.log('Conectado ao banco:', database);
});

function userAuthorizer(username, password, cb) {
  const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
  banco.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Erro na consulta do banco de dados:', err);
      return cb(null, false);
    }
    cb(null, results.length > 0);
  });
}

app.use(basicAuth({
  authorizer: userAuthorizer,
  authorizeAsync: true,
  challenge: true
}));

app.use((req, res, next) => {
  const user = basicAuth(req);
  if (user) {
    const sql = "SELECT * FROM usuario WHERE email = ?";
    banco.query(sql, [user.name], (err, results) => {
      if (err) {
        console.error('Erro ao obter dados do usuário:', err);
        return res.status(500).send('Erro interno do servidor');
      }
      req.user = results[0];
      next();
    });
  } else {
    next();
  }
});

//login funcionando bem
//falta hasheamento
//melhorar os dados retornados
app.post('/login', (request, response)=>{

  if(request.body.email == null || request.body.password == null){
    return response.json("campo em branco")
  }

  const sql= "SELECT * FROM usuario WHERE email = ? AND senha = ?"

  banco.query(sql, [request.body.email, request.body.password], (err, data)=>{
    if(err) return response.json("Erro ao consultar o banco");
    if(data.length>0){
      return response.json("ok")
    }else{
      return response.json("credenciais invalidas")
    }
  })

})


//falta inserir hasheamento na senha
//melhorar os dados retornados
app.post('/cadastro', (request, response)=>{
  const sql = "INSERT INTO usuario (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?);"
  banco.query(sql, [
    request.body.nome,
    request.body.email, 
    request.body.cpf,
    request.body.telefone,
    request.body.password
  ], (err, data)=>{
    if(err) return response.json("erro");
    if(data.length>0){
      return response.json("Dados não inseridos")
    }else{
      return response.json("ok")
    } 
  })
})


app.get('/', (req, res) => {
  res.send('Olá, Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor executando em:  http://localhost:${port}`);
});
