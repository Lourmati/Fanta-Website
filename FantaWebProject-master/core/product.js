var db = require('./database');
var express = require('express');

var router = express.Router();

router.get('/:id&:column', function(req, res) {
  const id = req.params.id
  const column = req.params.column 

  db.query('SELECT ' + column + ' FROM boisson WHERE IdBoisson = ' + id, (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
})
});

router.get('/:column', function(req, res) {
  const column = req.params.column 

  db.query('SELECT ' + column + ' FROM boisson', (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
})
});

module.exports = router;


