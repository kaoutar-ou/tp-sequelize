import React from 'react'
import { PanierContext } from '../App';
import PanierModal from './PanierModal'

const Header = () => {
  return (
    <div className="w-full shadow-md h-12 bg-white flex items-center">
        <div className="w-11/12 p-3">
          <div>
            Livres
          </div>
        </div>
        <div className="w-1/12 p-3">
          <div>
            {/* <button className="bg-indigo-500 p-2 rounded-md text-white">Panier</button> */}
            <PanierModal  />
          </div>
        </div>
    </div>
  )
}




export default Header