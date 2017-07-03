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
    var user_request=req.body.result.action;
	var user_response=req.body.result.yes_no;
	var order_item=req.body.result.parameters.order_items;
	var order_item_1=req.body.result.parameters.order_items1;
	var address=req.body.result.parameters.order-address;
	var order_color=req.body.result.parameters.color;
	var order_yes=req.body.result.parameters.order_yes_no;
	
	var speech="";
	
	if(order_item==='Solar Panel'){
	
	  speech='lets see we have Solar Panel 0605 in stock with us. Should I go ahead and place the order for you?';
	  
	  if(order_yes==='Yes'){
	  
	  speech='should i get it delivered at your office address?';
	  
	  if(order_yes==='Yes'){
	  
	  speech='Please confirm your office address. Is it Blumberger Damm 2, 12683 Berlin?'
	  
	  if(order_yes==='Yes'){
	  
	  speech='Thank you for ordering with us. Your order OD507295 for Solar panel 0605 has been placed and is being processed. You can expect delivery by 17th July 2017.'
	  }else{
	  speech='Thank you for shopping with us.';
	  }
	  }else{
	  speech='Thank you for shopping with us.';
	  }
	  
	  
	  }else{
	  speech='Thank you for shopping with us.';
	  }
	  
	  
	
	}else{
	speech='Thank you for shopping with us.';
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
	
	
