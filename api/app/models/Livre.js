const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const Genre = require('./Genre');

const Livre = sequelize.define('livre', {
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
}, {
    tableName: 'livres',
    timestamps: true
});

module.exports = Livre;