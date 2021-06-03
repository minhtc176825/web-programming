const mysql = require('mysql')

// Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
})

var userID; 

// Login
exports.login = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`SELECT * FROM user WHERE username='${username}' AND password='${password}';`, (err, result) => {

            if (err) throw err
            userID = result[0].id
            // If there's an account 
            if (result.length > 0) {
                connection.query(`SELECT * FROM board WHERE userId=${result[0].id};`, (err, boards) => {
                    if (err) throw err
                    connection.release()
                    res.render('home', { boards})
                })
            } else {
                res.render('index', { response: false })
                console.log("FAILED")
            }
        })
    })
}

// View all boards
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`SELECT * FROM board WHERE userId=${userID};`, (err, boards) => {
            if (err) throw err

            connection.release()
            res.render('home', { boards })
        })
    })
}

exports.search = (req, res) => {
    const search = req.body.search 

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`SELECT * FROM board WHERE userId=${userID} AND name LIKE '%${search}%';`, (err, boards) => {
            if (err) throw err

            connection.release()

            res.render('home', { boards })
        })
    })
}