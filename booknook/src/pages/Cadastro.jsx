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
  const [estado, setEstado] = useState("")
  const [cidade, setCidade] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [bairro, setBairro] = useState("")

  function handleSubmit(event) {
    
    event.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8082/cadastro", {nome, email , cpf, telefone, password, estado, cidade, rua, numero, bairro })
      .then((response) => {
        if(response.data.valid){
            navigate('/login');
        }
    })
      .catch((err) => console.log(err));
  }
  return (
    <div className="criar-conta-container">
      <div className="criar-conta-box">
      <div className="criar-conta-form-container">
        <form onSubmit={handleSubmit}>
          <div className="cadastro-form-group">
          <h1 className="criar-conta-titulo">Crie sua conta!</h1>
          <h2>Dados pessoais</h2>

            <label htmlFor="nome">Nome</label>
            <input
              type="name"
              placeholder="Insira seu nome"
               className="cadastro-input"
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Insira seu email"
               className="cadastro-input"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              placeholder="Insira seu CPF"
               className="cadastro-input"
              onChange={(e) => setCpf(e.target.value)}
            />

            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              placeholder="Insira seu número de celular"
              className="cadastro-input"
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Insira sua senha"
              className="cadastro-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h2>
            Endereço
          </h2>
          <div className="login-form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              placeholder="Insira seu estado"
              className="cadastro-input"
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              placeholder="Insira sua cidade"
              className="cadastro-input"
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="rua">Rua</label>
            <input
              type="text"
              placeholder="Insira sua rua"
              className="cadastro-input"
              onChange={(e) => setRua(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="numero">Número</label>
            <input
              type="number"
              placeholder="Insira seu número, caso tenha"
              className="cadastro-input"
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              placeholder="Insira seu bairro"
              className="cadastro-input"
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>
          <button className="login-button">Salvar</button>
      </form>
      <div className="inline-links">
            <a className="no-cadastro">Já possui uma conta?</a>
            <a href='/login' className="cadastro">Faça Login</a>
         </div>
    </div>

    <div className="cadastro-image-side">
      <img src="https://scontent.frec10-1.fna.fbcdn.net/v/t39.30808-6/459999956_3194438247353728_862671319540510508_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9PbDwDRbhm8Q7kNvgHHZJC7&_nc_ht=scontent.frec10-1.fna&_nc_gid=AJRA7WbKAQIGMN9vFclo6ok&oh=00_AYDIhnCTefUU8NM8nzv91CZta21ds7gWXHHI6rGRmN4RSQ&oe=66F0E318" alt="Login illustration" />
    </div>

      </div>
    </div>
  );
}
