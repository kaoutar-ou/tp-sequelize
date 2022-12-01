const Livre = require('../models/Livre');
const Genre = require('../models/Genre');
const { Op } = require('sequelize');
const Edition = require('../models/Edition');
const Commande = require('../models/Commande');
const User = require('../models/User');

exports.create = async (commande, userId) => {

    if(!userId || !commande.livreId || !commande.quantite) {
        // res.status(400).send({
        //     message: "Vous devez remplir tous les champs."
        // });
        console.log("Vous devez remplir tous les champs.");
        return;
    }

    const livre = await Livre.findByPk(commande.livreId);
    if (!livre) {
        console.log("Livre non trouvé.");
        return;
    }

    const user = await User.findByPk(userId);
    if (!user) {
        console.log("Utilisateur non trouvé.");
        return;
    }

    console.log("userID" + userId);
    console.log("userID" + user.id);
    const newCommande = {
        UserId: user.id,
        LivreId: commande.livreId,
        quantite: commande.quantite,
        date: new Date().getTime(),
    };

    try {
        await Commande.create(newCommande);
        livre.quantite = livre.quantite - commande.quantite;
        await Livre.update(
            { quantite: livre.quantite },
            { where: { id: livre.id } }
        );

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


// try {
//     await User.save(newUser);
//     const commandes = req.body.commandes;
//     commandes.forEach(commande => {
//         commande.userId = newUser.id;
//     });
//     const newCommandes = await Commande.bulkCreate(
//         commandes
//     );
//     res.status(200).send(newCommandes);
// } catch (error) {
//     res.status(400).send({
//         message:
//             error.message || "Une erreur a été rencontré."
//     });
// }

exports.createMany = async (req, res) => {
    const userInfo = req.body.user;
    let user = await User.findOne({
        where: {
            [Op.or]: [
                { email: userInfo.email },
                // { telephone: userInfo.telephone }
            ]
        }
    });

    if (!user) {
        user = {
            nom: userInfo.nom,
            prenom: userInfo.prenom,
            email: userInfo.email,
            adresse: userInfo.adresse,
            telephone: userInfo.telephone,
        };   
        try {
            user = await User.create(user);
            console.log("User created");
        } catch (error) {
            console.log(error);
        }
    }

    const commandes = req.body.commandes;
    // console.log(commandes);
    console.log("userId : " + user.dataValues.id);
    const userId = user.id;
    console.log("🚀 ~ file: commande.controller.js:105 ~ exports.createMany= ~ userId", userId)
    if (!commandes || commandes.length && commandes.length < 1) {
        res.status(400).send({
            message: "Pas de commande."
        });
        return;
    } else {
        commandes.forEach(async (commande) => {
            await this.create(commande, userId);
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
                    attributes: ["id", "titre", "description", "couverture", "prix", "quantite"],
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

exports.updateStatus = async (req, res) => {
    const commandeId = req.params.id;
    const status = req.body.status;
    if (!commandeId || !status) {
        res.status(400).send({
            message: "Vous devez remplir tous les champs."
        });
        return;
    }
    try {
        const commande = await Commande.findByPk(commandeId);
        if (!commande) {
            res.status(400).send({
                message: "Commande non trouvé."
            });
            return;
        }
        if (status == "Annulée") {
            const livre = await Livre.findByPk(commande.LivreId);
            livre.quantite = livre.quantite + commande.quantite;
            await Livre.update(
                { quantite: livre.quantite },
                { where: { id: livre.id } }
            );
        }
        commande.status = status;
        await commande.save();
        res.status(200).send(commande);
    } catch (error) {
        res.status(400).send({
            message:
                error.message || "Une erreur a été rencontré."
        });
    }
}