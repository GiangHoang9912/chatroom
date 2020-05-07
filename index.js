let express = require('express') // khai báo express

let app = express() //khởi tạo
app.use(express.static("./public")) // public file ở phía client

app.set("view engine", "ejs")

app.set("views", "./views")

let server = require('http').Server(app) // create server

let io = require("socket.io")(server)

server.listen(process.env.PORT || 3000) // server listen post 3000
let UserOnl = []
io.on("connection", function(socket) {
    let person = new PersonUser()
    console.log("someone connection : " + socket.id)
    socket.on("disconnect", function() {
        console.log(socket.id + " : disconnected")
        UserOnl.pop(person)
    })

    socket.on("Client-send-name", function(data) {
        if (data.length != 0) {
            person = new PersonUser(data, socket.id)

            console.log(person)
            UserOnl.push(person)
            io.sockets.emit("Server-send-ds", UserOnl)
        }
    })

    socket.on("Client-send-data", function(data) {
        if (data.length != 0) {
            console.log(socket.id + " : " + data)
            io.sockets.emit("Server-send-data", person.FullName + " said : " + data)
        }
    })
})

function PersonUser(fullName, socketID) {
    this.FullName = fullName
    this.SocketID = socketID
}

app.get("/", function(req, res) {
    res.render("home")
})




var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function(req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = './public/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function(err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(process.env.PORT || 3000);