module.exports = app => {
    const genres = require("../controllers/genre.controller.js");
    const router = require("express").Router();

    router.get("/", genres.findAll);
    
    app.use('/api/genres', router);
}