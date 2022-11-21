const Livre = require('../models/Livre');
const Genre = require('../models/Genre');
const { Op } = require('sequelize');
const Edition = require('../models/Edition');

exports.create = async (req, res) => {
    
    if (!req.body.titre || !req.body.description || !req.body.couverture || !req.body.prix || !req.body.genre || !req.body.date_parution || !req.body.maison_edition) {
        res.status(400).send({
            message: "Vous devez remplir tous les champs."
        });
        return;
    }

    const livre = Livre.build({
        titre: req.body.titre,
        description: req.body.description,
        couverture: req.body.couverture,
        prix: req.body.prix,
    });

    livre.setGenre(req.body.genre);

    const date_parution = req.body.date_parution
    const edition = Edition.build({
        date_parution: date_parution,
        maison_edition: req.body.maison_edition,
        livre_id: livre.id
    });
    // edition.setLivre(livre);
    
    try {
        await edition.save(edition);
        livre.addEdition(edition);
        await livre.save(
            livre
        );
        res.status(200).send(livre);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}

exports.findAll = async (req, res) => {
    let titre = req.query.titre;
    let genre = req.query.genre;
    let where = {};
    console.log(genre);
    if (titre) {
        where.titre = {
            [Op.like]: `%${titre}%`
        }
    }
    if (genre) {
        where.genreId = {
            [Op.eq]: genre
        }
    }
    try {
        const livres = await Livre.findAll({
            where,
            include: [{model: Genre, as: 'genre'}, {model: Edition, as: 'editions'}]
        });
        res.status(200).send(livres);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const livre = await Livre.findByPk(id, {
            include: [{model: Genre, as: 'genre'}, {model: Edition, as: 'editions'}]
        });
        res.status(200).send(livre);
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
        const livre = await Livre.findByPk(id);
        if (!livre) {
            res.status(400).send({
                message: "Livre non trouvé."
            });
            return;
        }
        console.log(livre.genreId);
        livre.titre = req.body.titre ? req.body.titre : livre.titre;
        livre.description = req.body.description ? req.body.description : livre.description;
        livre.couverture = req.body.couverture ? req.body.couverture : livre.couverture;
        livre.prix = req.body.prix ? req.body.prix : livre.prix;
        livre.setGenre(req.body.genre ? req.body.genre : livre.genreId);

        await livre.save();
        res.status(200).send(livre);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;

    console.log(id);
    try {
        const livre = await Livre.findByPk(id);
        if (!livre) {
            res.status(400).send({
                message: "Livre non trouvé."
            });
            return;
        }
        await livre.destroy();
        res.status(200).send(livre);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}
