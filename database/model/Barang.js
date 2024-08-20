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
      get() {
        const raw_data = this.getDataValue("nama_barang");
        return raw_data.toUpperCase();
      },
    },
    harga: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    // nama_harga: {
    //   type: DataTypes.STRING,
    //   get() {
    //     return `${this.getDataValue("nama_barang")} - ${this.getDataValue(
    //       "harga"
    //     )}`;
    //   },
    // },
  },
  {
    sequelize,
    modelName: "Barang",
    tableName: "barang",
  }
);

module.exports = Barang;
