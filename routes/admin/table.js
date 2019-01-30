/*
*桌台路由
*/
//创建路由器
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

//get /admin/settings
router.get('/', (req, res) => {
    pool.query('SELECT * FROM table ORDER BY tid', (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  