import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addAuthHeaders, getUser } from '../api/auth';

const Livre = (props) => {
    const { livre, showGenre, fetchAllLivres } = props;
    const navigate = useNavigate();

    const handleModifier = () => {
        console.log("Modifier le livre", livre.id);
        navigate('/update/' + livre.id);
    }

    const handleSupprimer = async () => {
        console.log("Supprimer le livre", livre.id);
        try {
            await axios.delete(`http://localhost:3002/api/livres/${livre.id}`, { headers: addAuthHeaders() });
            fetchAllLivres();
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddToPanier = async () => {
        console.log("Ajouter au panier", livre.id);
        if (localStorage.getItem("panier") === null) {
            localStorage.setItem("panier", JSON.stringify([]));
        }
        const panier = JSON.parse(localStorage.getItem("panier"));
        if (panier.find(p => p.id === livre.id)) {
            console.log("Livre déjà dans le panier");
        } else {
            panier.push(
                {
                    id : livre.id,
                    quantite : 1,
                    prix : livre.prix,
                    titre: livre.titre,
                    total : livre.quantite,
                }
            );
            localStorage.setItem("panier", JSON.stringify(panier));
        }
    }
  return (
    <div>
        <div className="py-4 px-5 rounded-md shadow-md relative bg-white">
        <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 rounded-tr-md text-white shadow-md">
            { livre.prix + " $" }
        </div>
        <img src={"http://localhost:3002/api/upload/" + livre.couverture} alt={livre.titre} className="w-full h-72 rounded-md" />
        <div className='my-5'>
            <div className='font-bold'>{livre.titre}</div>
            <div className=''>{livre.description}</div>
            {showGenre && <div className='text-indigo-500'>{livre.Genre.nom}</div>}
        </div>
        <div className='my-5'>
            <div className='font-bold'>Editions</div>
            {
                livre.Editions && livre.Editions.length > 0 ? (
                    livre.Editions.map((edition) => (
                        <div key={edition.id}>
                            <div key={"maison_edition" + edition.id} className='text-indigo-500'>{edition.maison_edition}</div>
                            <div key={"date_parution" + edition.id} className='text-indigo-500'>{edition.date_parution}</div>
                        </div>
                    ))
                ) : (
                    <div className='text-indigo-500'>Pas d'edition</div>
                )
            }
        </div>
        {
            ( getUser() && ( getUser().roles && getUser().roles.includes("ROLE_ADMIN") ) ) ? (
                <div className='mt-5 flex flex-col md:flex-row'>
                    <button className='bg-amber-500 text-white m-1 px-3 py-1 rounded-md w-full' onClick={() => handleModifier(livre.id)}>Modifier</button>
                    <button className='bg-red-500 text-white m-1 px-3 py-1 rounded-md w-full' onClick={() => handleSupprimer(livre.id)}>Supprimer</button>
                </div>
            ) : (
                <div className='flex justify-between'>
                    <button onClick={handleAddToPanier} className='bg-indigo-500 w-full text-white px-3 py-1 rounded-md'>Ajouter au panier</button>
                </div>
            )
        }
    </div>
    </div>
  )
}

export default Livre