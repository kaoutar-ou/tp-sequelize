const express = require('express');
const cors  = require('cors');
const fileUpload = require('express-fileupload');
const sequelize = require('./app/models/db');
const initDb = require('./app/utils/initDb');

const app = express();

const PORT = process.env.PORT || 3002;


let corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


sequelize.authenticate().then(() => {
    sequelize.sync({ force: false }).then(() => {
        initDb();
        console.log('Database synchronisée');
    });
}).catch(err => {
    console.error('Ne peut pas se connecter à la base de données: ', err);
});

app.use(fileUpload());

app.get("/", (req, res) => {
    res.json({ message: "Bonjour dans mon application !" });
});

require("./app/routes/livre.routes")(app);
require("./app/routes/edition.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/upload.routes")(app);

app.listen(PORT, () => {
    console.log(`Connecté | port : ${PORT}.`);
});