import React from "react";
import "../styles/ListaLivros.css";

function ListaLivros() {
  return (
    <div className="lista">
      <h2 className="textoGrande">
        <span>Livros novos e usados</span>
      </h2>
      <div className="listaLivros">
        <div className="content">
          <img src="https://m.media-amazon.com/images/I/81iqH8dpjuL._SY466_.jpg" alt="" id="capa" />
          <h3>A biblioteca da meia-noite</h3>
          <p>Instrinseca</p>
          <h6>R$ 29,99</h6>
          <button className="button-Comprar">Comprar</button>
        </div>
      </div>

      <div className="listaLivros">
        <div className="content">
          <img src="https://m.media-amazon.com/images/I/71KnjPmQnkL._SY466_.jpg" alt="" id="capa" />
          <h3>
            Leitura de Verão
            <br />
          </h3>
          <p>Instrinseca</p>
          <h6>R$ 29,99</h6>
          <button className="button-Comprar">Comprar</button>
        </div>
      </div>

      <div className="listaLivros">
        <div className="content">
          <img src="https://m.media-amazon.com/images/I/91yEPgRcELL._SY466_.jpg" alt="" id="capa" />
          <h3>Os sete maridos de Evelyn Hugo</h3>
          <p>Instrinseca</p>
          <h6>R$ 29,99</h6>
          <button className="button-Comprar">Comprar</button>
        </div>
      </div>

      <div className="listaLivros">
        <div className="content">
          <img src="https://m.media-amazon.com/images/I/51ModWQMBPL._SY445_SX342_.jpg" alt="" id="capa" />
          <h3>A filha da rainha sereia</h3>
          <p>Instrinseca</p>
          <h6>R$ 29,99</h6>
          <button className="button-Comprar">Comprar</button>
        </div>
      </div>

      <div className="listaLivros">
        <div className="content">
          <img src="https://m.media-amazon.com/images/I/81UeAHo5h4L._SY466_.jpg" alt="" id="capa" />
          <h3>Laços Pervesos</h3>
          <p>Instrinseca</p>
          <h6>R$ 29,99</h6>
          <button className="button-Comprar">Comprar</button>
        </div>
      </div>
    </div>
  );
}

export default ListaLivros;
