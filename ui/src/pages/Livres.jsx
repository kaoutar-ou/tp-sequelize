import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { addAuthHeaders, getUser } from '../api/auth';
import { UserContext } from '../App';
import Genres from '../components/Genres';
import ListeLivres from '../components/ListeLivres';
import Search from '../components/Search';

const Livres = () => {
    const navigate = useNavigate();
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
    <div className='bg-gray-200 min-h-screen'>
        <div className="grid">
            <div className="">
                <Search setSearch={setSearch} handleSearch={handleSearch}/>
                {
                    ( getUser() && ( getUser().roles && getUser().roles.includes("ROLE_ADMIN") ) ) && (

                    <div className='w-full flex justify-center'>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" 
                            onClick={() => navigate("/ajout")}
                        >
                            Ajouter livre
                        </button>
                    </div>
                    )
                }
                <Genres genres={genres} genre={genre} handleSetGenre={handleSetGenre}/>
                <ListeLivres livres={livres} fetchAllLivres={fetchAllLivres} genre={genre} />
            </div>
        </div>
        {/* {
            ( getUser() && ( getUser().roles && getUser().roles.includes("ROLE_ADMIN") ) ) && (
                <div>
                    <Link className='bg-indigo-500 w-full p-2 m-3 rounded-md text-white' to="/ajout">Ajouter un livre</Link>
                </div>
            )
        } */}
    </div>
  )
}

export default Livres