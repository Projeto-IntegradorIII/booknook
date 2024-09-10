import React from 'react'
import Menu from './components/Menu'
import Carousel from './components/Carousel'
import ListaLivros from './components/ListaLivros'

function Home() {
  return (
    <div>
    <Menu/>
    <Carousel/>
    <ListaLivros/>
    </div>
  )
}

export default Home
