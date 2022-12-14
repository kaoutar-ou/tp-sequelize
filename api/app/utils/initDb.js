const Genre = require("../models/Genre");
const Role = require("../models/Role");

const genres = ["Action", "Aventure", "Biographie", "Comédie", "Drame", "Fantastique", "Horreur", "Policier", "Romance", "Science-Fiction", "Thriller"];

const roles = ["user", "admin"];

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

      const countRoles = await Genre.count();
      if (countRoles === 0) {
        roles.forEach(async (role) => {
            await Role.create({
                nom: role
            });
        });
        console.log("Roles ajoutés avec succès.");
      } else{
        console.log("Roles existants");
      }
  }



  module.exports = initDb;