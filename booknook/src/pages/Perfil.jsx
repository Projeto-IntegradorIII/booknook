import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import "../styles/Perfil.css"
import Menu from '../components/Menu';
import testeImg from '../imgs/teste.png'

function Perfil() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [password, setPassword] = useState('')
  const [livros, setLivros] = useState([])
  const [imagem, setImagem] = useState(null);
  const [log, setLog] = useState('')
  

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8082/perfil')
      .then(response => {
        if (response.data.valid) {
          setNome(response.data.username || '');
          setEmail(response.data.email || '');
          setCpf(response.data.cpf || '');
          setTelefone(response.data.telefone || '');
        } else {
          navigate('/login')
        }

        return axios.get('http://localhost:8082/meus-livros');
      })
      .then(response => {
        if (response.data.valid) {
          setLivros(response.data.livros || []);
        } else {
          setLivros([]);
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);



  function handleSubmit(event) {

    event.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .put("http://localhost:8082/perfil", { nome, email, telefone, password })
      .then((response) => {
        setNome(response.data.nome);
        setEmail(response.data.email);
        setTelefone(response.data.telefone);
        if (response.data.valid) {
          alert("Faça login novamente para ver as alterações")
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function excluirLivro(isbn) {
    axios.defaults.withCredentials = true;
    axios
      .delete("http://localhost:8082/apagar-livro", { data: { isbn } })
      .then((response) => {
        if (response.data.valid) {
          window.location.reload();
        }
      })
  }

  function excluirConta() {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8082/apagar')
    .then(response=>{
      if(response.data.valid){  
        alert("Conta excluída com sucesso")
        sair();
      }
    })
 
  }
  
  function sair(){
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8082/sair')
    .then(response=>{
      if(!response.data.valid){
        setLog(false)
        navigate('/')
      }
    })
  }


    return (
      <div>
        <Menu />
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

                <div className="left-login">
                </div>
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


            </form>
            <button id='bntexcluir' onClick={() => excluirConta()}>Excluir conta</button>
          </div>

          <div className="lista-div">
            <h2 className="textoGrande">
              <span>Seus Livros</span>
            </h2>
            <div className="listaLivros">
              <div className="content">
                <ul className="lista-Ul">
                  {livros.length > 0 ? (
                    livros.map((livro, index) => (
                      <li key={index}>
                        <img src={livro.imagem} alt="" id="capa" />
                        <p id="unidade">{livro.quantidade} unid.</p>
                        <h3 id="titulo">{livro.titulo}</h3>
                        <p id="intrinseca">Intrínseca: {livro.editora}</p>
                        <p id="preco"> R$ {livro.preco} </p>
                        <button className="button-Comprar" onClick={() => { excluirLivro(livro.isbn) }}>Excluir</button>
                      </li>
                    ))
                  ) : (
                    <p>Você ainda não cadastrou livros.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Perfil;
