import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PanierContext } from "../App";
import ClientForm from "./ClientForm";

export default function CommandeModal(props) {
    const { commande } = props;
    const [showModal, setShowModal] = React.useState(false);
    
    useEffect(() => {
      
    }, [showModal]);

    return (
      <>
        <button 
            className="px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-500 border border-transparent rounded-lg active:bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
            onClick={() => setShowModal(true)}
        >
            Voir
        </button>

        {showModal ? (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-5/6 my-6 mx-auto max-w-3xl">
  
  
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
  
  
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Commande
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>

                  <div className="relative p-6 flex-auto w-full overflow-auto max-h-96">
                    <div className="my-4 text-slate-500 text-lg leading-relaxed w-full">
                      {
                        commande && (
                            <div className="grid grid-cols-5">
                                <div className="col-span-5">
                                    <img src={"http://localhost:3002/api/upload/" + commande.Livre.couverture} alt={commande.Livre.titre} className="w-full border border-1 border-slate-800" />
                                </div>

                                <div className="col-span-5">
                                    <div className="p-1 bg-indigo-500 text-white text-center">
                                        <span className="font-semibold">
                                            {"Livre"}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-white">
                                        <span className="font-semibold">
                                            {"Titre : "}
                                        </span>
                                        <span>
                                            {commande.Livre.titre}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-slate-100">
                                        <span className="font-semibold">
                                            {"Quantité totale : "}
                                        </span>
                                        <span>
                                            {commande.Livre.quantite}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-white">
                                        <span className="font-semibold">
                                            {"Prix unitaire : "}
                                        </span>
                                        <span>
                                            {commande.Livre.prix}
                                        </span>
                                    </div>
                                    <div className="p-1 bg-indigo-500 text-white text-center">
                                        <span className="font-semibold">
                                            {"Client"}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-white">
                                        <span className="font-semibold">
                                            {"Nom complet: "}
                                        </span>
                                        <span>
                                            {commande.User.nom + " " + commande.User.prenom}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-slate-100">
                                        <span className="font-semibold">
                                            {"Email : "}
                                        </span>
                                        <span>
                                            {commande.User.email}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-white">
                                        <span className="font-semibold">
                                            {"Téléphone : "}
                                        </span>
                                        <span>
                                            {commande.User.telephone}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-slate-100">
                                        <span className="font-semibold">
                                            {"Adresse : "}
                                        </span>
                                        <span>
                                            {commande.User.adresse}
                                        </span>
                                    </div>
                                    <div className="p-1 bg-indigo-500 text-white text-center">
                                        <span className="font-semibold">
                                            {"Commande"}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-slate-100">
                                        <span className="font-semibold">
                                            {"Quantité : "}
                                        </span>
                                        <span>
                                            {commande.quantite}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-slate-100">
                                        <span className="font-semibold">
                                            {"Prix total : "}
                                        </span>
                                        <span>
                                            {commande.quantite * commande.Livre.prix}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-slate-100">
                                        <span className="font-semibold">
                                            {"Etat : "}
                                        </span>
                                        <span>
                                            {commande.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}
      </>
    );
  }