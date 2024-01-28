module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, name: {
      type: DataTypes.STRING, allowNull: false,
    }, email: {
      type: DataTypes.STRING, allowNull: false, unique: true,
    }, createdAt: {
      type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW,
    }, updatedAt: {
      type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW,
    },
  }, {
    // Model options
  },);

  User.associate = (models) => {
    User.hasMany(models.Screenshot, {
      foreignKey: "userId", as: "screenshots", onDelete: "CASCADE",
    });
  };

  return User;
};
