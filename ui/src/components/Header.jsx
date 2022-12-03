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
    <div className="w-full shadow-md h-12 bg-white flex items-center justify-between">
        <div className="h-full flex flex-row">
          <div
            className="cursor-pointer text-lg py-2 px-4 text-white bg-indigo-300 h-full" 
            onClick={() => navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>

          </div>
          <div className='cursor-pointer py-2 px-4'
            onClick={() => navigate("/")}>
            Livres
          </div>
          {
            ( getUser() && ( getUser().roles && getUser().roles.includes("ROLE_ADMIN") ) ) && (
              <div className='cursor-pointer py-2 px-4'
                onClick={() => navigate("/commandes")}>
                Commandes
              </div>
            )
          }
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