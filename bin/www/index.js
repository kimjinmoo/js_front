/**
 *
 * quit start express
 *
 * 다른 참조 URL : https://expressjs.com/en/starter/hello-world.html
 * auth : jm
 */

const express = require('express');
const app = express();
var sample = require('./../../routers/sample_routes.js');

// 정적 파일 적용
app.use(express.static('assets'));

// 앱 라우트 적용
app.use(sample);
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app;