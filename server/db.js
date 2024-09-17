import express, { response } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import session from 'express-session';
import cookieParser from 'cookie-parser';   
import bodyParser from 'body-parser';



const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST", "GET", "PUT", "DELETE"],
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

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

app.get('/livros', (req, res) => {
  const sql = "SELECT titulo, autor, editora, preco, paginas, quantidade, imagem FROM livros";
  
  db.query(sql, [], (err, data) => {
    if (err) {
      return res.status(400).json({ message: 'Erro ao buscar livros', error: err });
    } else {
      return res.status(200).json(data);
    }
  });
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
        request.session.email = data[0].email;
        request.session.cpf = data[0].cpf;
        request.session.telefone = data[0].telefone;
        request.session.password = data[0].senha;
        return response.json({Login: true, username: request.session.username});
      } else {
        return response.json("credenciais invalidas");
      }
    });
  });

  app.get('/perfil', (require, response) =>{
    if(require.session.username){
      const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";  
        return response.json({valid: true, username: require.session.username, email: require.session.email, 
          cpf: require.session.cpf, telefone: require.session.telefone
        })
    }else{
        return response.json({valid:false})
    }
})

app.put('/perfil', (request, response) => {
  const sql = "UPDATE usuario SET nome = ?, email = ?, telefone = ?, senha = ? WHERE cpf = ?";

  let passwordToUpdate = request.body.password;

  if (!passwordToUpdate || passwordToUpdate.trim() === '') {
    passwordToUpdate = request.session.password; 
    
  }

  db.query(sql, [
    request.body.nome,
    request.body.email,
    request.body.telefone,
    passwordToUpdate, 
    request.session.cpf
  ], (err, data) => {
    if (err) {
      return response.json("erro");
    }

   
    if (data.affectedRows > 0) {
      response.json({
        valid: true,
        nome: request.body.nome,
        email: request.body.email,
        telefone: request.body.telefone
      });
    } else {
      return response.json("Dados não inseridos");
    }
  });
});

app.post('/sair', (request, response) => {
  request.session.destroy(err => {
      if (err) {
          return response.status(500).json({ error: "Erro ao sair da sessão" });
      }
      response.clearCookie('connect.sid', { path: '/' });
      console.log('chegou aqui')
      return response.json({ valid: false});

  });
});

app.post('/cadastroLivros', (request, response)=>{
  const sql = "INSERT INTO livros (titulo, isbn, cpf_proprietario, autor, editora, preco, paginas, quantidade, imagem ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
  db.query(sql, [
    request.body.titulo,
    request.body.isbn, 
    request.session.cpf,
    request.body.autor,
    request.body.editora,
    request.body.preco,
    request.body.paginas, 
    request.body.quantidade, 
    request.body.imagem
  ], (err, data)=>{
    if(err) return response.json("erro");
    if(data.affectedRows > 0){
      return response.json({valid: true})
    }
  })
})

app.get('/meus-livros', (require, response) => {
  if (require.session.username) {
    const cpfProprietario = require.session.cpf; 
    const sql = "SELECT * FROM livros WHERE cpf_proprietario = ?"; 
    
    db.query(sql, [cpfProprietario], (err, results) => {
      if (err) {
        console.error('Erro ao buscar livros:', err);
        return response.status(500).json({ valid: false, message: 'Erro ao buscar livros' });
      }
      return response.json({
        valid: true,
        livros: results 
      });
    });
  } else {
    return response.json({ valid: false, message: 'Usuário não autenticado' });
  }
});
app.delete('/apagar-livro', (request, response) => {
  const sql = 'DELETE FROM livros WHERE isbn = ?';
  
  db.query(sql, [request.body.isbn], (err, data) => {
    if (err) {
      console.error('Erro ao excluir o livro:', err);
      return response.status(500).json({ valid: false, message: 'Erro ao excluir o livro' });
    }

    if (data.affectedRows > 0) {
      return response.json({ valid: true, message: 'Livro excluído com sucesso' });
    } else {
      return response.status(404).json({ valid: false, message: 'Livro não encontrado' });
    }
  });
});
  

app.listen(8082, ()=>{
    console.log("servidor conectado");
})