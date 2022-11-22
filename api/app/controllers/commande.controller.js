const Livre = require('../models/Livre');
const Genre = require('../models/Genre');
const { Op } = require('sequelize');
const Edition = require('../models/Edition');
const Commande = require('../models/Commande');
const User = require('../models/User');

exports.create = async (commande) => {

    if(!commande.userId || !commande.livreId || !commande.quntite || !commande.date) {
        // res.status(400).send({
        //     message: "Vous devez remplir tous les champs."
        // });
        return;
    }

    const livre = await Livre.findByPk(commande.livreId);
    if (!livre) {
        return;
    }

    const user = await User.findByPk(commande.userId);
    if (!user) {
        return;
    }

    const newCommande = await Commande.build({
        userId: commande.userId,
        livreId: commande.livreId,
        quntite: commande.quntite,
        date: commande.date,
    });

    try {
        await Commande.save(newCommande);
        livre.quntite = livre.quntite - commande.quntite;
        await Livre.save(livre);

        console.log(commande);
        // res.status(200).send(commande);
    } catch (error) {
        console.log(error);
        // res.status(400).send({
        //     message:
        //         error.message || "Une erreur a été rencontré."
        // });
    }
}

exports.createMany = async (req, res) => {
    const commandes = req.body.commandes;
    if (!commandes || commandes.length && commandes.length < 1) {
        res.status(400).send({
            message: "Pas de commande."
        });
        return;
    } else {
        commandes.forEach(async (commande) => {
            await this.create(commande);
        });
    }
    res.status(200).send(commandes);
}

exports.createManyCom = async (req, res) => {
    const commandes = req.body;
    try {
        const newCommandes = await Commande.bulkCreate(
            commandes
        );
        res.status(200).send(newCommandes);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}

exports.findAll = async (req, res) => {
    const userId = req.query.userId;
    const livreId = req.query.livreId;
    const where = {};
    if (userId) {
        where.userId = {
            [Op.eq]: userId
        }
    }
    if (livreId) {
        where.livreId = {
            [Op.eq]: livreId
        }
    }
    try {
        const commandes = await Commande.findAll({
            where: where,
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ["id", "nom", "prenom", "email", "adresse", "telephone"]
                },
                {
                    model: Livre,
                    as: "Livre",
                    attributes: ["id", "titre", "description", "couverture", "prix"]
                }
            ]
        });
        res.status(200).send(commandes);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}