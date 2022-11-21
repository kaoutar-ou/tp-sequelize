import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Livre = (props) => {
    const { livre, showGenre } = props;
    const navigate = useNavigate();
    const handleModifier = () => {
        console.log("Modifier le livre", livre.id);
        navigate('/update/' + livre.id);
    }

    const handleSupprimer = async () => {
        console.log("Supprimer le livre", livre.id);
        try {
            await axios.delete(`http://localhost:3002/api/livres/${livre.id}`);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <div className="py-4 px-5 outline outline-1 rounded-md outline-indigo-500 relative">
        <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-500 rounded-tr-md text-white">
            { livre.prix + " $" }
        </div>
        <img src={"http://localhost:3002/api/upload/" + livre.couverture} alt={livre.titre} className="w-full h-72 rounded-md" />
        <div className='my-5'>
            <div className='font-bold'>{livre.titre}</div>
            <div className=''>{livre.description}</div>
            {showGenre && <div className='text-indigo-500'>{livre.genre}</div>}
        </div>
        <div className='my-5'>
            <div className='font-bold'>Editions</div>
            {
                livre.editions && livre.editions.length > 0 ? (
                    livre.editions.map((edition) => (
                        <div key={edition.id}>
                            <div key={"maison_edition" + edition.id} className='text-indigo-500'>{edition.maison_edition}</div>
                            <div key={"date_parution" + edition.id} className='text-indigo-500'>{edition.date_parution}</div>
                            <h/>
                        </div>
                    ))
                ) : (
                    <div className='text-indigo-500'>Pas d'edition</div>
                )
            }
        </div>
        <div className='mt-5 flex flex-col md:flex-row'>
            <button className='bg-amber-500 text-white m-1 px-3 py-1 rounded-md w-full' onClick={() => handleModifier(livre.id)}>Modifier</button>
            <button className='bg-red-500 text-white m-1 px-3 py-1 rounded-md w-full' onClick={() => handleSupprimer(livre.id)}>Supprimer</button>
        </div>
    </div>
    </div>
  )
}

export default Livre