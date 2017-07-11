'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var restService = express();
var http = require('http');

var qs = require('querystring');

var soap=require('soap');

var parsestring=require('xml2js').parseString;

//restService.use(bodyParser.urlencoded({
    //extended: true
//}));

//restService.use(bodyParser.json());
var json_body_parser = bodyParser.json();



restService.post('/echo', json_body_parser, function(req, res) {
	console.log("Inside Web service call");
	
	
	console.log(JSON.stringify(req.body.result));
    var od_confirm=req.body.result.parameters.Order_confirm;
	
	
	console.log("item confirmation is:"+od_confirm);
	var speech="";
	if(od_confirm==='Yes'){
		console.log("Inside if block");
	 speech="Please select an activity from below: 1. Order Status 2. Place Order";
	}
	else{
	      speech="Thank You and Have a Nice Day Robert.";
	}
	  
	  	 return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
});
	  
	  



});


restService.listen((process.env.PORT || 5000), function() {
    console.log("Server up and listening");
});
	
	
