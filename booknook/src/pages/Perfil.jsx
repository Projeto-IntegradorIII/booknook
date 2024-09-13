import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Perfil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/perfil', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao recuperar dados:", err);
        setError('Erro ao recuperar dados do usuário');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Perfil do Usuário</h2>
          <p>Nome: {userData.nome}</p>
          <p>Email: {userData.email}</p>
          <p>CPF: {userData.cpf}</p>
          <p>Telefone: {userData.telefone}</p>
        </div>
      ) : (
        <p>Nenhum dado encontrado</p>
      )}
    </div>
  );
}

export default Perfil;
