module.exports = app => {
    const commande = require("../controllers/commande.controller.js");
    const router = require("express").Router();

    router.get("/", commande.findAll);
    router.post("/create", commande.createMany);
    
    app.use('/api/commande', router);
}