const {DataTypes} = require('sequelize');
const db = require('../db');

const Role = db.define("role", {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Role;