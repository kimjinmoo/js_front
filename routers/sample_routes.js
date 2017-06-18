/**
 *
 * routes sample
 *
 * 다른 참조 URL : https://expressjs.com/en/starter/hello-world.html
 * auth : jm
 */

var express = require('express');
var router = express.Router();

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

module.exports = router;