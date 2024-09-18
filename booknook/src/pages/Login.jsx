import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8082/')
    .then(response=>{
      if(response.data.valid){
        navigate('/')
      }
      console.log(response)
    })
    .catch(err=>console.log(err))
  },[])

  function handleSubmit(event){
    event.preventDefault()
    axios.post('http://localhost:8082/login', {email, password})
    .then((response) => {
      console.log(response);
      if(response.data.Login){
          navigate('/');
      }
  })
      
      .catch(err => console.log(err))
  }

  return (
    <div className='login-container'>
       <div className='login-box'>
      <div className='login-form-container'>
        <form onSubmit={handleSubmit}>
          <div className='login-form-group'>
            <h1 className='titulo-login'>
              Entrar
            </h1>
            <label htmlFor='email'className='label-email'>Email</label>
            <input 
              type='email' 
              placeholder='Insira seu email' 
              className='login-input' 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div className='login-form-group'>
            <label htmlFor='password' className='label-password'>Senha</label>
            <input 
              type='password' 
              placeholder='Insira sua senha' 
              className='login-input' 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button className='login-button'>
            Entrar
          </button> 
        </form>


        <div className="inline-links">
            <a className="no-cadastro">Não tem cadastro?</a>
            <a href='/cadastro' className="cadastro">Cadastre-se</a>
         </div>




      </div>
      <div className='login-image-container'>
          <img src='https://scontent.frec10-1.fna.fbcdn.net/v/t39.30808-6/460425239_3194367240694162_2100265903091722437_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=K-b54uLPojUQ7kNvgGmbait&_nc_ht=scontent.frec10-1.fna&oh=00_AYDNDa6bjL76VfVLtyfATTZpfz-od46UmRF3rrjYKCxaQw&oe=66F0C800' alt='Login visual' className='login-image' />
        </div>
        </div>



      </div>
    
  )
}

export default Login
