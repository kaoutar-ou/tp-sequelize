module.exports = app => {
    const upload = require("../controllers/upload.controller.js");
    const router = require("express").Router();
    const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

    router.post("/", [verifyToken, isAdmin], upload.uploadCouverture);
    router.get("/:name", upload.getCouverture);
    
    app.use('/api/upload', router);
}