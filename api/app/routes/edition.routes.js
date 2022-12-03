module.exports = app => {
    const editions = require("../controllers/edition.controller.js");
    const router = require("express").Router();
    const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

    router.post("/", [verifyToken, isAdmin], editions.create);   
    router.get("/", editions.findAll);
    router.put("/:id", [verifyToken, isAdmin], editions.update);
    router.delete("/:id", [verifyToken, isAdmin], editions.delete);
    
    app.use('/api/editions', router);
}