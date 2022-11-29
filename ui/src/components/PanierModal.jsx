import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PanierContext } from "../App";

export default function PanierModal() {
    // const { panier, handleAddToPanier, handleDeleteFromPanier } = React.useContext(PanierContext);
    const [showModal, setShowModal] = React.useState(false);
    const [panier, setPanier] = React.useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      const panier = JSON.parse(localStorage.getItem("panier"));
      console.log(panier);
      setPanier(panier);
    }, [showModal]);

    const handleCommander = () => {
      let commandes = panier.map((item) => {
        return {
          livreId: item.id,
          quantite: item.quantite,
        };
      });


    };
    return (
      <>
        <button
          className="bg-violet-500 text-white active:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Panier
        </button>
        {showModal ? (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-full my-6 mx-auto max-w-3xl">
  
  
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
  
  
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Panier
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
                  
  
                  <div className="relative p-6 flex-auto w-full">
                    <div className="my-4 text-slate-500 text-lg leading-relaxed w-full">
                      {
                        ( panier && panier.length > 0 ) ? panier.map((item) => (
                          <div key={item.id} className="flex flex-row w-full">
                            <div className="grid grid-cols-6 m-2 shadow-md w-full">
                              <div className="col-span-4 p-3">
                                <div>{item.titre}</div>
                                <div>{item.prix}</div>
                              </div>
                              <div className="flex col-span-2 justify-end items-center p-3">
                                <div>
                                  {item.quantite} / {item.total}
                                </div>
                              </div>
                            </div>
                          </div>
                        )) : "Votre panier est vide"
                      }
                    </div>
                  </div>
                  
  
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Vérifier
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