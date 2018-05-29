const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const handleRequest = require("./lib/request-handler");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post("/chat/messages", upload.array(), (req, res) => {
    handleRequest(req).then((response) => {
        res.send(response);
    });
});

app.listen(9000, () => console.log("Listening on port 9000!"));
