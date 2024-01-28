module.exports = (sequelize, DataTypes) => {
  const Screenshot = sequelize.define("Screenshot", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, userId: {
      type: DataTypes.INTEGER, allowNull: false, references: {
        model: 'Users', key: 'id',
      },
    }, imageUrl: {
      type: DataTypes.STRING, allowNull: false,
    },

    timestamp: {
      type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW,
    },
  }, {},);

  Screenshot.associate = (models) => {
    Screenshot.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }

  return Screenshot;
};
