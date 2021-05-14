const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:pgadmin_93@localhost:5432/affirm-server')

module.exports = sequelize;