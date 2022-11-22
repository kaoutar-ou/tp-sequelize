const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const User = require('./User');

const Role = sequelize.define('Role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'roles',
    timestamps: false,
});

User.belongsToMany(Role, { through: "user_roles" });
Role.belongsToMany(User, { through: "user_roles" });


module.exports = Role;