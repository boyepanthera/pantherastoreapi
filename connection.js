const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pantherastoredb", "root", "AKIN@W1nder", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
