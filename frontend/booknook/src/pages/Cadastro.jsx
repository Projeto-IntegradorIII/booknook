import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../styles/Cadastro.css";




export default function Cadastro() {

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/cadastro", {nome, email , cpf, telefone, password })
      .then((response) => {
        console.log(response);
        if(response.data === 'ok'){
            navigate('/login');
        }
    })
      .catch((err) => console.log(err));
  }
  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <h1>booknook :)</h1>

            <label htmlFor="nome">Nome</label>
            <input
              type="name"
              placeholder="Insira seu nome"
              className="login-input"
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Insira seu email"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              placeholder="Insira seu CPF"
              className="login-input"
              onChange={(e) => setCpf(e.target.value)}
            />

            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              placeholder="Insira seu número de celular"
              className="login-input"
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Insira sua senha"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button">Salvar</button>
        </form>
      </div>
    </div>
  );
}
