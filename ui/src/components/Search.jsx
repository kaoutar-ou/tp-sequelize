import React from 'react'

const Search = (props) => {
    const { setSearch, handleSearch, ...others} = props;
  return (
    <div className='grid grid-cols-8 my-5 mx-5 justify-items-center'>
        <div className='col-span-2 w-full md:col-span-2'></div>
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Rechercher un livre" className="col-span-3 w-full md:col-span-3 mx-3 p-2 border-2 border-gray-300 rounded-md outline-none focus:border-indigo-500" />
        <button onClick={handleSearch} className="col-span-1 md:col-span-1 mx-3 p-2 bg-indigo-500 text-white rounded-md">Rechercher</button>
        <div className='col-span-2 w-full md:col-span-2'></div>
    </div>
  )
}

export default Search