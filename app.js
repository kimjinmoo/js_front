/**
 *
 * quit start express
 *
 * 다른 참조 URL : https://expressjs.com/en/starter/hello-world.html
 * auth : jm
 */
//정적 변수
const SERVER_PORT = 80;

// 의존성 설정
const express = require('express'); // express framework [라우터, 라우트, 미들웨어]
const path = require('path');
const http = require('http');       // http 처리
const bodyParser = require('body-parser'); // 미들웨어 POST 요청 데이터를 추출


// 라우트 설정
const sample = require('./routers/sample_routes.js');
const app = express();

// POST 데이터 파서
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 정적 파일 적용
app.use("/assets",express.static('assets'));
// 앱 라우트 적용
app.use("/sample", sample);
app.get('*', function (req, res) {
    console.log(req.url);
    var url = "index.html";
    if(req.url != "/") {
        url = req.url;
    }
    res.sendFile(path.join(__dirname, 'app/'+url));
});
// express Port 값 가져온다.
const port = process.env.PORT || SERVER_PORT;
app.set('port', port);

const server = http.createServer(app);

app.listen(SERVER_PORT, function () {
    console.log('Example app listening on port '+SERVER_PORT)
});

//module.exports = app;