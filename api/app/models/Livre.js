const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const Genre = require('./Genre');

const Livre = sequelize.define('Livre', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titre: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    couverture: {
        type: Sequelize.STRING
    },
    prix: {
        type: Sequelize.FLOAT
    },
    quantite: {
        type: Sequelize.INTEGER
    },
}, {
    tableName: 'livres',
    timestamps: true
});

module.exports = Livre;