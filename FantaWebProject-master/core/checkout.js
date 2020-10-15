var db = require('./database');

function placeOrder() {};

placeOrder.prototype = {
    create : function(body, callback) 
    { 
        var bind = [];

        for(prop in body) {
            bind.push(body[prop]);
        }

        let sql = "INSERT INTO commande(InfoLivraison, InfoClient, NombreBoisson, PrixFinal, Etat) VALUES (?, ?, ?, ?, ?)";

        db.query(sql, bind, function(err, result){
            if(err) throw err
            callback(result.insertId);
        });
    },
    boisson : function(body, callback)
    {
        var bind = [];

        for(prop in body) {
            bind.push(body[prop]);
        }

        let sql = "INSERT INTO boissoncommande(Boisson_idBoisson, Commande_idCommande) VALUES (?, ?)";

        db.query(sql, bind, function(err, result){
            if(err) throw err
            callback(result.insertId);
        });
    }
}

//ajouter router.get pour trouver count de nbre de order total et le remplacer dans fetch info order dans loading function

module.exports = placeOrder;


