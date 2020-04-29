let express = require('express')

let app = express()

app.use(express.static("public"))

app.set("view engine", "ejs")

app.set("views", "./views")

app.listen(3000)

const sql = require('mssql')
const config = {
    user : "sa",
    password : "sa",
    database : "MariaCoffee",
    server : "localhost",
    port : 1433
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))


app.get('/', async (req, res) => {
  try {
    const pool = await poolPromise
    let result = await pool.request().query('select * from Intro')

    res.render("Mssql", {Intro : result})

    console.log(result.recordset[0].title)
  } catch (err) {

    res.status(500)
    res.send(err.message)
  }
})
