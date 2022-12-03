import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addAuthHeaders } from '../api/auth';

const Ajout = () => {
    const navigate = useNavigate();

    const titreRef = React.useRef();
    const descriptionRef = React.useRef();
    const prixRef = React.useRef();
    const genreRef = React.useRef();
    const quantiteRef = React.useRef();
    const dateParutionRef = React.useRef();
    const maisonEditionRef = React.useRef();

    const [livre, setLivre] = React.useState({
        titre: '',
        description: '',
        genre: '',
        prix: null,
        quantite: null,
        editions: [],
        couverture: '',
    });

    const [couvertureFile, setCouvertureFile] = React.useState({
        file: null,
        fileName: '',
    });

    const [genres, setGenres] = React.useState([]);

    const fetchAllGenres = async () => {
        try {
            const res = await axios.get('http://localhost:3002/api/genres');
            console.log(res.data);
            setGenres(res.data);
        } catch (error) {
            console.log(error);
        }
    }

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

    const validateLivreForm = (livre) => {
        return livre.titre && livre.quantite && livre.description && livre.genre && livre.couverture && livre.prix && couvertureFile.file && couvertureFile.fileName;
    }

    const [editions, setEditions] = useState([]);

    const handleClickUpdate = async (e) => {
        e.preventDefault();
        console.log(livre);
        let newLivre = {
            titre: titreRef.current.value,
            description: descriptionRef.current.value,
            genre: genreRef.current.value,
            prix: parseInt(prixRef.current.value),
            quantite: parseInt(quantiteRef.current.value),
            couverture: couvertureFile.fileName,
            editions: editions,
        }
        let formData = new FormData();
        formData.append('fileName', couvertureFile.fileName);
        formData.append('file', couvertureFile.file);
        console.log(newLivre);
        console.log(couvertureFile);
        if(validateLivreForm(newLivre)) {
            console.log('form is valid');
            try {
                await axios.post('http://localhost:3002/api/livres', newLivre, { headers: addAuthHeaders() });
                if (couvertureFile.file && couvertureFile.fileName) {
                    await axios.post('http://localhost:3002/api/upload', formData, { headers: addAuthHeaders() });
                }
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    }

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

    React.useEffect(() => {
        fetchAllGenres();
    }, []);

  return (
    // <div className='flex justify-center w-full h-screen place-items-center'>
    //     <div className='flex flex-col place-items-center w-4/6'>
    //         <div>Ajout d'un nouveau livre</div>
    //         <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Titre" onChange={handleChange} name="titre" />
    //         <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Description" onChange={handleChange} name="description" />
    //         <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="number" placeholder="Prix" onChange={handleChange} name="prix" />
    //         <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="number" placeholder="Quantité" onChange={handleChange} name="quantite" />
    //         {/* <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Genre" onChange={handleChange} name="genre" /> */}
    //         <select className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' name="genre" onChange={handleChange}>
    //             <option key={0} value={0}>--- séléctionner un genre ---</option>
    //             {
    //                 genres.map((genre) => (
    //                     <option key={genre.id} value={genre.id}>{genre.nom}</option>
    //                 ))
    //             }
    //         </select>
    //         <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="date" placeholder="Date de parution" onChange={handleChange} name="date_parution" />
    //         <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Maison d'édition" onChange={handleChange} name="maison_edition" />
    //         <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="file" placeholder="Couverture" onChange={handleChange} name="couverture" />
    //         <button onClick={handleClick} className='bg-indigo-500 w-full p-2 m-3 rounded-md text-white'>Ajouter</button>
    //     </div>
    // </div>





    // <div className='bg-gray-200 min-h-screen'>
    //     <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
    //         <div className="p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl w-5/6">
    //             <h1 className="text-3xl font-semibold text-center text-indigo-900 uppercase">
    //                 Login
    //             </h1>
    //             <form className="mt-6">
    //                 <div className="mb-2">
    //                     <label
    //                         htmlFor="username"
    //                         className="block text-sm font-semibold text-gray-800"
    //                     >
    //                         Nom d'utilisateur / email
    //                     </label>
    //                     <input
    //                         ref={usernameRef}
    //                         type="text"
    //                         className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //                     />
    //                 </div>
    //                 <div className="mb-2">
    //                     <label
    //                         htmlFor="password"
    //                         className="block text-sm font-semibold text-gray-800"
    //                     >
    //                         Mot de passe
    //                     </label>
    //                     <input
    //                         ref={passwordRef}
    //                         type="password"
    //                         className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //                     />
    //                 </div>
                
    //                 <div className="mt-6">
    //                     <button 
    //                         onClick={(e) => handleSubmit(e)}
    //                         className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
    //                         Se connecter
    //                     </button>
    //                 </div>
    //             </form>
                
    //             <p className="mt-8 text-xs font-light text-center text-gray-700">
    //                 {" "}
    //                 Vous n'avez pas de compte ?{" "}
    //                 <button onClick={() => navigate('/signup')}>
    //                     Créer un compte
    //                 </button>
    //             </p>
    //         </div>
    //     </div>
    // </div>


    <div className='bg-gray-200 min-h-screen'>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl w-5/6">
                <h1 className="text-3xl font-semibold text-center text-indigo-900 uppercase">
                    Ajout du livre
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
                            <option key={livre.genre ? livre.genre : 0} value={livre.genre ? livre.genre : 0}>--- séléctionner un genre ---</option>
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

export default Ajout