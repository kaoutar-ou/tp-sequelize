const Genre = require("../models/Genre");

const genres = ["Action", "Aventure", "Biographie", "Comédie", "Drame", "Fantastique", "Horreur", "Policier", "Romance", "Science-Fiction", "Thriller"];

const initDb =async ()=> {
      const countGenres = await Genre.count();
      if (countGenres === 0) {
        genres.forEach(async (genre) => {
            await Genre.create({
                nom: genre
            });
        });
        console.log("Genres ajoutés avec succès.");
      } else{
        console.log("Genres existants");
      }
  }

  module.exports = initDb;