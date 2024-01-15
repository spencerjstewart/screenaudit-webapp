module.exports = (sequelize, DataTypes) => {
  // JUST FOR TESTING
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {},
  );
  return User;
};
