import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PanierContext } from "../App";
import ClientForm from "./ClientForm";

export default function PanierModal() {
    // const { panier, handleAddToPanier, handleDeleteFromPanier } = React.useContext(PanierContext);
    const [showModal, setShowModal] = React.useState(false);
    const [panier, setPanier] = React.useState([]);
    const [commande, setCommande] = React.useState({
      user: null,
      commandes: [],
    });
    const [page, setPage] = React.useState(1);
    
    useEffect(() => {
      const panier = JSON.parse(localStorage.getItem("panier"));
      console.log(panier);
      setPanier(panier);
      setPage(1);
    }, [showModal]);

    

    const handleDeleteFromPanier = (id) => {
      const newPanier = panier.filter((item) => item.id !== id);
      localStorage.setItem("panier", JSON.stringify(newPanier));
      setPanier(newPanier);
    };

    const handleIncrementQuantity = (id) => {
      const newPanier = panier.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantite: (item.quantite + 1 > item.total) ? item.total : item.quantite + 1,
          };
        }
        return item;
      });
      localStorage.setItem("panier", JSON.stringify(newPanier));
      setPanier(newPanier);
    };

    const handleDecrementQuantity = (id) => {
      const newPanier = panier.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantite: (item.quantite - 1) > 0 ? item.quantite - 1 : item.quantite,
          };
        }
        return item;
      });
      localStorage.setItem("panier", JSON.stringify(newPanier));
      setPanier(newPanier);
    };

    return (
      <>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-indigo-500 text-white mx-2 px-3 py-1 rounded-md"
          >
            Panier
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

                    {
                      ( panier && panier.length > 0 ) && (
                        <div className="w-full flex justify-center p-3 bg-indigo-500 text-white">
                          <span className="font-semibold">
                            {
                              "Total"
                            }
                          </span>
                          <span>
                             
                            {
                              " : " +
                              panier.reduce((acc, item) => acc + item.prix * item.quantite, 0)
                            } $
                          </span>
                        </div>
                      )
                    }
                  
  
                  <div className="relative p-6 flex-auto w-full">
                    <div className="my-4 text-slate-500 text-lg leading-relaxed w-full">
                      {
                        (page === 1) ?
                          (
                            ( panier && panier.length > 0 ) ? panier.map((item) => (
                              <div key={item.id} className="flex flex-row w-full">
                                <div className="grid grid-cols-12 m-2 shadow-md w-full">
                                  <div
                                    className="col-span-1 p-3 bg-red-200 h-full flex items-center justify-center text-black cursor-pointer"
                                    onClick={() => handleDeleteFromPanier(item.id)}
                                    >
                                    <div>
                                      X
                                    </div>
                                  </div>
                                  <div className="col-span-7 p-3 flex flex-col justify-center">
                                    <div><b className="">Livre : </b> {item.titre}</div>
                                    <div><b className="">Prix : </b> {item.prix * item.quantite} $</div>
                                  </div>
                                  <div className="flex col-span-2 justify-end items-center p-3">
                                    <div>
                                      {item.quantite} / {item.total}
                                    </div>
                                  </div>
                                  <div className="flex flex-col col-span-2 justify-center items-end p-3">
                                    <div>
                                      <button 
                                        className="rounded-full bg-emerald-500 text-white px-3 py-1 m-1"
                                        onClick={() => handleIncrementQuantity(item.id)}>+</button>
                                    </div>
                                    <div>
                                      <button 
                                        className="rounded-full bg-red-500 text-white px-3 py-1 m-1"
                                        onClick={() => handleDecrementQuantity(item.id)}>-</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )) : "Votre panier est vide"
                          ) : (
                            <div className="flex flex-col w-full">
                              <ClientForm panier={panier} />
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
                    { page === 1 && (
                        <button
                          className="bg-emerald-500 text-white active:bg-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setPage(2)}
                        >
                          Suivant
                        </button>
                      )
                    }
                    {/* {
                      page === 2 && (
                        <button
                          className="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setPage(1)}
                        >
                          Précédent
                        </button>
                      )
                    } */}
                    {/* {
                      page === 2 && (
                        <button
                          className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setPage(1)}
                        >
                          Précédent
                        </button>
                      )
                    } */}
                    {
                      page === 2 && (
                        <button
                        className="bg-yellow-500 text-white active:bg-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setPage(1)}
                        >
                          Précédent
                        </button>
                      )
                    }
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