import React from "react";
import '../styles/Menu.css'
import '../styles/GlobalSytles.css'
function Menu() {
    
    return(
      <div className="body">
          <div className="divMain" id="divMain">
          
            <div id="logo">
              <img src={require("../imgs/logo.png")} alt="Logo" />
            </div>
            <header className="cabecario">
            <ul className="conjuntoLista">
              <a href="/" className="buttons">
                <li className="lista">Home</li>
              </a>
              <a href="/" className="buttons">
                <li className="lista"> Promoções</li>
              </a>
              <a href="/" className="buttons">
                <li className="lista"> Login</li>
              </a>
              <a id="button-vendaJa" href="/login" className="link">
                <li className="lista">Venda Já!</li>
              </a>
            </ul>
          </header>
        </div>
      </div>
    );

}
export default Menu;
