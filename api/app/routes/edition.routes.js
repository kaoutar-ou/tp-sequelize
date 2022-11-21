module.exports = app => {
    const editions = require("../controllers/edition.controller.js");
    const router = require("express").Router();

    router.post("/", editions.create);   
    router.get("/", editions.findAll);
    router.put("/:id", editions.update);
    
    app.use('/api/editions', router);
}