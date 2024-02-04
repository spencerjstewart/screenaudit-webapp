"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const setupAssociations = require("./associations");

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file !== "index.js" &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1 &&
      file !== "associations.js"
    );
  })
  .forEach((file) => {
    console.log(`Importing model from file: ${file}`);
    const requiredFile = require(path.join(__dirname, file));
    console.log(`Imported content type: ${typeof requiredFile}`);
    if (typeof requiredFile !== "function") {
      console.log(
        `Content of non-function file: ${JSON.stringify(requiredFile, null, 2)}`,
      );
    } else {
      const model = requiredFile(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });
// We need to load associations after we've loaded the models within the
// associations
setupAssociations(db);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;