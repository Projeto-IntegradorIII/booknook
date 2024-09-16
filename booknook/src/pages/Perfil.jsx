  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom'
  import "../styles/Perfil.css"
import Menu from '../components/Menu';

  function Perfil() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [password, setPassword] = useState('')
    const [livros, setLivros] = useState([])
    

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(()=>{
      axios.get('http://localhost:8082/perfil')
      .then(response=>{
        if(response.data.valid){
          setNome(response.data.username || '');  
          setEmail(response.data.email || '');
          setCpf(response.data.cpf || '');
          setTelefone(response.data.telefone || '');
        }else{
          navigate('/login')
        }
        
        return axios.get('http://localhost:8082/meus-livros');
      })
      .then(response => {
        if (response.data.valid) {
          setLivros(response.data.livros || []); 
        } else {
          setLivros([]); 
      }})
      .catch(err => console.log(err));
    }, [navigate]); 

    

    function handleSubmit(event) {
      
      event.preventDefault();
      axios.defaults.withCredentials = true;
      axios
        .put("http://localhost:8082/perfil", {nome, email , telefone, password })
        .then((response) => {
          setNome(response.data.nome);
          setEmail(response.data.email);
          setTelefone(response.data.telefone);
          if(response.data.valid){
              navigate('/');
          }
      })
        .catch((err) => console.log(err));
    }

    function excluirLivro(isnb){


    }

    return (
      <div>
        <Menu/>
          <div>
        <div >
          <form onSubmit={handleSubmit}>
            <div >
              <h1 id='titulo'>booknook de {nome}</h1>

              <label htmlFor="nome">Nome</label>
              <input
                type="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                disabled="disable"
                placeholder={cpf}
                
                
              />

              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                value={telefone}
                
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div >
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                placeholder="Insira sua nova senha"
                
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button >Salvar</button>
          </form>
        </div>
        <div>
          <h1>Seus livros</h1>
          <ul>
            {livros.length > 0 ? (
              livros.map((livro, index) => (
                <li key={index}>
                  <h3>{livro.titulo}</h3>
                  <p>Autor: {livro.autor}</p>
                  <p>ISBN: {livro.isbn}</p>
                  <p>Editora: {livro.editora}</p>
                  <p>Preço: {livro.preco}</p>
                  <p>Páginas: {livro.paginas}</p>
                  <p>Quantidade: {livro.quantidade}</p>
                   {livro.imagem && <img src={livro.imagem} alt={`Capa do livro ${livro.titulo}`} className="livro-capa" />}
                  <button onClick={()=>excluirLivro(livro.isbn)}>Excluir</button>
                </li>
                
              ))
            ) : (
              <p>Você ainda não cadastrou livros.</p>
            )}
          </ul>
        </div>
      </div>
      </div>
    );
  }

  export default Perfil;
