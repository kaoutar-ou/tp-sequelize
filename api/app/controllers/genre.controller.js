const Livre = require('../models/Livre');
const Genre = require('../models/Genre');
const { Op } = require('sequelize');
const Edition = require('../models/Edition');

exports.findAll = async (req, res) => {
    try {
        console.log("genres");
        const genres = await Genre.findAll();
        
        res.status(200).send(genres);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}