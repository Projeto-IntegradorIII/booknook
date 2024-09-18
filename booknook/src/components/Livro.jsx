import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Livro() {

  const { isbn } = useParams();
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [preco, setPreco] = useState('')
  const [paginas, setPaginas] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [imagem, setImagem] = useState('')

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

  return (
    <div>
        {titulo}
        {isbn}
        {preco}
        {paginas}
        {quantidade}
        <img src={imagem}></img>
      
    </div>
  )
}
