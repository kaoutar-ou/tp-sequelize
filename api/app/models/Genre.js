const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const Livre = require('./Livre');

const Genre = sequelize.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: Sequelize.STRING
    },
}, {
    tableName: 'genres',
    timestamps: false
});

Livre.belongsTo(Genre);
Genre.hasMany(Livre);

module.exports = Genre;