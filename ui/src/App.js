import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Livres from './pages/Livres';
import Ajout from './pages/Ajout';
import MiseJour from './pages/MiseJour';
import Header from './components/Header';
import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Commandes from './pages/Commandes';

let panier = [];
const handleAddToPanier = (livre) => {
    panier.push(livre);
    console.log(panier);
}
const handleDeleteFromPanier = (livre) => {
    panier = panier.filter((item) => item.id !== livre.id);
    console.log(panier);
}

export const PanierContext = React.createContext(
  {
    panier,
    handleAddToPanier,
    handleDeleteFromPanier
  }
);

let user = null;
const handleSetUser = (user) => {
  user = user;
  console.log(user);
}

export const UserContext = React.createContext(
  {
    user,
    handleSetUser
  }
);

function App() {

  return (
    <UserContext.Provider value={{ user, handleSetUser }}>
      <PanierContext.Provider value={{ panier, handleAddToPanier, handleDeleteFromPanier }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Livres />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/ajout' element={<Ajout />} />
            <Route path='/update/:id' element={<MiseJour />} />
            <Route path='/commandes' element={<Commandes />} />
          </Routes>
        </BrowserRouter>
      </PanierContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
