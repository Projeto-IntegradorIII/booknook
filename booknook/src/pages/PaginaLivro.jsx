import React from 'react'
import Livro from '../components/Livro'
import Menu from '../components/Menu'
import '../styles/PaginaLivro.css'

function PaginaLivro() {
  return (
    <div id="body-PaginaLivro">
      <Menu/>
      <Livro/>
    </div>
  )
}

export default PaginaLivro
