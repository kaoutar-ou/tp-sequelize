import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Ajout = () => {
    const navigate = useNavigate();

    const [livre, setLivre] = React.useState({
        titre: '',
        description: '',
        genre: '',
        prix: null,
        date_parution: '',
        maison_edition: '',
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
        // console.log(livre);
    }

    const validateLivreForm = () => {
        return livre.titre && livre.description && livre.genre && livre.couverture && livre.prix && couvertureFile.file && couvertureFile.fileName;
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
                await axios.post('http://localhost:3002/api/livres', livre);
                if (couvertureFile.file && couvertureFile.fileName) {
                    await axios.post('http://localhost:3002/api/upload', formData);
                }
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    }

    React.useEffect(() => {
        fetchAllGenres();
    }, []);

  return (
    <div className='flex justify-center w-full h-screen place-items-center'>
        <div className='flex flex-col place-items-center w-4/6'>
            <div>Ajout d'un nouveau livre</div>
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Titre" onChange={handleChange} name="titre" />
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Description" onChange={handleChange} name="description" />
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="number" placeholder="Prix" onChange={handleChange} name="prix" />
            {/* <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Genre" onChange={handleChange} name="genre" /> */}
            <select className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' name="genre" onChange={handleChange}>
                {
                    genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.nom}</option>
                    ))
                }
            </select>
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="date" placeholder="Date de parution" onChange={handleChange} name="date_parution" />
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="text" placeholder="Maison d'édition" onChange={handleChange} name="maison_edition" />
            <input className='m-3 w-full outline outline-1 outline-indigo-500 p-2 rounded-md' type="file" placeholder="Couverture" onChange={handleChange} name="couverture" />
            <button onClick={handleClick} className='bg-indigo-500 w-full p-2 m-3 rounded-md text-white'>Ajouter</button>
        </div>
    </div>
  )
}

export default Ajout