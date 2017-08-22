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
	console.log("context parameters"+JSON.stringify(req.body.result.contexts[0].parameters));
    //var type_order=req.body.result.parameters.selection_type;
	//console.log(type_order);
	var new_order=req.body.result.parameters.New_order;
	console. log("order type: "+new_order);
	var status=req.body.result.parameters.Check_Status.;
	console.log("status :"+ status);
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
	var speech="There was some error with the bot. would you still like to proceed?";
	var datetime = addDays(new Date(), 7);
	console.log("Today's date:"+datetime.getDay()+" "+datetime.getDate());
	
	if(action==='new_order'){
	if(new_order){
		console.log("inside type order");
	if(new_order==='Order'){
	 speech="Please choose one of the items from Pen,Paper,Stapler,Notebook";
	 
	 }else{
	   speech="Input is not valid. Please select from place a new order or Check Status. would you like to continue?";
	}
	}
	 
	if(item_order){
			 if(item_order==='Pen'){
	  speech="We have blue and black pens with us which one would you like to place order for?"
	}else if(item_order=='Paper'){
	  speech="We have A4 and A3 size papers with us which one would you like to place order for?";
	}else if(item_order==='notebook'){
	  speech="We have hardbound and Spiral notebook which one would you like to place order for?";
	}else if(item_order==='Stapler'){
	  speech="Your order with id 5075 has been has been created. Is there anything else I can help you with?";
	}else{
		speech="Input is not valid. Please Choose one of the items from Pen,Paper,Stapler,Notebook. would you like to continue?";
	}
	
	}
	 
if(pen_color){
	
	if(pen_color==='black'){
	  speech="Your order with id 7865 has been created. Is there anything else I can help you with?";
	}else if(pen_color==='blue'){
	  speech="Your order with id 91123 has been created. Is there anything else I can help you with?";
	}
	else{
	  speech="Sorry order for "+pen_color +" pen could not be placed as currently it is not available. Would you like to continue?";
	}
}

if(notebooktype){
	
	console.log("inside notebook type");
	
	if(notebooktype==='hardbound'){
	speech="Your order with id 5421 has been created. Is there anything else I can help you with?";
	}else if(notebooktype==='Spiral'){
	speech="Your order with id 7114 has been created. Is there anything else I can help you with?";
	}
	else{
	 speech="Sorry order for "+notebooktype +" notebook could not be placed as currently it is not available. Would you like to continue?";
	}
	
}

if(pap_conf){
	
	if(pap_conf==='A4'){
		speech="Your order with id 8954 has been created. Is there anything else I can help you with?";
	}else if(pap_conf==='A3'){
		speech="Your order with id 1229 has been created. Is there anything else I can help you with?";
	}else{
		speech="Sorry please select from Yes or No";
	}
}
	}
	
	
if(action==='check_status'){
	
	if(status){
 if(status==='Status'){
	 speech="Please enter your Order ID";
	}
	}else{
	   speech="Input is not valid. Please select from place a new order or Check Status. would you like to continue?";
	}

if(order_id){

if(order_id==='5075'){
	speech="Your order for a Stapler has been dispatched and will get delivered to you by " +datetime.getDate()+"-"+datetime.getMonth()+"-"+datetime.getFullYear()+ " Is there something else I can help you with?";
}else if(order_id==='7865')
{
	speech="Your order for a black pens has been dispatched and will get delivered to you by " +datetime.getDate()+"-"+datetime.getMonth()+"-"+datetime.getFullYear()+ " Is there something else I can help you with?";
}else if(order_id==='91123')
{
	speech="Your order for a blue pens has been dispatched and will get delivered to you by " +datetime.getDate()+"-"+datetime.getMonth()+"-"+datetime.getFullYear()+ " Is there something else I can help you with?";
}else if(order_id==='5421')
{
	speech="Your order for a hardbound notebooks has been dispatched and will get delivered to you by " +datetime.getDate()+"-"+datetime.getMonth()+"-"+datetime.getFullYear()+ " Is there something else I can help you with?";
}else if(order_id==='7114')
{
	speech="Your order for a Spiral notebooks has been dispatched and will get delivered to you by " +datetime.getDate()+"-"+datetime.getMonth()+"-"+datetime.getFullYear()+ " Is there something else I can help you with?";
}else if(order_id==='8954')
{
	speech="Your order for pack of  A4 Size papers has been dispatched and will get delivered to you by " +datetime.getDate()+"-"+datetime.getMonth()+"-"+datetime.getFullYear()+ " Is there something else I can help you with?";
}else if(order_id==='1229')
{
	speech="Your order for pack of  A3 Size papers has been dispatched and will get delivered to you by " +datetime.getDate()+"-"+datetime.getMonth()+"-"+datetime.getFullYear()+ " Is there something else I can help you with?";
}else{
	speech="Sorry! your order with id " +order_id+" doesnot exist in our records. Please contact our customer care  1800-255-253. Is there anything else I can help you with?";
}
}

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
	
	
