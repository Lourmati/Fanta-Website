const mysql = require('mysql');
const util = require('util');

//Create connection
const database = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'gogojuice'
});

//connect
database.getConnection((err,connection) => {
    if(err){
        throw err
    }
    console.log('MySql connected...');
});

database.query = util.promisify(database.query);

module.exports = database;