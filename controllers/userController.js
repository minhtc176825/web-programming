const mysql = require('mysql')

// Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
})

// View Users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Connected as ID ` + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM user', (err, rows) => {

            if (err) throw err
            // when done with the connection, release it
            connection.release();
            res.render('index', {rows})
            console.log('The data from user table: \n', rows)
        })
    })
}

exports.login = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    pool.getConnection((err, connection) => {
        if (err) throw err
        
        connection.query(`SELECT * FROM user WHERE username='${username}' AND password='${password}';`, (err, rows) => {
            if (err) throw err

            if (rows.length > 0) {
                connection.query(`SELECT * FROM board WHERE userId=${rows[0].id}`, (err, boards) => {
                    if (err) throw err
                    connection.release()
                    console.log(rows[0].id)
                    console.log('CHECK')
                    console.log(boards)
                    res.render('home', { boards })
                })
               
            } else {   
                console.log("Failed")
            }
            
            console.log(rows)
        })
    })
}