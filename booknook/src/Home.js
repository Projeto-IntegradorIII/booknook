import React, {useEffect, useState}from 'react'
import axios from 'axios'
import Menu from './components/Menu'
import Carousel from './components/Carousel'
import ListaLivros from './components/ListaLivros'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:8082/')
    .then(response=>{
      if(response.data.valid){
        setName(response.data.username)
      }else{
        navigate('/login')
      }
      console.log(response)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
    <h1>
      Seja bem vinde {name}
    </h1>
    <Menu/>
    <Carousel/>
    <ListaLivros/>
    </div>
  )
}

export default Home
