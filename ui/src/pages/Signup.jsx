import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    // const userContext = React.useContext(UserContext);
  
      const [user, setUser] = useState(
          {
              username: '',
              email: '',
              password: '',
              nom: '',
              prenom: '',
              roles: ["user"],
          }
      );
      const usernameRef = useRef();
      const passwordRef = useRef();
      const emailRef = useRef();
        const nomRef = useRef();
        const prenomRef = useRef();
  
      const handleSubmit = async (e) => {
          e.preventDefault();
  
          const username = usernameRef.current.value;
          const password = passwordRef.current.value;
            const email = emailRef.current.value;
            const nom = nomRef.current.value;
            const prenom = prenomRef.current.value;
  
          setUser({
              username,
              password,
              email,
              nom,
              prenom,
          });
  
          if (user.username && user.password && user.email && user.nom && user.prenom) {
              try {
                  const res = await axios.post('http://localhost:3002/api/auth/signup', {username, password, email, nom, prenom});
                  localStorage.setItem('token', res.data.accessToken);
                  console.log(res.data);
                  navigate('/');
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
              <div className="p-6 m-auto bg-white rounded-md shadow-xl w-5/6 lg:max-w-xl">
                  <h1 className="text-3xl font-semibold text-center text-indigo-900 uppercase">
                      Inscription
                  </h1>
                  <form className="mt-6">
                      <div className="mb-2">
                          <label
                              htmlFor="username"
                              className="block text-sm font-semibold text-gray-800"
                          >
                              Nom
                          </label>
                          <input
                              ref={nomRef}
                              type="text"
                              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                      </div>
                      <div className="mb-2">
                          <label
                              htmlFor="username"
                              className="block text-sm font-semibold text-gray-800"
                          >
                              Prénom
                          </label>
                          <input
                              ref={prenomRef}
                              type="text"
                              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                      </div>
                      <div className="mb-2">
                          <label
                              htmlFor="username"
                              className="block text-sm font-semibold text-gray-800"
                          >
                              Nom d'utilisateur
                          </label>
                          <input
                              ref={usernameRef}
                              type="text"
                              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                      </div>
                      <div className="mb-2">
                          <label
                              htmlFor="email"
                              className="block text-sm font-semibold text-gray-800"
                          >
                              Email
                          </label>
                          <input
                              ref={emailRef}
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
                              onClick={handleSubmit}
                              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                              Se connecter
                          </button>
                      </div>
                  </form>
                  
                  <p className="mt-8 text-xs font-light text-center text-gray-700">
                      {" "}
                      Vous avez déjà un compte ?{" "}
                      {/* <a
                          href="#"
                          className="font-medium text-indigo-600 hover:underline"
                      > */}
                      <button onClick={() => navigate('/login')}>
                          Se connecter
                      </button>
                      {/* </a> */}
                  </p>
              </div>
          </div>
      </div>
    )
}

export default Signup