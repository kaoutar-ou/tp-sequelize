const Livre = require('../models/Livre');
const Genre = require('../models/Genre');
const { Op } = require('sequelize');
const Edition = require('../models/Edition');

exports.create = async (req, res) => {
    console.log("create");
    
    if (!req.body.titre || !req.body.quantite || !req.body.description || !req.body.couverture || !req.body.prix || !req.body.genre || !req.body.editions ) {
        console.log("Vous devez remplir tous les champs.");
        res.status(400).send({
            message: "Vous devez remplir tous les champs."
        });
        return;
    }

    let livre = {
        titre: req.body.titre,
        description: req.body.description,
        couverture: req.body.couverture,
        prix: req.body.prix,
        quantite: req.body.quantite,
        GenreId: req.body.genre
    };
    
    try {
        livre = await Livre.create(
            livre
        );
        req.body.editions.forEach(edition => {
            let newEdition = Edition.create({
                date_parution: edition.date_parution,
                maison_edition: edition.maison_edition,
                LivreId: livre.id
            });
            livre.addEdition(newEdition);
        });
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
    
    if (titre) {
        where.titre = {
            [Op.like]: `%${titre}%`
        }
        where.description = {
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
            include: [{model: Genre, as: 'Genre'}, {model: Edition, as: 'Editions'}]
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
            include: [{model: Genre, as: 'Genre'}, {model: Edition, as: 'Editions'}]
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
        
        livre.titre = req.body.titre ? req.body.titre : livre.titre;
        livre.description = req.body.description ? req.body.description : livre.description;
        livre.couverture = req.body.couverture ? req.body.couverture : livre.couverture;
        livre.prix = req.body.prix ? req.body.prix : livre.prix;
        livre.quantite = req.body.quantite ? req.body.quantite : livre.quantite;
        livre.setGenre(req.body.genre ? req.body.genre : livre.genreId);
        if(req.body.editions) {
            req.body.editions.forEach(edition => {
                if(!edition.id) {
                    let newEdition = Edition.create({
                        date_parution: edition.date_parution,
                        maison_edition: edition.maison_edition,
                        LivreId: livre.id
                    });
                    livre.addEdition(newEdition);
                }
            });
        }
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
