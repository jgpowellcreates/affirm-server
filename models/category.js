const {DataTypes} = require('sequelize');
const db = require('../db');

const Category = db.define("category", {
    name: {
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true
    }
},
{
    tableName: 'categories'
}
);

module.exports = Category;