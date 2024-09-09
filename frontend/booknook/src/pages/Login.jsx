import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault()
    axios.post('http://localhost:3001/login', {email, password})
    .then((response) => {
      console.log(response);
      if(response.data === 'ok'){
          navigate('/');
      }
  })
      
      .catch(err => console.log(err))
  }

  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <form onSubmit={handleSubmit}>
          <div className='login-form-group'>
            <h1>
              booknook :)
            </h1>
            <label htmlFor='email'>Email</label>
            <input 
              type='email' 
              placeholder='Insira seu email' 
              className='login-input' 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div className='login-form-group'>
            <label htmlFor='password'>Senha</label>
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
      </div>
    </div>
  )
}

export default Login
