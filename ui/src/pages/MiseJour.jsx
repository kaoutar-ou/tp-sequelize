import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addAuthHeaders } from '../api/auth'

const MiseJour = () => {
    let { id } = useParams()
    const navigate = useNavigate();

    const titreRef = React.useRef();
    const descriptionRef = React.useRef();
    const prixRef = React.useRef();
    const genreRef = React.useRef();
    const quantiteRef = React.useRef();
    const dateParutionRef = React.useRef();
    const maisonEditionRef = React.useRef();

    const [livre, setLivre] = useState({
        titre: '',
        description: '',
        genre: '',
        prix: null,
        couverture: '',
        quantite: null,
        editions: [],
    });

    const [couvertureFile, setCouvertureFile] = React.useState({
        file: null,
        fileName: '',
    });

    const [genres, setGenres] = useState([]);
    
    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'couverture') {
            const name = e.target.files[0].name;
            const index = name.lastIndexOf('.');
            const extension = name.slice(index + 1)
            const fileName = new Date().getTime() + '.' + extension;
            console.log(fileName);
            setCouvertureFile({ fileName, file: e.target.files[0] });
            setLivre({ ...livre, couverture: fileName });
        }
        console.log(livre);
    }

    const validateLivreForm = () => {
        return livre.titre && livre.description && livre.couverture && livre.prix && livre.genre && livre.quantite;
    }

    const handleClickUpdate = async (e) => {
        e.preventDefault();
        console.log(livre);
        let updatedLivre = {
            titre: titreRef.current.value,
            description: descriptionRef.current.value,
            genre: genreRef.current.value,
            prix: parseInt(prixRef.current.value),
            quantite: parseInt(quantiteRef.current.value),
            editions: editions,
        }
        let formData = new FormData();
        if (couvertureFile.file) {
            updatedLivre.couverture = couvertureFile.fileName;
            formData.append('fileName', couvertureFile.fileName);
            formData.append('file', couvertureFile.file);
        }
        console.log(updatedLivre);
        if(validateLivreForm(updatedLivre)) {
            console.log('form is valid');
            try {
                await axios.put('http://localhost:3002/api/livres/' + id , updatedLivre, { headers: addAuthHeaders() });
                if (couvertureFile.file && couvertureFile.fileName) {
                    await axios.post('http://localhost:3002/api/upload', formData, { headers: addAuthHeaders() });
                }

                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const fetchAllGenres = async () => {
        try {
            const res = await axios.get('http://localhost:3002/api/genres');
            console.log(res.data);
            setGenres(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const [editions, setEditions] = useState([]);

    const handleAddEdition = (e) => {
        e.preventDefault();
        let maison_edition = maisonEditionRef.current.value;
        let date_parution = dateParutionRef.current.value;
        setEditions([...editions, { maison_edition, date_parution }]);
        maisonEditionRef.current.value = '';
        dateParutionRef.current.value = '';
    }

    const handleDeleteEdition = (edition) => {
        if(edition.id) {
            axios.delete('http://localhost:3002/api/editions/' + edition.id, { headers: addAuthHeaders() });
        }
        setEditions(editions.filter(ed => ed !== edition));
    }

    useEffect(() => {
        console.log(id);
        const getLivre = async () => {
            try {
                const res = await axios.get('http://localhost:3002/api/livres/' + id);
                console.log(res.data);

                let livreDb = {
                    titre: res.data.titre,
                    description: res.data.description,
                    genre: res.data.Genre.id,
                    quantite: res.data.quantite,
                    prix: res.data.prix,
                    editions: res.data?.Editions && res.data.Editions?.length > 0 ? res.data.Editions : [],
                    couverture: res.data.couverture,
                }
                console.log(livreDb);
                setLivre(livreDb);
                setEditions(res.data?.Editions && res.data.Editions?.length > 0 ? res.data.Editions : []);
            } catch (error) {
                console.log(error);
            }
        }
        getLivre();
        fetchAllGenres();
    }, [])

  return (

    <div className='bg-gray-200 min-h-screen'>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl w-5/6">
                <h1 className="text-3xl font-semibold text-center text-indigo-900 uppercase">
                    Modification du livre
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="titre"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Titre
                        </label>
                        <input
                            ref={titreRef}
                            type="text"
                            defaultValue={livre.titre}
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="description"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Description
                        </label>
                        <input
                            ref={descriptionRef}
                            type="text"
                            defaultValue={livre.description}
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="prix"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Prix
                        </label>
                        <input
                            ref={prixRef}
                            type="number"
                            defaultValue={livre.prix}
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="quantite"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Quantité
                        </label>
                        <input
                            ref={quantiteRef}
                            type="number"
                            defaultValue={livre.quantite}
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="genre"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Genre
                        </label>
                        <select className='block w-full px-4 py-2 mt-2 text-center bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40' name="genre" ref={genreRef}>
                            <option key={livre.genre} value={livre.genre}>--- séléctionner un genre ---</option>
                            {
                                genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>{genre.nom}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="genre"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Couverture
                        </label>
                        <input className='w-full outline outline-1 outline-gray-200 p-2 rounded-md' type="file" placeholder="Couverture" onChange={handleChange} name="couverture" />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="editions"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Editions
                        </label>
                        <div className='grid grid-cols-12'>
                            <div className="mb-2 col-span-11">
                                <input
                                    ref={maisonEditionRef}
                                    type="text"
                                    placeholder="Maison d'édition"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                <input
                                    ref={dateParutionRef}
                                    type="date"
                                    placeholder="Date de parution"
                                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 col-span-1 row-span-2 flex place-items-center place-content-center"> 
                                <button onClick={(e) => handleAddEdition(e)} className='bg-indigo-500 px-3 py-2 rounded-full text-white'>+</button>
                            </div>
                        </div>
                            {
                                editions && editions.length > 0 ? (
                                    editions.map((edition, index) => (
                                        <div key={index} className="flex flex-row w-full">
                                            <div className="grid grid-cols-12 shadow-md w-full">
                                                <div
                                                    className="col-span-1 p-3 bg-red-200 h-full flex items-center justify-center text-black cursor-pointer"
                                                    onClick={() => handleDeleteEdition(edition)}
                                                    >
                                                    <div>
                                                    X
                                                    </div>
                                                </div>
                                                <div className="col-span-7 p-3 flex flex-col text-sm justify-center">
                                                    <div><b className="">Maison d'édition : </b> { edition.maison_edition } </div>
                                                    <div><b className="">Date de parution : </b> { edition.date_parution } </div>
                                                </div>
                                            </div>
                                        </div>
                                ))
                                ) : (
                                    <div className="flex flex-row w-full text-center">
                                        Pas d'éditions
                                    </div>
                                )
                            }
                        </div>
                    <div className="mt-6">
                        <button 
                            onClick={(e) => handleClickUpdate(e)}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default MiseJour