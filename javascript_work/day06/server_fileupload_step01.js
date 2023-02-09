const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
// npm install -S formidable
const formidable = require("formidable");
const fs = require("fs");

// app.set("key", value) - setAttribute 용도
// app.get("key"); - getAttribute의 용도
// app.get("path", 콜백함수) - 서버의 doGet 역할
// app.post("path", 콜백함수) - 서버의 doPost 역할
app.set("port", 3000);
// console.log(app);

// console.log("__dirname >>> ", __dirname);

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    res.write("<h1>Hello world</h1>");
    res.end();
});

app.post("/saram/input", (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.dir(fields);
        var oldpath = files.photo.filepath;
        var newpath = './public/upload/' + files.photo.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
});

app.set("view engine", "ejs");
app.set("view", __dirname + "/template")

// http와 express의 결합 - rkxdms port를 공유한다.
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("서버 실행중 - http//localhost:" + app.get("port"));
});