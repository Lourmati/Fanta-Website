const db = require('./database');
const bcrypt = require('bcrypt');

function User() { };

User.prototype = {
    //Trouver un user dans la BD
    find: function (user = null, callback) {
        if (user) {
            if (Number.isInteger(user)) {
                var sql = 'SELECT * FROM utilisateur WHERE idUtilisateur = ?';
            }
            else {
                var sql = 'SELECT * FROM utilisateur WHERE email = ?';
            }
        }


        db.query(sql, user, function (err, result) {
            if (err) throw err

            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },
    //Créer un nouveau user dans la BD
    create: function (body, callback) {
        var pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);

        var bind = [];

        for (prop in body) {
            bind.push(body[prop]);
        }

        let sql = "INSERT INTO utilisateur(email, password, client_IdClient) VALUES (?, ?, ?)";

        db.query(sql, bind, function (err, result) {
            if (err) throw err
            callback(result.insertId);
        });
    },

    //Créer un nouveau client dans la BD
    client: function (body, callback) {
        var bind = [];

        for (prop in body) {
            bind.push(body[prop]);
        }

        let sql = "INSERT INTO client(Nom, Prenom) VALUES (?, ?)";

        db.query(sql, bind, function (err, result) {
            if (err) throw err
            callback(result.insertId);
        });
    },

    //Login avec un user dans la BD
    login: function (email, password, callback) {
        this.find(email, function (user) {
            if (user) {
                if (bcrypt.compareSync(password, user.Password)) {
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    },

    //Trouver un user dans la BD qui a le Token
    findToken: function (tokenInfo, callback) {
        let sql = "SELECT * FROM utilisateur WHERE resetPasswordToken = ? AND resetPasswordExpire >= ?";
        let data = [tokenInfo.resetPasswordToken, tokenInfo.resetPasswordExpire];
        db.query(sql, data, function (err, result) {
            if (err) throw err

            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        })
    }

}

module.exports = User;