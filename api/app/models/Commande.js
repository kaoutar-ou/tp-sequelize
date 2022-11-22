const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const Livre = require('./Livre');
const User = require('./User');

const Commande = sequelize.define('Commande', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'En cours',
    },
    quntite: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'commandes',
    timestamps: true,
});

Livre.hasMany(Commande);
Commande.belongsTo(Livre);

User.hasMany(Commande);
Commande.belongsTo(User);

module.exports = Commande;