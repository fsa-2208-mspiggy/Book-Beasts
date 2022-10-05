const db = require("./db");
// models
const User = require("./User");
const Child = require("./Child");
const Book = require("./Book");
const Page = require("./Page");
const Tag = require("./Tag");

const data = require("./seed");

User.hasMany(Child);
Child.belongsTo(User);

Child.hasMany(Book);
Book.belongsTo(Child);

Child.hasMany(Page);
Page.belongsTo(Child)

Page.belongsTo(Book);
Book.hasMany(Page);

Tag.belongsToMany(Book, { through: 'bookTags' });
Book.belongsToMany(Tag, { through: 'bookTags' });

const syncAndSeed = async () => {
    await db.sync({ force: true });
    // will seed data here
};

module.exports = syncAndSeed;
