import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';

export default function CadastroLivros() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [isbn, setISBN] = useState("");
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [preco, setPreco] = useState("");
    const [paginas, setPaginas] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [imagem, setImagem] = useState("")

    function handleSubmit(event) {
      event.preventDefault();
      axios
        .post("http://localhost:8082/cadastroLivros", {titulo, isbn , autor, editora, preco, paginas, quantidade, imagem })
        .then((response) => {
          console.log(response);
          if(response.data.valid){
              navigate('/');
          }
      })
        .catch((err) => console.log(err));
    }

    axios.defaults.withCredentials = true;
    useEffect(()=>{
      axios.get('http://localhost:8082/')
      .then(response=>{
        if(response.data.valid){
          
        }else{
          navigate('/login')
        }
        console.log(response)
      })
      .catch(err=>console.log(err))
    }, []); 


  return (
    <div>
        <Menu/>
      <div >
      <div >
        <form onSubmit={handleSubmit}>
          <div >
            <h1>booknook :)</h1>

            <label htmlFor="titulo">Titulo</label>
            <input
              type="name"
              placeholder="Insira o título"
              onChange={(e) => setTitulo(e.target.value)}
            />

            <label htmlFor="autor">Autor</label>
            <input
              type="name"
              placeholder="Insira o autor"
              onChange={(e) => setAutor(e.target.value)}
            />

            <label htmlFor="editora">Editora</label>
            <input
              type="text"
              placeholder="Insira a editora"
              onChange={(e) => setEditora(e.target.value)}
            />

            <label htmlFor="preco">Preço</label>
            <input
              type="number"
              placeholder="Insira seu número de celular"
              onChange={(e) => setPreco(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="quantidade">Quantidade</label>
            <input
              type="number"
              step="1"
              placeholder="Insira a quantidade"
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="paginas">Nº de páginas</label>
            <input
              type="number"
              placeholder="Insira a quantidade de páginas"
              onChange={(e) => setPaginas(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              placeholder="Insira o ISBN"
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="imagem">Imagem</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Selecione a capa"
              onChange={(e) => setImagem(e.target.value)}
            />
          </div>
          <button>Salvar</button>
        </form>
      </div>
    </div>
    </div>
  )
}
