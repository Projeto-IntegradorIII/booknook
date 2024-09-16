import React, { useEffect, useState } from "react";
import '../styles/Menu.css'
import '../styles/GlobalSytles.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Menu() {

  const [log, setLog] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8082/')
      .then(response => {
        if (response.data.valid) {
          setLog(true);
        } else {
          setLog(false); 
          
        }
        console.log(response);
      })
      .catch(err => console.log(err));
  }, [navigate]);

  function sair(){
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8082/sair')
    .then(response=>{
      if(!response.data.valid){
        setLog(false)
        navigate('/')
      }
    })
  }

    return(
      <div className="body">
          <div className="divMain" id="divMain">
          
            <div id="logo">
              <img src={require("../imgs/logo.png")} alt="Logo" />
            </div>
            <header className="cabecario">
            <ul className="conjuntoLista">
              
              <a href="/" className="buttons">
                <li className="lista"> Promoções</li>
              </a>
              <a href="/perfil" className="buttons">
                <li className="lista"> Perfil</li>
              </a>
              <a id="button-vendaJa" href="/cadastro-livros" className="link">
                <li className="lista">Venda Já!</li>
              </a>
              {log?(
                <a href="/" className="buttons" onClick={sair}>
                <li className="lista"> Sair</li>
              </a>
              ): (
               <div></div>
              )}
            </ul>
          </header>
        </div>
      </div>
    );

}
export default Menu;
