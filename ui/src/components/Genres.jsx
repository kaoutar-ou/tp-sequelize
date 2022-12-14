import React from 'react'

const Genres = (props) => {
  
  const { genres, genre, handleSetGenre, ...others} = props;
  
  const [genreNom, setGenreNom] = React.useState('');
  
  const handleGenre = (genre) => {
    setGenreNom(genre.nom);
    handleSetGenre(genre.id);
  }
  return (
    <div>
      <div className="flex justify-center content-center flex-row mt-5 flex-wrap">
        <div
            key={genre}
          className={`py-1 px-2 rounded-md m-2 shadow-md cursor-pointer hover:bg-indigo-200 ${
            genre === 0 ? "bg-indigo-500 text-white" : "bg-white text-black"
          }`}
          onClick={() => handleSetGenre(0)}
        >
          Tous
        </div>
        {genres.map((gnr) => (
          <div
          key={gnr.id}
            className={`py-1 px-2 rounded-md m-2 shadow-md cursor-pointer hover:bg-indigo-200 ${
              genre === gnr.id ? "bg-indigo-500 text-white" : "bg-white text-black"
            }`}
            onClick={() => handleGenre(gnr)}
          >
            {gnr.nom}
          </div>
        ))}
      </div>
      <div className="text-center m-3">
          {genre === 0 ? "Tous les genres" : genreNom}
        </div>
    </div>
  )
}

export default Genres