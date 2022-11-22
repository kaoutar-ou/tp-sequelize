const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const User = require('./User');

const Client = sequelize.define('Client', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    adresse: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
}, {
    tableName: 'clients',
    timestamps: false
});

module.exports = Client;