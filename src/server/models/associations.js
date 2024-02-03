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

    user.belongsToMany(models.User, {
      through: "auditor_auditee_xref",
      as: "auditees",
      foreignKey: "auditorId",
      otherKey: "auditeeId",
    });

    user.belongsToMany(models.User, {
      through: "auditor_auditee_xref",
      as: "auditors",
      foreignKey: "auditeeId",
      otherKey: "auditorId",
    });
  };

  screenshot.associate = (models) => {
    screenshot.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };
};