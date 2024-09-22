import React, { useState } from 'react';
import '../styles/Pagamento.css'
import { Navigate, useNavigate } from 'react-router-dom';


function Pagamento() {
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const navigate = useNavigate();

  const handleMetodoChange = (e) => {
    setMetodoPagamento(e.target.value);
  };

  function pagamentoFeito(){
    alert("Pagamento efetuado com sucesso")
    navigate('/');
  }

  return (
    <div className="pagamento-container">
      <div className="endereco">
        <h2 className='titulo-pagamento'>Endereço de Entrega</h2>
        <p>Rua: João Amaro Bezerra - 117</p>
        <p>Bairro: Centro</p>
        <p>Cidade: Crateús</p>
      </div>

      <div className="metodo-pagamento">
        <h2>Método de Pagamento</h2>
        <label>
          <input
            type="radio"
            value="cartao"
            checked={metodoPagamento === 'cartao'}
            onChange={handleMetodoChange}
          />
          Cartão
        </label>
        <label>
          <input
            type="radio"
            value="pix"
            checked={metodoPagamento === 'pix'}
            onChange={handleMetodoChange}
          />
          Pix
        </label>
      </div>

      <div className="valor-livro">
        <p>Valor do Livro: R$ 50,00</p>
      </div>

      <button className="btn-finalizar" onClick={()=>{pagamentoFeito()}}>Finalizar Pagamento</button>
    </div>
  );
}

export default Pagamento;
