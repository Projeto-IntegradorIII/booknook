import React, { useEffect, useState } from "react";
import "../styles/ListaLivros.css";
import axios from "axios";


function ListaLivros() {

  const [livros, setLivros] = useState([])

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8082/livros')
      .then(response => {
        if (response.data.livros || []) {
          setLivros(response.data)
        } else {
          setLivros([])
        }
        
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os livros:", error);
        setLivros([]);
      });
    }, []);

    function paginaLivro(isbn) {
      window.location.href = `http://localhost:3000/paginaLivro/${isbn}`;
  }
  

  return (
    <div className="lista-div">
      <h2 className="textoGrande">
        <span>Livros novos e usados</span>
      </h2>
      <div className="listaLivros">
          <div className="content">
          <ul className="lista-Ul">
            {livros.length > 0 ? (
              livros.map((livro, index) => (
                <li key={index}>
                  <img src={livro.imagem} alt=""  id="capa"/>
                  <p id="unidade">{livro.quantidade} unid.</p>
                  <h3 id="titulo">{livro.titulo}</h3>
                  <p id="intrinseca">Intrínseca: {livro.editora}</p>
                  <p id="preco"> R$ {livro.preco} </p>
                  <button className="button-Comprar" onClick={()=>paginaLivro(livro.isbn)}>Comprar</button>
                </li>
              ))
            ) : (
              <p>Você ainda não cadastrou livros.</p>
            )}
          </ul>
          </div>
        </div>
     </div>
    
  );
}

export default ListaLivros;
