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
// USER
db.models.User = require("./User")(sequelize, Sequelize.DataTypes);
db.models.UserToken = require("./UserToken")(sequelize, Sequelize.DataTypes)
db.models.UserActive = require("./UserActive")(sequelize, Sequelize.DataTypes)
db.models.Role = require("./Role")(sequelize, Sequelize.DataTypes)
db.models.Address = require("./Address")(sequelize, Sequelize.DataTypes)
db.models.UserToken.belongsTo(db.models.User)
db.models.User.belongsTo(db.models.Role)
db.models.User.hasOne(db.models.Address);
db.models.Address.belongsTo(db.models.User)
db.models.UserActive.belongsTo(db.models.User)
db.models.User.hasOne(db.models.UserActive)
// STRATEGY
db.models.Strategy = require("./Strategy")(sequelize, Sequelize.DataTypes)
db.models.StrategyType = require("./StrategyType")(sequelize, Sequelize.DataTypes)
db.models.Strategy.belongsTo(db.models.StrategyType)
// ACCOUNT
db.models.Account = require("./Account")(sequelize, Sequelize.DataTypes)
db.models.AccountData = require("./AccountData")(sequelize, Sequelize.DataTypes)
db.models.AccountUser = require("./AccountUser")(sequelize, Sequelize.DataTypes)
db.models.AccountData.belongsTo(db.models.Account)
db.models.AccountUser.belongsTo(db.models.Account)
db.models.AccountUser.belongsTo(db.models.User)
db.models.Account.hasOne(db.models.AccountData)
// SUB-FUND
db.models.SubFund = require("./SubFunds")(sequelize, Sequelize.DataTypes)
db.models.SubFund.belongsTo(db.models.Strategy)


module.exports = db;
