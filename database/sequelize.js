const { Sequelize } = require("sequelize");

let sequelize;

if (sequelize === null || sequelize == undefined) {
  // sequelize = new Sequelize({
  //     dialect: 'sqlite',
  //     storage: './database/files/database.sqlite'
  // });

  sequelize = new Sequelize("sequelize_test", "root", "", {
    host: "localhost",
    dialect: "mariadb",
  });
}

module.exports = sequelize;
