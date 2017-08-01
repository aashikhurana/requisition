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
	var action=req.body.result.action;
    var type_order=req.body.result.parameters.selection_type;
	console.log(type_order);
	var item_order=req.body.result.parameters.Items;
	console.log(item_order);
	var pen_color=req.body.result.parameters.Pen_color;
	console.log(pen_color);
	var notebooktype=req.body.result.parameters.type_notebook;
	console.log(notebooktype);
	var pap_conf=req.body.result.parameters.Paper_confirm;
	var exit_contx=req.body.result.parameters.exit_context;
	console.log(exit_contx);
	var order_id=req.body.result.parameters.OrderId;
	console.log(exit_contx);
	var speech="There is some error with bot";
	var datetime = addDays(new Date(), 7);
	console.log("Today's date:"+datetime);
	
	if(action==='new_order'){
	if(type_order){
		console.log("inside type order");
	if(type_order==='New order'){
	 speech="Please choose one of the items from Pen,Paper,Stapler,Notebook";
	 
	 }else if(type_order==='Check Status'){
	 speech="Please enter your Order ID";
	}else{
	   speech="Input is not valid. Please select from place a new order or Check Status.b would you like to continue?";
	}
	}
	 
	if(item_order){
			 if(item_order==='Pen'){
	  speech="We have blue and black pens with us which one would you like to place order for."
	}else if(item_order=='Paper'){
	  speech="Currently A4 Size paper is available should I go ahead and place order for you?";
	}else if(item_order==='notebook'){
	  speech="We have hardbound and Spiral notebook which one would you like to place order for?";
	}else if(item_order==='Stapler'){
	  speech="Your order with id 5075 has been confirmed and will be delivered to you by "+datetime;
	}else{
		speech="Input is not valid. Please Choose one of the items from Pen,Paper,Stapler,Notebook. would you like to continue?";
	}
	
	}
	 
if(pen_color){
	
	if(pen_color==='black'){
	  speech="Your order with id 7865 has been confirmed and will be delivered to you by "+datetime+"Is there anything else I can help you with?";
	}else if(pen_color==='blue'){
	  speech="Your order with id 91123 has been confirmed and will be delivered to you by "+datetime+"Is there anything else I can help you with?";
	}
	else{
	  speech="Sorry order for "+pen_color +" pen could not be placed as currently it is not available. Would you like to continue?";
	}
}

if(notebooktype){
	
	console.log("inside notebook type");
	
	if(notebooktype==='hardbound'){
	speech="Your order with id 5421 has been confirmed and will be delivered to you by "+datetime+"Is there anything else I can help you with?";
	}else if(notebooktype==='Spiral'){
	speech="Your order with id 7114 has been confirmed and will be delivered to you by "+datetime+"Is there anything else I can help you with?";
	}
	else{
	 speech="Sorry order for "+notebooktype +" notebook could not be placed as currently it is not available. Would you like to continue?";
	}
	
}

if(pap_conf){
	
	if(pap_conf==='yes'){
		speech="Your order with id 8954 has been confirmed and will be delivered to you by "+datetime+"Is there anything else I can help you with?";
	}else if(pap_conf==='no'){
		speech="Sorry we do not have other forms of paper with us. would you like to continue?";
	}else{
		speech="Sorry please select from Yes or No";
	}
}
	

if(order_id){

if(order_id==='5075'){
	speech="Your order for a Stapler has been dispatched and is on it's way .Is there something else I can help you with?";
}else if(order_id==='7865')
{
	speech="Your order for a black pens has been dispatched and is on it's way .Is there something else i can help you with? ";
}else if(order_id==='91123')
{
	speech="Your order for a blue pens has been dispatched and is on it's way .Is there something else i can help you with?";
}else if(order_id==='5421')
{
	speech="Your order for a hardbound notebooks has been dispatched and is on it's way .Is there something else i can help you with?";
}else if(order_id==='7114')
{
	speech="Your order for a Spiral notebooks has been dispatched and is on it's way .Is there something else i can help you with?";
}else if(order_id==='8954')
{
	speech="Your order for pack of  A4 Size papers has been dispatched and is on it's way .Is there something else i can help you with?";
}else{
	 speech="Sorry! your order with id"+order_id+" doesnot exist in our records.Is there something else i can help you with?";
	
}}
	

	}
	

	
	return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
});
	
	
	  
	  	 
	  
	  });

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}



restService.listen((process.env.PORT || 5000), function() {
    console.log("Server up and listening");
});
	
	
