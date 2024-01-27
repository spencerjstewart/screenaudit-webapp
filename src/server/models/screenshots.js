module.exports = (sequelize, DataTypes) => {
  const Screenshot = sequelize.define(
    "Screenshot",
    {
      // Screenshot ID: Primary key, auto-incremented integer
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // User ID: Foreign key linking to User model
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // References the Users table
          key: 'id',
        },
      },
      // Image URL: String field to store the URL of the screenshot
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Timestamp: Timestamp of when the screenshot was taken
      timestamp: {
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

  return Screenshot;
};
