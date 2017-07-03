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
	var delivery_confirmation=req.body.result.parameters.delivery_confirmation;
	var address_confirm=req.body.result.parameters.address_confirmation;
	
	var order_confirmation=req.body.result.parameters.order_confirmation;
	
	
	var speech="";
	console.log(order_item_1);
	
	  
	  if(order_confirmation==='Yes place the order'){
	   if(delivery_confirmation==='yes please go ahead'){
		    if(address_confirm==='Yes it is'){
				 speech='Thank you for ordering with us. Your order OD507295 for Solar panel 0605 has been placed and is being processed. You can expect delivered by'+ '17th July 2017.';
			}else{
				speech='Please contact our customer care to change your address.';
			}
	   }else{
		   speech='Sorry we do not deliver panels at home or office address';
	   }
	  
	  }else{
		  speech="Sorry, Our panels are of commercial use only. Thank you for shopping with us.";
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
	
	
