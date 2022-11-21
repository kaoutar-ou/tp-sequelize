
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    pool: {
        max: dbConfig.MAX_POOL,
        min: dbConfig.MIN_POOL,
        acquire: dbConfig.ACQUIRE,
        idle: dbConfig.IDLE
    },
    logging: false,
});

module.exports = sequelize;