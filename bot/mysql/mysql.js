const mysql = require('mysql')
const config = require('../../config.json')

var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

con.connect(err => {
    if (err) throw err
    console.log('Mysql connected!')
})

