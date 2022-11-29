module.exports = app => {
    const livres = require("../controllers/livre.controller.js");
    const router = require("express").Router();
    const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

    router.post("/", [verifyToken, isAdmin], livres.create);   
    router.get("/", livres.findAll);
    router.get("/:id", livres.findOne);
    router.put("/:id", [verifyToken, isAdmin], livres.update);
    router.delete("/:id", [verifyToken, isAdmin], livres.delete);
    
    app.use('/api/livres', router);
}