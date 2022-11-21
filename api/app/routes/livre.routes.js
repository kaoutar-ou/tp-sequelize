module.exports = app => {
    const livres = require("../controllers/livre.controller.js");
    const router = require("express").Router();

    router.post("/", livres.create);   
    router.get("/", livres.findAll);
    router.get("/:id", livres.findOne);
    router.put("/:id", livres.update);
    router.delete("/:id", livres.delete);
    
    app.use('/api/livres', router);
}