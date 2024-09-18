import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

export default function Livro() {
    
const { isbn } = useParams();
console.log(isbn)


axios.get(`http://localhost:8082/paginaLivro/${isbn}`)
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error("Erro ao buscar o livro:", error);
  });

  return (
    <div>
      <h1>
        {isbn}
      </h1>
    </div>
  )
}
