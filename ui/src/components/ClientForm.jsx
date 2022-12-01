import axios from 'axios';
import React, { useRef } from 'react'

const ClientForm = (props) => {
    const { panier } = props;
    const nomRef = useRef();
    const prenomRef = useRef();
    const emailRef = useRef();
    const adresseRef = useRef();
    const telephoneRef = useRef();

    const handleCommander = async () => {
        let commandes = panier.map((item) => {
          return {
            livreId: item.id,
            quantite: item.quantite,
          };
        });
        console.log(commandes);
        let user = {
            nom: nomRef.current.value,
            prenom: prenomRef.current.value,
            email: emailRef.current.value,
            adresse: adresseRef.current.value,
            telephone: telephoneRef.current.value,
        }
        console.log(user);
        if(user.nom && user.prenom && user.email && user.adresse && user.telephone && commandes != null && commandes.length > 0){
            try {
                const res = await axios.post("http://localhost:3002/api/commande/create", {user, commandes});
                console.log(res);
                if(res.status === 200){
                    localStorage.removeItem("panier");
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    
  return (
    <div>
        <h1 className="text-3xl font-semibold text-center text-indigo-900 uppercase">
                      Formulaire
                  </h1>
                  <form className="mt-6">
                      <div className="mb-2">
                          <label
                              htmlFor="nom"
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
                              htmlFor="prenom"
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
                              htmlFor="telephone"
                              className="block text-sm font-semibold text-gray-800"
                          >
                              Téléphone
                          </label>
                          <input
                              ref={telephoneRef}
                              type="text"
                              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                      </div>
                      <div className="mb-2">
                          <label
                              htmlFor="adresse"
                              className="block text-sm font-semibold text-gray-800"
                          >
                              Adresse
                          </label>
                          <input
                              ref={adresseRef}
                              type="text"
                              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                      </div>
                  
                      <div className="mt-6">
                          <button 
                              onClick={() => handleCommander()}
                              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-emerald-500 rounded-md hover:bg-emerald-400 focus:outline-none focus:bg-emerald-400">
                              Vérifier
                          </button>
                      </div>
                  </form>
    </div>
  )
}

export default ClientForm