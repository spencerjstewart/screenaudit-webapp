const { DataTypes } = require("sequelize");
const User = require("./users");
const Screenshot = require("./screenshots");

module.exports.associations = (db) => {
  const user = User(db.sequelize, DataTypes);
  const screenshot = Screenshot(db.sequelize, DataTypes);

  user.associate = (models) => {
    user.hasMany(models.Screenshot, {
      foreignKey: "userId",
      as: "screenshots",
      onDelete: "CASCADE",
    });
  };

  screenshot.associate = (models) => {
    screenshot.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };
};