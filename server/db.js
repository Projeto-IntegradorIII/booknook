import express, { response } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import session from 'express-session';
import cookieParser from 'cookie-parser';   
import bodyParser from 'body-parser';


const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST", "GET"],
    credentials:true
}));

app.use(express.json()); 
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret:'playfunkgeneration',
    resave: false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000 * 60 * 60 * 24
    }
}))

let database = "aplicacaopi3";

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: database
});

app.get('/', (require, response) =>{
    if(require.session.username){
        return response.json({valid:true, username: require.session.username})
    }else{
        return response.json({valid:false})
    }
})

app.post('/cadastro', (request, response)=>{
    const sql = "INSERT INTO usuario (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?);"
    db.query(sql, [
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
  app.post('/login', (request, response) => {
    if (request.body.email == null || request.body.password == null) {
      return response.json("campo em branco");
    }
    const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
    db.query(sql, [request.body.email, request.body.password], (err, data) => {
      if (err) return response.json("Erro ao consultar o banco");
      if (data.length > 0) {
        request.session.username = data[0].nome;
        return response.json({Login: true, username: request.session.username});
      } else {
        return response.json("credenciais invalidas");
      }
    });
  });

app.listen(8082, ()=>{
    console.log("servidor conectado");
})