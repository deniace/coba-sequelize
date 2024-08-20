var express = require("express");
var router = express.Router();

const sequelize = require("../database/sequelize");
const Barang = require("../database/model/Barang");
const { Op } = require("sequelize");

// latihan sequelize finder
router.get("/", (req, res) => {
  res.send("latihan sequelize finder");
});

router.get("/sync_model", async (req, res) => {
  let a = await Barang.sync({ force: true });
  res.send("oke " + a);
});

router.post("/insert", async (req, res) => {
  if (!req.body.hasOwnProperty("nama_barang")) {
    return res.send({
      success: false,
      message: "harap mengisi nama barang",
      data: [],
    });
  }

  if (!req.body.hasOwnProperty("harga")) {
    return res.send({
      success: false,
      message: "harap mengisi harga barang",
      data: [],
    });
  }

  var data = await Barang.create({
    nama_barang: req.body.nama_barang,
    harga: req.body.harga,
  });

  res.send(data);
});

router.get("/find_by_id/:id", async (req, res) => {
  const data = await Barang.findByPk(req.params.id);

  if (data === null) {
    return res.send({
      success: false,
      message: "not found",
      data: [],
    });
  } else {
    return res.send({
      success: true,
      message: "oke",
      data: data,
    });
  }
});

router.post("/find_one", async (req, res) => {
  if (!req.body.hasOwnProperty("search")) {
    return res.send({
      success: false,
      messsage: "harap mengisi search",
      data: [],
    });
  }

  const data = await Barang.findOne({
    where: {
      nama_barang: {
        [Op.like]: "%" + req.body.search + "%",
      },
    },
  });

  if (data === null) {
    return res.send({
      success: false,
      message: "not found",
      data: [],
    });
  } else {
    return res.send({
      success: true,
      message: "oke",
      data: data,
    });
  }
});

router.post("/find_or_create", async (req, res) => {
  if (!req.body.hasOwnProperty("nama_barang")) {
    return res.send({
      success: true,
      message: "harap mengisi nama_barang",
      data: [],
    });
  }

  const [barang, created] = await Barang.findOrCreate({
    attributes: ["id", "nama_barang", "harga"],
    where: {
      nama_barang: req.body.nama_barang,
    },
    defaults: {
      harga: req.body.harga,
    },
  });

  // jika created true brati insert baru di database
  if (created) {
    return res.send({
      success: true,
      message: "created new barang",
      data: barang,
    });
  } else {
    return res.send({
      success: true,
      message: "get data barang from database",
      data: barang,
    });
  }
});

router.post("/find_count", async (req, res) => {
  let page = 1;
  let limit = 10;

  if (req.body.hasOwnProperty("page")) {
    if (req.body.page > 0) {
      page = req.body.page;
    }
  }

  if (req.body.hasOwnProperty("per_page")) {
    limit = req.body.per_page;
  }

  let offset = page * limit - limit;
  let params = {
    limit: limit,
    offset: offset,
  };

  if (req.body.hasOwnProperty("search")) {
    if (req.body.search != null || req.search.body != "") {
      params.where = {
        nama_barang: {
          [Op.like]: `%${req.body.search}%`,
        },
      };
    }
  }

  const { count, rows } = await Barang.findAndCountAll(params);

  return res.send({
    success: true,
    message: "oke",
    data: rows,
    pagination: {
      page: page,
      per_page: limit,
      total_data: count,
    },
  });
});

// =============================================================================================================
// getter

router.get("/getter_test/:id", async (req, res) => {
  const data = await Barang.findByPk(req.params.id);
  return res.send(data);
});

module.exports = router;
