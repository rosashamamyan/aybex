const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: 3306,
    dialect: dbConfig.DIALECT,
  }
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./User")(sequelize, Sequelize.DataTypes);
db.models.UserToken = require("./UserToken")(sequelize, Sequelize.DataTypes)

db.models.UserToken.belongsTo(db.models.User)

module.exports = db;
