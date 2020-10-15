var db = require('./database');
var express = require('express');

var router = express.Router();

router.get('/:id&:column', function(req, res) {
  const id = req.params.id
  const column = req.params.column 
  console.log(id);
  console.log(column);
  db.query('SELECT ' + column + ' FROM boissoncommande WHERE Commande_idCommande = ' + id, (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
})
});

module.exports = router;