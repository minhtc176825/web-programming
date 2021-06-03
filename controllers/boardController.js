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
    const id = req.params.id

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(`SELECT * FROM board WHERE id=${id};`, (err, board) => {
            if (err) throw err

            connection.release();
            res.render('board', {board})
        })
    })
}
