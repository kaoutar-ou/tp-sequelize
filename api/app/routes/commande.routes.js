const { verifyToken, isAdmin } = require("../middlewares/auth.middleware.js");

module.exports = app => {
    const commande = require("../controllers/commande.controller.js");
    const router = require("express").Router();

    router.get("/", [verifyToken, isAdmin], commande.findAll);
    router.post("/create", commande.createMany);
    router.put("/:id", [verifyToken, isAdmin], commande.updateStatus);
    
    app.use('/api/commande', router);
}