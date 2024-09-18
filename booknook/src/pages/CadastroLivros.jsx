import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import '../styles/CadastroLivros.css'


export default function CadastroLivros() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [isbn, setISBN] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [preco, setPreco] = useState("");
  const [paginas, setPaginas] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagem, setImagem] = useState("")

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8082/cadastroLivros", { titulo, isbn, autor, editora, preco, paginas, quantidade, imagem })
      .then((response) => {
        console.log(response);
        if (response.data.valid) {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8082/')
      .then(response => {
        if (response.data.valid) {

        } else {
          navigate('/login')
        }
        console.log(response)
      })
      .catch(err => console.log(err))
  }, []);


  return (


    <div className='body-cadastro-livro' >
      <Menu />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className='titulo-cadastro-livro'>Olá, vamos cadastrar seu livro?</h1>




          <label htmlFor="titulo" className="custom-label-titulo">Título</label>
          <input
            type="name"
            placeholder="Insira o título"
            onChange={(e) => setTitulo(e.target.value)}
            className="custom-input-titulo"
          />




          <label htmlFor="autor" className="custom-label-autor">Autor</label>
          <input
            type="name"
            placeholder="Insira o autor"
            onChange={(e) => setAutor(e.target.value)}
            className="custom-input-autor"
          />




          <label htmlFor="editora" className="custom-label-editora">Editora</label>
          <input
            type="text"
            placeholder="Insira a editora"
            onChange={(e) => setEditora(e.target.value)}
            className="custom-input-editora"
          />






          <label htmlFor="preco" className="custom-label-preco">Preço</label>
          <input
            type="number"
            placeholder="Insira o preço"
            onChange={(e) => setPreco(parseFloat(e.target.value))}
            className="custom-input-preco"
          />




          <label htmlFor="quantidade" className="custom-label-qnt">Quantidade</label>
          <input
            type="number"
            step="1"
            placeholder="Insira a quantidade"
            onChange={(e) => setQuantidade(e.target.value)}
            className="custom-input-qnt"
          />




          <label htmlFor="isbn" className="custom-label-isbn">ISBN</label>
          <input
            type="text"
            placeholder="Insira o ISBN"
            onChange={(e) => setISBN(e.target.value)}
            className="custom-input-isbn"
          />


          <div>
            <label htmlFor="imagem" className='custom-label-img '>Imagem</label>
            <input
              type="text"
              placeholder="Insira o link da foto"
              onChange={(e) => setImagem(e.target.value)}
              className="custom-input-isbn"
            />
          </div>


          <button className="bnt-cadastro">Salvar</button>
        </form>


        <div className="image-container">
          <img src="https://img.freepik.com/psd-premium/uma-estatueta-de-uma-menina-lendo-um-livro-com-uma-vela-no-fundo_1217673-299898.jpg?w=740" alt="Imagem do Livro" className="custom-image" />
        </div>
      </div>
    </div>

  )
}
