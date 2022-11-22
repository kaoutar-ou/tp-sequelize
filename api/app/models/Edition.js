const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const Livre = require('./Livre');

const Edition = sequelize.define('Edition', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date_parution: {
        type: Sequelize.STRING
    },
    maison_edition: {
        type: Sequelize.STRING
    },
}, {
    tableName: 'editions',
    timestamps: false
});

Edition.belongsTo(Livre);
Livre.hasMany(Edition);

module.exports = Edition;