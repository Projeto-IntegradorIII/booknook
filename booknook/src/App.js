import Login from './pages/Login';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './Home';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import CadastroLivros from './pages/CadastroLivros';
import PaginaLivro from './pages/PaginaLivro';
import Pagamento from './pages/Pagamento';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/' element={<Home/>}/> 
        <Route path='/cadastro-livros' element={<CadastroLivros/>}/> 
        <Route path='/paginaLivro/:isbn' element={<PaginaLivro/>}/>
        <Route path='/pagamento' element={<Pagamento/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
