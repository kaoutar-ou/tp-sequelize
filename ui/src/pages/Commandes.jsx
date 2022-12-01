import axios from 'axios';
import React, { useEffect } from 'react'
import { addAuthHeaders } from '../api/auth';
import CommandeModal from '../components/CommandeModal';

const Commandes = () => {
    const [commandes, setCommandes] = React.useState([]);
    const getAllCommandes = async () => {
        try {
            const res = await axios.get('http://localhost:3002/api/commande', { headers: addAuthHeaders() });
            console.log(res.data);
            setCommandes(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleVerifyCommande = async (id) => {
        console.log(id);
        try {
            const res = await axios.put('http://localhost:3002/api/commande/'+id, { status: "Vérifiée" }, { headers: addAuthHeaders() });
            getAllCommandes();
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleCancelCommande = async (id) => {
        console.log(id);
        try {
            const res = await axios.put('http://localhost:3002/api/commande/'+id, { status: "Annulée" }, { headers: addAuthHeaders() });
            getAllCommandes();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCommandes();
    }, []);
  return (
    <div className='m-5'>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Nom du livre
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Quantité
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Prix
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Nom client
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Statut
                        </th>
                        <th scope="col" className="py-3 px-6 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (commandes && commandes.length > 0) && commandes.map((commande, index) => (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {commande?.Livre?.titre}
                                </th>
                                <td className="py-4 px-6">
                                    {commande?.quantite}
                                </td>
                                <td className="py-4 px-6">
                                    {commande?.Livre.prix * commande?.quantite}
                                </td>
                                <td className="py-4 px-6">
                                    {commande?.User?.nom + " " + commande?.User?.prenom}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`${commande?.status == "En cours" ? "text-amber-500" : (commande?.status == "Vérifiée" ? "text-emerald-500" : (commande?.status == "Annulée" ? "text-red-500" : ""))} font-bold`}>
                                        {commande?.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-center space-x-2 text-sm">
                                        {/* <button className="px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-500 border border-transparent rounded-lg active:bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo">Voir</button> */}
                                        <CommandeModal commande={commande} />
                                        <button 
                                            onClick={() => handleVerifyCommande(commande.id)}
                                            disabled={commande?.status != "En cours"} 
                                            className="px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-green-500 hover:bg-green-600 focus:outline-none focus:shadow-outline-green disabled:bg-slate-300">Vérifier</button>
                                        <button 
                                            onClick={() => handleCancelCommande(commande.id)}
                                            disabled={commande?.status != "En cours"} 
                                            className="px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-500 border border-transparent rounded-lg active:bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline-red disabled:bg-slate-300">Annuler</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Commandes