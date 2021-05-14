const {DataTypes} = require('sequelize');
const db = require('../db');

const UserCollection = db.define("userCollection", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    ownerRole: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

module.exports = UserCollection;