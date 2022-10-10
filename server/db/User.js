const db = require("./db");
const { Sequelize } = db;
const {
    hashPassword,
    authenticate,
    generateToken,
    findByToken,
} = require("./utils");

const User = db.define("user", {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [4, 32],
            isAlphanumeric: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     len: [8, 32],
        // }
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.authenticate = authenticate(User);
User.findByToken = findByToken(User);
User.prototype.generateToken = generateToken;

module.exports = User;
