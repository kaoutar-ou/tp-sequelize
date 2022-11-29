import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { addAuthHeaders } from '../api/auth';
import { UserContext } from '../App';
import Genres from '../components/Genres';
import ListeLivres from '../components/ListeLivres';
import Search from '../components/Search';

const Livres = () => {
    const [livres, setLivres] = useState([]);
    const [genre, setGenre] = useState(0);
    const [search, setSearch] = useState("");
    const [genres, setGenres] = useState([]);

    // const { user, handleSetUser } = React.useContext(UserContext);

    const handleSearch = (e) => {
        fetchAllLivres();
    }

    useEffect(() => {
        fetchAllLivres();
    }, [genre])

    const handleSetGenre = (genre) => {
        setGenre(genre);
      };

    const fetchAllLivres = async () => {
        try {
            let res
            let params = {};
            if (search != "" && search != null && search != undefined) {
                params.titre = search;
            }
            if (genre != 0) {
                params.genre = genre;
            }
            if((search != "" && search != null && search != undefined) || genre != 0) {
              res = await axios.get('http://localhost:3002/api/livres', { params });
            // } else if (genre != 0) {
            //   res = await axios.get('http://localhost:3002/api/livres', { params: { genre: genre } });
            } else {
              res = await axios.get('http://localhost:3002/api/livres');
            }
            console.log(res.data);
            setLivres(res.data);
        } catch (error) {
            console.log(error);
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
    useEffect(() => {
        fetchAllLivres();
        fetchAllGenres();
    }, []);
  return (
    <div>
        <div className="grid">
            <div className="">
                <Search setSearch={setSearch} handleSearch={handleSearch}/>
                <Genres genres={genres} genre={genre} handleSetGenre={handleSetGenre}/>
                <ListeLivres livres={livres} />
            </div>
        </div>
        <div>
            <Link className='bg-indigo-500 w-full p-2 m-3 rounded-md text-white' to="/ajout">Ajouter un livre</Link>
        </div>
    </div>
  )
}

export default Livres