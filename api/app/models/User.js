const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;