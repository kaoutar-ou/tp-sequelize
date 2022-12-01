import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const userContext = React.useContext(UserContext);

    const [user, setUser] = useState(
        {
            username: '',
            password: '',
        }
    );
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        setUser({
            username,
            password
        });

        if (user.username && user.password) {
            try {
                const res = await axios.post('http://localhost:3002/api/auth/signin', {username, password});
                if(res.data.accessToken){
                    localStorage.setItem('user', JSON.stringify(res.data));
                    userContext.handleSetUser(res.data);
                    console.log(res.data);
                    navigate('/');
                } else {
                    console.log("Pas de token");
                }
            } catch (error) {
                console.log(error);                
            }
        }

        console.log(user);
        // navigate('/livres');
}
  return (
    <div className='bg-gray-200 min-h-screen'>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl w-5/6">
                <h1 className="text-3xl font-semibold text-center text-indigo-900 uppercase">
                    Login
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Nom d'utilisateur / email
                        </label>
                        <input
                            ref={usernameRef}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Mot de passe
                        </label>
                        <input
                            ref={passwordRef}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                
                    <div className="mt-6">
                        <button 
                            onClick={(e) => handleSubmit(e)}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Se connecter
                        </button>
                    </div>
                </form>
                
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Vous n'avez pas de compte ?{" "}
                    <button onClick={() => navigate('/signup')}>
                        Créer un compte
                    </button>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login