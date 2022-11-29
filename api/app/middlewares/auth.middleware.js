const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();


const verifyToken = (req, res, next) => {
    let token = req.session.token || req.headers["x-access-token"];


    if (!token) {
        return res.status(403).send({ message: "Pas de token!" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Non autorisé!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                console.log(roles[i].nom);
                if (roles[i].nom === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Il faut avoir un rôle Admin !" });
            return;
        });
    });
};

module.exports = {
    verifyToken,
    isAdmin
};