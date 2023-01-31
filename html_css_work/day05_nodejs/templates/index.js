const { query } = require('express');
const express = require('express');
const app = express();

// public을 외부에서 접속 할 수 있도록 static 설정 하기.
app.use(express.static('public'));

app.get('/car/input', function(req, res) {
    // let name = req.query.name;
    // let price = req.query.price;
    // let company = req.query.company;
    // let year = req.query.year;
    // console.log(name, price, company, year);

    console.log(req, query);
    // res.end() 문자열 사용
    // res.send() Object 사용
    // res.send(req, query);

    req.query.no = cnt++;
    carList.push(req.query);

    res.send(carList);
});

app.listen(3000, function() {
    console.log("노드js 서버 실행 중 : 3000");
});

// 숙제1 : 오전에 하던 Slider 완성
// 숙제2 : 무료템플릿 수정해서 firebase에 deploy
// 숙제3 : 배운 내용 Note 정리해서 게시판에 올리기