let express = require('express')

let router = express.Router()

router.get('/', function(req , res,next){
    getData(function(recordSet){
        res.render("Server", {Account : recordSet})
    })
})

function getData(callBack){
    let sql = require('mssql')
    let config = {
        user : "sa",
        password : "sa",
        database : "ProjectNews",
        server : "localhost"
    }
    let connection = new sql.Connection(config, function(err){
        let req = new sql.Request(connection)
        req.query("select * from Account", function(err, recordSet){
            callBack(recordSet);
        })
    })
}

module.exports = router