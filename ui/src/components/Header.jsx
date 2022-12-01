import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../api/auth';
import { PanierContext } from '../App';
import PanierModal from './PanierModal'

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => { 
    logout()
    navigate('/login')
  }
  return (
    <div className="w-full shadow-md h-14 bg-white flex items-center justify-between">
        <div className="h-full">
          <div
            className="cursor-pointer font-bold text-2xl py-2 px-4 text-white bg-indigo-300 h-full" 
            onClick={() => navigate("/")}>
            Page d'accueil
          </div>
        </div>
        <div className="flex justify-end items-end p-3">
          {
              getUser() ? (
                <div>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 mx-2 rounded-md"
                    onClick={() => handleLogout()}
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div>
                  <button 
                    className="bg-emerald-500 text-white px-3 py-1 mx-2 rounded-md"
                    onClick={() => navigate('/login')}
                  >
                    Se connecter
                  </button>
                </div>
              )
          }
          <div>
            {/* <button className="bg-indigo-500 p-2 rounded-md text-white">Panier</button> */}
            <PanierModal  />
          </div>
        </div>
    </div>
  )
}




export default Header