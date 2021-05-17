const {DataTypes} = require("sequelize");
const db = require('../db');

const Affirmation = db.define("affirmation", {
    statement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Affirmation;