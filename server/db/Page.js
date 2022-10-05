const db = require("./db");
const { Sequelize } = db;

const Page = db.define("page", {
    content: {
        type: Sequelize.TEXT,
    },
    image: {
        // url for now
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
    },
    // might be better to use a through table
    pageNumber: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Page;
