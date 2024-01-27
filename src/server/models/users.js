module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // User ID: Primary key, auto-incremented integer
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // Name: String field, cannot be null
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Email: String field, unique and cannot be null
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // createdAt: Timestamp, automatically set to current time on creation
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      // updatedAt: Timestamp, automatically updated to current time on record update
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      // Model options
    },
  );

  // Define any model associations here (if necessary)

  return User;
};
