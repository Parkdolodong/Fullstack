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

// express의 bodyParser 미들웨어 설정 - POST요청 방식에서 파라미터를 받기 위해.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    res.write("<h1>Hello world</h1>");
    res.end();
});

// 목록
let carList = [];

for(let i=0; i<10; i++) {
    carList.push({no:i + 1, name:"car name" + i, price: (1 + i) * 1000, year:2008 + i, company:"company" + i});
}
let no = carList.length;

// GET 요청 처리 - SELECT 기능
app.get("/car", (req, res) => {
    console.log("GET - /car");
    res.send(carList);
});

// POST 요청 처리 - INSERT 기능
// post요청에서 파라미터를 받기위해서는 body-parser 미들웨어 필요.
// 테스트는 Post Man으로 하면 된다.
app.post("/car", (req, res) => {
    console.log("POST - /car");
    let carObj = req.body;
    carObj.no = no++;
    carList.push(carObj);
    res.send(carList);
});

// 수정기능
app.post("/car/modify", (req, res)=>{
    console.log("POST - /car/modify");
    res.send(carList);
});

// 삭제기능
app.post("/car/delete", (req, res)=>{
    console.log("POST - /car/delete");
    res.send(carList);
});


app.post("/saram/input", (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(">>>>>> (1) ", fields);
    });

    form.on("end", function () {
        console.log(">>>>>> (2) ");
        console.log("파일 갯수 : ", this.openedFiles.length);
        for(let i=0; i<this.openedFiles.length; i++) {
            let file = this.openedFiles[i];
            // console.dir(file);
            let oldpath = file.filepath;
            let newpath = './public/upload/' + file.originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                // res.write('File uploaded and moved!');
                // res.end();
                res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
                res.write("<h2>upload file received!</h2>");
                res.end();
            });
        }
    });

});

app.set("view engine", "ejs");
app.set("view", __dirname + "/template")

// http와 express의 결합 - rkxdms port를 공유한다.
const server = http.createServer(app);
server.listen(app.get("port"), () => {
    console.log("서버 실행중 - http//localhost:" + app.get("port"));
});