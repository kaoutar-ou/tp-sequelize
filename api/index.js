const express = require('express');
const cors  = require('cors');
const cookieSession = require("cookie-session");
const fileUpload = require('express-fileupload');
const sequelize = require('./app/models/db');
const initDb = require('./app/utils/initDb');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002;
const SECRET = process.env.JWT_KEY;

let corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "livres-session",
        secret: SECRET,
        httpOnly: true,
    })
);

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

require("./app/routes/auth.routes")(app);
require("./app/routes/livre.routes")(app);
require("./app/routes/edition.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/commande.routes")(app);
require("./app/routes/upload.routes")(app);

app.listen(PORT, () => {
    console.log(`Connecté | port : ${PORT}.`);
});