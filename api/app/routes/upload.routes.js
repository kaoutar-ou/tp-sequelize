module.exports = app => {
    const upload = require("../controllers/upload.controller.js");
    const router = require("express").Router();

    router.post("/", upload.uploadCouverture);
    router.get("/:name", upload.getCouverture);
    
    app.use('/api/upload', router);
}