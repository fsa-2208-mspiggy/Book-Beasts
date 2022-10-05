const Sequelize = require('sequelize');

const dbName = "book-beast";
const config = {
    logging: false,
};

const db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
    config
);

module.exports = db;
