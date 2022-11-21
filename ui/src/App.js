import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Livres from './pages/Livres';
import Ajout from './pages/Ajout';
import MiseJour from './pages/MiseJour';
import Header from './components/Header';

function App() {
  return (
    <div className=''>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Livres />} />
          <Route path='/ajout' element={<Ajout />} />
          <Route path='/update/:id' element={<MiseJour/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
