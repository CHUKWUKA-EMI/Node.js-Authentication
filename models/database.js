const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'CHUKWUKA',
    password: 'chukwuka185926',
    database: 'registration'
});




module.exports = connection;