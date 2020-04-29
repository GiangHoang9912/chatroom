let express = require('express')

let app = express()

app.use(express.static("public"))

app.set("view engine", "ejs")

app.set("views", "./views")

app.listen(3000)

let sql = require('mssql')
let config = {
    user : "sa",
    password : "sa",
    database : "ProjectNews",
    server : "localhost",
    port : 1433
}


app.get('/', function(req , res){
    let connection = new sql.ConnectionPool(config);
    connection.connect()
    req = new sql.Request(connection)
    req.query("select * from Account", function(err, recordSet){
        res.render("Mssql", {Account : recordSet})
    })
})
