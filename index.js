'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var restService = express();

//restService.use(bodyParser.urlencoded({
    //extended: true
//}));

//restService.use(bodyParser.json());
var json_body_parser = bodyParser.json();

restService.post('/echo', json_body_parser, function(req, res) {
	console.log("Inside Web service call");
    var user_request=JSON.stringify(req.body.result.action);
	//if(req.result.action == 'ask'){
	var speech ="Your Requisition Bot Code is 12341234 and purchase Id is 12341234";
	console.log("user request is of format:"+user_request);
	//console.log("parameters are: "+ req.result.parameters.order_items +" "+req.result.parameters.address)
	//}
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});






restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
