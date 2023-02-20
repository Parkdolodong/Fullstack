const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
// npm i cookie-parser -S
const cookieParser = require("cookie-parser");
// npm i express-session -S
const expressSession = require("express-session");


// ejs 뷰엔진을 사용하기 위한 설정 - 뷰템플릿
app.set("views", __dirname + "/views"); // prefix - 폴더 지정
app.set("view engine", "ejs"); // suffix - 확장자
process.env.PORT = 3000;
app.set("port", process.env.PORT || 3001);
// cookieParser 미들웨어 설정
app.use(cookieParser());
// session 미들웨어 설정
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

// cors 미들웨어 설정
app.use(cors());
// bodyParser 미들웨어 설정 부분.
app.use(express.json()); // application/json
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))
// static 미들웨어 설정 - express에 내장.
app.use(express.static(__dirname + "/public"));


/////// router
router.route("/home").get((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>길동이의 홈페이지</h1>");
  res.end(); 
});

router.route("/login").post((req, res) => {
  console.log("POST - /login");
  console.log(req.body);
  if(req.session.user) {
    console.log("이미 로그인 되었다.");
  } else {
    // 로그인 진행
    req.session.user = {
      id: req.body.id,
      name: "김유신",
      authorized: true
    }
  }
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  res.write("<h1>"+req.session.use+"님 로그인 되었습니다.</h1>");
  res.write("<a href='/process/product'>상품 페이지로 이동</a>");
  res.end();
});
// 제품 상세 페이지 
router.route("/process/product").get((req, res) => {
  console.log("GET - /process/product  요청 됨");
  res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  // 로그인이 안되었으면 login페이지로 이동
  if(req.session.user){
    // session에 user정보가 있다. (로그인)
    res.write("<h1>제품 상세 정보</h1>");
    res.write("로그아웃");
    res.end();
  } else {
    // 로그아웃 상태 - 로그인 페이지로 이동.
    res.redirect("/html/loginForm.html");
  }
});


router.route("/login/cookie").post((req, res) => {
    console.log("POST - /login");
    console.log(req.body);
    // 쿠키는 사용자 쪽 (Client)에 생성된다. res에 저장.
    // npm i cookie-parser -S
    // const cookieParser = require("cookie-parser");
    // app.use(cookieParser());
    res.cookie('user', {
      id: req.body.id, 
      password: req.body.passwd,
      name: "김유신",
      ahuthorized: true
    });
    res.redirect("/");
});

app.use("/", router);
//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
//모든 라우터 처리 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static : {
        '404':'./public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404) );
app.use(errorHandler );
// 서버 실행
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Node.js 서버 실행 중 ... http://localhost:" + app.get("port"));
});