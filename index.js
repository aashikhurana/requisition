'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var restService = express();
var http = require('http');
var request_1 = require('request');

var qs = require('querystring');

//restService.use(bodyParser.urlencoded({
    //extended: true
//}));

//restService.use(bodyParser.json());
var json_body_parser = bodyParser.json();

var speech="There is an error in the bot service";

restService.post('/echo', json_body_parser, function(req, res) {
	console.log("Inside Web service call");
	
	
	console.log(JSON.stringify(req.body.result));
    var user_request=req.body.result.action;
	var user_response=req.body.result.yes_no;
	var order_item=req.body.result.parameters.order_items;
	var order_item_1=req.body.result.parameters.order_items1;
	var address=req.body.result.parameters.order-address;
	var order_color=req.body.result.parameters.color;
	
	var item_description="blank";
    var category_name= "blank";
    var source_agreement_number=" ";
    var supplier_item_number=" ";
    var supplier_contact_name="abcd";
    var supplier_name= "OD";
    var supplier_site_name= "OD";
    var price=" ";
	
	var requisition_id="0000";
	
	var postheaders = {
    'Content-Type' : 'application/json'
};
	
	
	if(user_request == 'place_order'){
		
		console.log("user requested"+user_request);
		
	if(order_item=='PEN'){
		console.log("Inside pen")
		
		    category_name= "Pens and Pencils";
            source_agreement_number="52172";
		    supplier_contact_name="Gasol, Jim";
            supplier_name= "Office Depot";
            supplier_site_name= "OD US1";
            price="3.60";
			
		if(order_color=='black'){
			console.log("Inside black")
            item_description="Round Stic Ball Point Pen, Fine, Black";
            supplier_item_number="BIC20131";
            
		}else{
			
			item_description="Round Stic Ball Point Pen, Fine, Blue";
            supplier_item_number="BIC20130";
            }
				
		
	}else if(order_item=='Stapler'){
		
	console.log("Inside Stapler");
	
	 item_description="Image 1500 Series Desk Accessories, Stapler";
     category_name= "Desk Supplies";
     source_agreement_number="52172";
     supplier_item_number="ELD15681";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="29.95";
		
	}else if(order_item=='Organizer'){
		
	 item_description="Catch All Organizer, Black";
     category_name= "Desk Supplies";
     source_agreement_number="52172";
     supplier_item_number="ELD16265";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="8.99";
		
	}else if(order_item=='Binder Books'){
		
		console.log("Inside Binder Books");
		
	 item_description="Recycled Presstex Data Binder with Storage Hooks for 9-1/2 inch x 11 inch Sheet Size";
     category_name= "Notebooks and Binders";
     source_agreement_number="52172";
     supplier_item_number="ACC54113";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="6.45";
		
	}else if(order_item=='Laminating sheet'){
		
		console.log("InsideLaminating sheets");
		
	 item_description="Laminating Sheet, 2 mils, Clear, 9 inch x 12 inch";
     category_name= "Office Supplies";
     source_agreement_number="52172";
     supplier_item_number="CLI65001";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="21.99";
	}else if(order_item=='Planning System'){
		
		console.log("Inside Planning system");
		
	 item_description="Franklin Covey Planning System, Snap Tab, Champion, Page Size 5-1/2 inch x 8-1/2 inch, Black";
     category_name= "Office Supplies";
     source_agreement_number="52176";
     supplier_item_number="AAG56703";
     supplier_contact_name="Jhee, Abe";
     supplier_name= "Staples";
     supplier_site_name= "Staples US1";
     price="65.99";
	}else if(order_item=='Paper'){
	
	  console.log("Inside Paper");
	  item_description="Photocopy Paper Letter Light Blue";
     category_name= "Copy Paper";
     source_agreement_number="52172";
     supplier_item_number="SI-18";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="7.99";
	}
	
	
	var request_payload={
        "CategoryName": category_name,
        "ItemDescription": item_description,
        "SourceAgreementNumber": source_agreement_number,
        "SupplierItemNumber": supplier_item_number,
        "SupplierContactName": supplier_contact_name,
        "SupplierName": supplier_name,
        "SupplierSiteName": supplier_site_name,
        "Price": price
        };
		
	  console.log("Request Payload is: "+JSON.stringify(request_payload));
	  
	  
var options ={
  host: "10.178.22.222",
  port: 7101,
  path: '/requisition-context-root/resources/procws/requisitionBot?order='+qs.stringify(request_payload),
  method: 'POST',
  headers : postheaders
};

console.log('Options prepared:');
console.log(options);
console.log('Do the POST call');
 
// do the POST call
var reqPost = http.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
	if(res.statusCode==200){
	console.log("headers: ", res.headers);
	res.on('data', function(d) {
        console.info('POST result:\n');
        console.log("Requisition ID:  "+d.REQUISITIONID);
		requisition_id=d.REQUISITIONID;
        console.info('\n\nPOST completed');
    });
	
	}
    // uncomment it for header details
//  
 });
 
// write the json data
//reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});
 speech="Thank you for using Requisition Bot!Your request for "+order_item+" has been raised with ID as "+requisition_id;
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
