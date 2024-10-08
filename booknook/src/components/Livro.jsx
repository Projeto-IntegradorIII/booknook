import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import '../styles/Livro.css'

export default function Livro() {

  const { isbn } = useParams();
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [preco, setPreco] = useState('')
  const [paginas, setPaginas] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [imagem, setImagem] = useState('')
  const [cpf_proprietario, setCpfProprietario] = useState('')
  const [livros, setLivros] = useState([])
  const navigate = useNavigate();


  axios.get(`http://localhost:8082/paginaLivro/${isbn}`)
    .then(response => {
      if (response.data) {
        setTitulo(response.data.titulo)
        setAutor(response.data.autor)
        setPreco(response.data.preco)
        setPaginas(response.data.paginas)
        setQuantidade(response.data.quantidade)
        setImagem(response.data.imagem)
      }
    })
    .catch(error => {
      console.error("Erro ao buscar o livro:", error);
    });

  function compra() {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8082/')
      .then(response => {
        if (response.data.valid) {
          setCpfProprietario(response.data.cpf)
          axios.get('http://localhost:8082/meus-livros')
            .then(response => {
              setLivros(response.data.livros || [])
              if (livros.length > 0) {
                window.alert('Você é proprietário do livro')
              } else {
                navigate('/pagamento')
              }
            })
        } else {
          navigate('/login')
        }
      })
  }

  return (
    <div>
      <div class="livro-container">
        <div class="livro-imagem">
          <img src={imagem} alt="Capa do Livro">
          </img>
        </div>

        <div class="livro-info">
          <h1>{titulo}</h1>
          <p class="qnt-compra">Qnt: {quantidade}</p>
          <p class="ibsn-compra">ISBN: {isbn}</p>
          <p class="paginas-compra">Páginas: {paginas}</p>

        </div>

        <div class="livro-compra">
          <p class="livro-preco">{preco}</p>
          <button class="livro-botao" onClick={() => compra()}>Comprar</button>
        </div>
      </div>

    </div>
  )
}
