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
	var speech="There is an error in calling Bot service";
    var user_request=JSON.stringify(req.body.result.action);
	var order_item=req.body.result.parameters.order_items;
	var address=req.body.result.parameters.address;
	if(req.result.action == 'ask'){
	speech="Your requisition bot Id is 1234 and purchase id is 12345";
	console.log("user request is of format:"+user_request);
	console.log("parameters are: "+ JSON.stringify(order_item) +" "+JSON.stringify(address));
	}
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});






restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
