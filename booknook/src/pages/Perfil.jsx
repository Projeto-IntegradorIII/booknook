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

    function excluirLivro(isbn){
      axios.defaults.withCredentials = true;
      axios
          .delete("http://localhost:8082/apagar-livro", {data:{isbn}})
          .then((response)=>{
            if(response.data.valid){
              window.location.reload();
            }
          })
    }

    return (
      <div>
        <Menu/>
          <div>
        <div >
          <form onSubmit={handleSubmit}>
            <div className='body'>
              <h1 id='titulo1'>Perfil de {nome}</h1>

              <label htmlFor="nome" className='labelnome'>Nome</label>
              <input
                type="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <label htmlFor="email" className='labelemail'>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="cpf" className='labelcpf'>CPF</label>
              <input
                type="text"
                disabled="disable"
                placeholder={cpf}
                
                
              />

              <label htmlFor="telefone" className='labeltel'>Telefone</label>
              <input
                type="tel"
                value={telefone}
                
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div className='labelsenha'>
              <label htmlFor="password" >Senha</label>
              <input
                type="password"
                placeholder="Insira sua nova senha"
                
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='bntperfil'>Salvar</button>

            <div className="perfil-imagem">
      <img src="https://static.vecteezy.com/ti/fotos-gratis/t2/22653879-fantasia-ilha-com-cachoeiras-3d-ilustracao-elementos-do-isto-imagem-mobiliado-de-nasa-generativo-ai-gratis-foto.jpg" alt="imagemperfil" />
    </div>
          </form>
        </div>
        <div className='seuslivros'>
          <h1 id='titulo2'>Seus livros</h1>
          <ul>
            {livros.length > 0 ? (
              livros.map((livro, index) => (
                <li key={index} className='listalivros'>
                  <h3>{livro.titulo}</h3>
                  <p>Autor: {livro.autor}</p>
                  <p>ISBN: {livro.isbn}</p>
                  <p>Editora: {livro.editora}</p>
                  <p>Preço: {livro.preco}</p>
                  <p>Páginas: {livro.paginas}</p>
                  <p>Quantidade: {livro.quantidade}</p>
                <p>  <button onClick={()=>excluirLivro(livro.isbn)} className='bntexcluir'>Excluir</button></p>
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
