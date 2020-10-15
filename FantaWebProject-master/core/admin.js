var db = require('./database');
var express = require('express');

var router = express.Router();

router.get('/admin', (req, res) => {
  db.query('SELECT SUM(NombreBoisson) FROM commande', [req.params.id], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});


module.exports = router;