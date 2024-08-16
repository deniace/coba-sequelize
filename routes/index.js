var express = require('express');
var router = express.Router();
const {Sequelize,Op,Model,DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect:'sqlite',
  storage: './database/files/database.sqlite'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.use('asdf',express.static('public'));

router.get('/test', async function (request, response)   {
  let res = await test_conntection("asu");

  response.send(res);
});

async function test_conntection(params) {
  try {
    await sequelize.authenticate();
    return "connected";
  } catch (error) {
    return "unable to connect " + error;
  }  
}

module.exports = router;
