/**
 *
 * routes sample
 *
 * 다른 참조 URL : https://expressjs.com/en/starter/hello-world.html
 * auth : jm
 */

const express = require('express');
const router = express.Router();

router.get("/greeting", function(req, res, next) {
    var obj = {
        "test" : "hello"
    };

    res.json(obj);
});

router.get("/greeting/:language", function(req, res, next) {
    var obj = {
        "test" : ""
    };
    switch (req.params.language) {
        case "korea" :
            obj.test = "안녕";
            break;
        case "use" :
            obj.test = "hi";
            break;
        default :
            obj.test = "hello";
    }

    res.json(obj);
});

router.get("/list", function(req, res, next) {
    var obj = [
        {seq : 1, title : "테스트 글", contents : "내용1", readCount : 0, regId : "0", regDate : "2017-07-08"},
        {seq : 2, title : "테스트 글2", contents : "내용2", readCount : 3, regId : "0", regDate : "2017-07-08"},
        {seq : 3, title : "테스트 글3", contents : "내용3", readCount : 5, regId : "0", regDate : "2017-07-08"}
    ];

    res.json(obj);
});
router.get("/list/:seq", function(req, res, next) {
    var obj = {};
    console.log("params : " + req.params.seq);
    switch (req.params.seq) {
        case "1":
            obj = {seq : 1, title : "테스트 글", contents : "내용1", readCount : 0, regId : "0", regDate : "2017-07-08"};
            break;
        case "2" :
            obj = {seq : 2, title : "테스트 글2", contents : "내용2", readCount : 3, regId : "0", regDate : "2017-07-08"};
            break;
        case "3" :
            obj =  {seq : 3, title : "테스트 글3", contents : "내용3", readCount : 5, regId : "0", regDate : "2017-07-08"};
            break;
        default :
            obj = {};
    }
    res.json(obj);
});

module.exports = router;