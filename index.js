'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech ="Your Requisition Bot Code is 12341234 and purchase Id is 12341234";
	var user_request=JSON.stringify(req.body.query);
	console.log("user rrequest is of format:"+user_request);
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});






restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
