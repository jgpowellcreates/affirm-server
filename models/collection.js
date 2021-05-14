const {DataTypes} = require('sequelize');
const db = require('../db');

const Collection = db.define("collection", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(255),
    },
    bannerImg: {
        type: DataTypes.STRING,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Collection;