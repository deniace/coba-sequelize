const sequelize = require("../sequelize");

const { DataTypes, Model, NUMBER } = require("sequelize");

class Barang extends Model {}

Barang.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_barang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    harga: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Barang",
    tableName: "barang",
  }
);

module.exports = Barang;
