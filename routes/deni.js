var express = require("express");
var router = express.Router();

const sequelize = require("../database/sequelize");
const User = require("../database/model/User");
const { Op, where } = require("sequelize");

router.get("/", async (req, res) => {
  var data = new User({
    //   id: 1,
    nama: "Deni",
    umur: 12,
  });

  try {
    // data.sync();
    // res.send(data.nama);

    // await User.sync(); // sync tabel with model
    // await User.drop(); // delete tabel

    data.save();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.get("/jane", async (req, res) => {
  const jane = User.build({ nama: "jane" });
  const jane2 = await User.create({ nama: "Jane" });

  console.log(jane2.toJSON());

  res.send(jane2);
});

router.get("/find_all", async (req, res) => {
  const data = await User.findAll({
    attributes: ["nama"],
  });

  res.send(data);
});

router.get("/find_where", async (req, res) => {
  const data = await User.findAll({
    where: {
      id: 1,
    },
  });

  res.send(data);
});

router.get("/find_where_op", async (req, res) => {
  const data = await User.findAll({
    where: {
      [Op.and]: [{ nama: "jane" }, { umur: 2 }],
    },
  });

  const data2 = await User.findAll({
    where: {
      [Op.or]: [{ id: 1 }, { id: 2 }],
    },
  });

  const data3 = await User.findAll({
    where: {
      id: {
        [Op.or]: [2, 3],
      },
    },
  });
  res.send(data3);
});

router.get("/destroy", (req, res) => {
  const data = User.destroy({ where: { id: 2 } });
  return data;
});

module.exports = router;
