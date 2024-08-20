const sequelize = require("../sequelize");

const { DataTypes, Model } = require("sequelize");
const bcript = require("bcrypt");
const saltRounds = 10;

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    umur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      // set(value) {
      //   const salt = bcript.genSalt(this.saltRounds);
      //   this.setDataValue(bcript.hash(value, this.saltRounds));
      // },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

module.exports = User;
