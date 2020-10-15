const db = require('./database');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


function Forgot() { };

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gogojuice.projet@gmail.com',
        pass: 'juice6297'
    }
});

Forgot.prototype = {
    //Trouver un user dans la BD avec son email
    find: function (email, callback) {
        let sql = 'SELECT * FROM utilisateur WHERE email = ?';

        db.query(sql, email, function (err, result) {
            if (err) throw err

            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },
    //Update le token de l'utilisateur et envoie un email
    send: function (emailInfo, callback) {


        let sql = 'UPDATE utilisateur SET resetPasswordToken = ?, resetPasswordExpire = ? WHERE email = ?';
        let dateToken = new Date(emailInfo.dateToken);
        let data = [emailInfo.token, dateToken, emailInfo.email]

        db.query(sql, data);



        let mailOption = {
            from: 'gogojuice.projet@gmail.com',
            to: emailInfo.email,
            subject: emailInfo.subject,
            text: emailInfo.message
        };

        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                throw err
            } else {
                callback(info.response);
            }
        })
    },
    //Update le password de l'utilisateur
    update: function (body, callback) {
        var pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);

        let sqlPassword = 'UPDATE utilisateur SET password = ? WHERE email = ?';
        let data = [body.password, body.email];

        db.query(sqlPassword, data, function (err) {
            if (err) throw err
            let sqlToken = 'UPDATE utilisateur SET resetPasswordToken = null, resetPasswordExpire = null WHERE email = ?';

            db.query(sqlToken, body.email, function (err) {
                if (err) throw err

                let mailOption = {
                    from: 'gogojuice.projet@gmail.com',
                    to: body.email,
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that the password for your account ' + body.email + ' has just been changed.\n'
                }

                transporter.sendMail(mailOption, function (err, info) {
                    if (err) throw err
                    else callback(info.response);
                })
            })
        })
    }
}

module.exports = Forgot;