var DataTypes = require("sequelize").DataTypes;
var _FEEDS = require("./feeds");
var _FEEDUSERACCESS = require("./feeduseraccess");
var _SEQUELIZEMETA = require("./sequelizemeta");
var _USERS = require("./users");

function initModels(sequelize) {
  var FEEDS = _FEEDS(sequelize, DataTypes);
  var FEEDUSERACCESS = _FEEDUSERACCESS(sequelize, DataTypes);
  var SEQUELIZEMETA = _SEQUELIZEMETA(sequelize, DataTypes);
  var USERS = _USERS(sequelize, DataTypes);

  FEEDUSERACCESS.belongsTo(FEEDS, { as: "feed", foreignKey: "feed_id"});
  FEEDS.hasMany(FEEDUSERACCESS, { as: "feeduseraccesses", foreignKey: "feed_id"});
  FEEDS.belongsTo(USERS, { as: "deleted_by_user", foreignKey: "deleted_by"});
  USERS.hasMany(FEEDS, { as: "feeds", foreignKey: "deleted_by"});
  FEEDUSERACCESS.belongsTo(USERS, { as: "user", foreignKey: "user_id"});
  USERS.hasMany(FEEDUSERACCESS, { as: "feeduseraccesses", foreignKey: "user_id"});
  USERS.belongsTo(USERS, { as: "parent", foreignKey: "parent_id"});
  USERS.hasMany(USERS, { as: "users", foreignKey: "parent_id"});

  return {
    FEEDS,
    FEEDUSERACCESS,
    SEQUELIZEMETA,
    USERS,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
