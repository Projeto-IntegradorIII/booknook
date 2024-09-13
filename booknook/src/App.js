import Login from './pages/Login';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './Home';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
