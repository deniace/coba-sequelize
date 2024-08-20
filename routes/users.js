var express = require("express");
const User = require("../database/model/User");
var router = express.Router();

const bcript = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/sync", async function (req, res, next) {
  let result = await User.sync({ force: true });
  return res.send("user sync " + result);
});

router.post("/store", async (req, res) => {
  // var data = new User({
  //   nama: "deni ace",
  //   umur: 19,
  //   password: "password",
  // });

  // const result = await data.save();

  const raw_text = "ini coba text yang mau di hash";
  const pre_hash =
    "$2b$10$5johfXmG5/EhS8Hr0dnpsuK7Vntd/D6w3t7lFFJmA8u/nDtaO/cXq";

  const hash_with_salt =
    "$2b$10$TONiKQUER4Z9BTND7gXQSOytTW.fG3p43e3W3owQg3lx4X7iwJrBW";

  const compate_text = await bcript.compare(raw_text, pre_hash);

  const salt = await bcript.genSalt(10);

  const hashed_text = await bcript.hash(raw_text, salt);

  const compare_has_with_salt = await bcript.compare(raw_text, hash_with_salt);

  return res.send({
    raw: raw_text,
    pre_hash: pre_hash,
    compate_text: compate_text,
    salt: salt,
    hashed_text: hashed_text,
    compare_has_with_salt: compare_has_with_salt,
  });
});

module.exports = router;
