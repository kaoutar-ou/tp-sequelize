import React from 'react'
import Livre from './Livre';

const ListeLivres = (props) => {

    const { livres, genre } = props;
    
  return (
    <div>
        <div className="m-9 p-5 shadow-md">
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 m-4">
            {
                    (livres?.length > 0) && 
                    livres.map((livre) => (
                        <Livre livre={livre} key={livre.id} showGenre={genre === "all" ? true : false}/>
                    ))
                }
            </div>
      </div>
    </div>
  )
}

export default ListeLivres