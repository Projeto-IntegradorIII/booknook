import axios from 'axios';
import React from 'react'

export default function Livro() {
    
const pathname = window.location.pathname;
const isbn = pathname.split('/').pop();  


const queryParams = new URLSearchParams(window.location.search);
const isbnQueryParam = queryParams.get('isbn'); 

axios.get(`http://localhost:3000/paginaLivro/${isbn}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("Erro ao buscar o livro:", error);
  });

  return (
    <div>
      
    </div>
  )
}
