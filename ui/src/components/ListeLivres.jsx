import React from 'react'
import Livre from './Livre';

const ListeLivres = (props) => {

    const { livres, genre, fetchAllLivres } = props;
    
  return (
    <div>
        <div className="m-9 p-5">
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 m-4">
            {
                    (livres?.length > 0) && 
                    livres.map((livre) => (
                        <Livre fetchAllLivres={fetchAllLivres} livre={livre} key={livre.id} showGenre={genre == 0 ? true : false}/>
                    ))
                }
            </div>
      </div>
    </div>
  )
}

export default ListeLivres