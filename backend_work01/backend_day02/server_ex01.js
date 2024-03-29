const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

// view engin - 템플릿엔진
app.set("views", __dirname + "/views"); // prefix
app.set("view engine", "ejs"); // suffix

process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);
//console.log(process.env.PORT ? process.env.PORT : 3000);
// a += 1;
// a = a + 1;
//console.log(process.env.PORT || 3000);  // 3항 연산자의 줄임 표현

// 특정 패스 요청 처리 app.get()
app.get("/home", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); // end() 안하면 무한루프 발생.
});

// bodyParser 미들웨어 설정 - express의 설정으로 변경
// POST 요청 방식에서 body의 파라미터 사용 가능.
app.use(express.json()); // application/json
app.use(express.urlencoded({extended:true})) // application/x-www-form-urlencoded

const carList = [
  { no: 1, title: "SONATA", price: 3000, company: "HYUNDAI", year: 2022 },
  { no: 2, title: "GRANDEUR", price: 4000, company: "HYUNDAI", year: 2019 },
  { no: 3, title: "K9", price: 7000, company: "KIA", year: 2020 },
];

// ejs 템플릿 뷰 엔진 사용
app.get("/car", (req, res) => {
  // req.app.render(뷰, data, 콜백(err, data){});
  let userName = "홍길동";
  req.app.render("car", { userName, carList }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.end(data);
  });
});

const todoList = [
  { idx: 1, title: "hello", done: false },
  { idx: 2, title: "world", done: false },
  { idx: 3, title: "node공부", done: false }
];

// GET 요청 방식에서 처리
app.get("/todoList", (req, res) => {
  console.log("GET - /todoList");
  req.app.render("todoList", { todoList: todoList}, (err, data) => {
    console.log("data", data);
    res.end(data);
  });
});

// POST 요청일때 처리
app.post("/todoList", (req, res)=>{
  console.log("POST - /todoList");
  // post방식에서 파라미터 받기 - bodyParser미들웨어 사용
  // express.json(), express.urlencoded() 미들위어로 설정
  let newItem = req.body.newItem;
  console.log("new item : " + newItem);
  // 저장 후 목록 갱신...
  // res.end()
  // res.send()
  res.redirect("/todoList");
});

// http와 express를 합쳐준다. - 같은 port 사용.
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});