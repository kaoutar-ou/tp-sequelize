import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addAuthHeaders } from '../api/auth'

const MiseJour = () => {
    let { id } = useParams()
    const navigate = useNavigate();

    const [livrePrev, setLivrePrev] = useState(
        {
            titre: '',
            description: '',
            genre: '',
            prix: null,
        }
    )
    const [livre, setLivre] = useState({
        titre: '',
        description: '',
        genre: '',
        prix: null,
        couverture: '',
    });

    const [couvertureFile, setCouvertureFile] = React.useState({
        file: null,
        fileName: '',
    });

    const [genres, setGenres] = useState([]);
    
    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'prix') {
            setLivre({ ...livre, prix: parseInt(value) });
        } else if (name === 'couverture') {
            const name = e.target.files[0].name;
            const index = name.lastIndexOf('.');
            const extension = name.slice(index + 1)
            const fileName = new Date().getTime() + '.' + extension;
            console.log(fileName);
            setCouvertureFile({ fileName, file: e.target.files[0] });
            setLivre({ ...livre, couverture: fileName });
        } else {
            setLivre({ ...livre, [name]: value });
        }
        console.log(livre);
    }

    const validateLivreForm = () => {
        return livre.titre && livre.description && livre.couverture && livre.prix && livre.genre
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(livre);
        let formData = new FormData();
        formData.append('fileName', couvertureFile.fileName);
        formData.append('file', couvertureFile.file);
        if(validateLivreForm(livre)) {
            console.log('form is valid');
            try {
                await axios.put('http://localhost:3002/api/livres/' + id , livre, { headers: addAuthHeaders() });
                if (couvertureFile.file && couvertureFile.fileName) {
                    await axios.post('http://localhost:3002/api/upload', formData, { headers: addAuthHeaders() });
                }
                let livre_id = id;
                editions.map(async (edition) => {
                    // if (edition.livreId === id) {
                    edition.livre_id = livre_id;
                    let id = edition.id;
                    await axios.put('http://localhost:3002/api/editions/' + id, edition, { headers: addAuthHeaders() })
                    // }
                })
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

    const handleEditionChange = (e, edition_id) => {
        let updated = false;
        const { name, value } = e.target;
        setEditions(editions.map(edition => {
            if (edition.id === edition_id) {
                edition[name] = value;
                updated = true;
            }
            return edition;
        }))
        if (!updated) {
            setEditions([...editions, { id: edition_id, [name]: value }])
        }
    }

    useEffect(() => {
        console.log(id);
        const getLivre = async () => {
            try {
                const res = await axios.get('http://localhost:3002/api/livres/' + id);
                console.log(res.data);
                setLivrePrev({
                    titre: res.data.titre,
                    description: res.data.description,
                    genre: res.data.genre.nom,
                    prix: res.data.prix,
                    editions: res.data.editions,
                });
                setLivre({
                    titre: res.data.titre,
                    description: res.data.description,
                    genre: res.data.genre.id,
                    prix: res.data.prix,
                    editions: res.data.editions,
                    couverture: res.data.couverture,
                });
                setEditions(res.data.editions);
            } catch (error) {
                console.log(error);
            }
        }
        getLivre();
        fetchAllGenres();
    }, [])

  return (
    <div className='flex justify-center w-full h-screen place-items-center'>
        <div className='flex flex-col place-items-center w-4/6'>
            <div>Modifier un livre</div>
            <div className='text-sm'><span className='font-bold'>Titre : </span>{livrePrev.titre ? livrePrev.titre : ""}</div>
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Titre" onChange={handleChange} name="titre" />
            <div className='text-sm'><span className='font-bold'>Description : </span>{livrePrev.description ? livrePrev.description : ""}</div>
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Description" onChange={handleChange} name="description" />
            <div className='text-sm'><span className='font-bold'>Prix : </span>{livrePrev.prix ? livrePrev.prix : ""}</div>
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="number" placeholder="Prix" onChange={handleChange} name="prix" />
            <div className='text-sm'><span className='font-bold'>Genre : </span>{livrePrev.genre ? livrePrev.genre : ""}</div>
            {/* <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Genre" onChange={handleChange} name="genre" /> */}
            <select className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' name="genre" onChange={handleChange}>
                {
                    genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.nom}</option>
                    ))
                }
            </select>
            <div className='text-sm'><span className='font-bold'>Editions</span></div>
                {
                    livrePrev.editions && livrePrev.editions.length > 0 ? (
                        livrePrev.editions.map((edition) => (
                            <>
                                <div key={edition.id} className='flex flex-col'>
                                    <div className='text-sm'><span className='font-bold'>Date de parution : </span>{edition.date_parution}</div>
                                    <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="date" placeholder="Date de parution" onChange={(e) => handleEditionChange(e, edition.id)} name="date_parution" />
                                    <div className='text-sm'><span className='font-bold'>Maison d'édition : </span>{edition.maison_edition}</div>
                                    <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Maison d'édition" onChange={(e) => handleEditionChange(e, edition.id)} name="maison_edition" />
                                </div>
                            </>
                        ))
                    ) : (
                        <div className='flex flex-col'>
                            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Edition" onChange={handleChange} name="edition" />
                            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="date" placeholder="Date de parution" onChange={handleChange} name="date_parution" />
                        </div>
                    )
                }
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="file" placeholder="Couverture" onChange={handleChange} name="couverture" />
            <button onClick={handleClick} className='bg-indigo-500 w-full p-2 m-3 rounded-md text-white'>Modifier</button>
        </div>
    </div>
  )
}

export default MiseJour