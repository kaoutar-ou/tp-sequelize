const Livre = require('../models/Livre');
const Genre = require('../models/Genre');
const { Op } = require('sequelize');
const Edition = require('../models/Edition');

exports.findAll = async (req, res) => {
    let livre = req.query.livre;
    let where = {};
    if (livre) {
        where.livreId = {
            [Op.eq]: livre
        }
    }
    try {
        console.log("editions");
        const editions = await Genre.findAll(
            {
                where,
                include: [{model: Livre, as: 'livres'}]
            }
        );
        console.log(editions);
        res.status(200).send(editions);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}

exports.create = async (req, res) => {
    const edition = req.body;
    try {
        const newEdition = await Edition.create(
            edition
        );
        res.status(200).send(newEdition);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const edition = await Edition.findByPk(id);
        const updatedEdition = await edition.update(req.body);
        res.status(200).send(updatedEdition);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}