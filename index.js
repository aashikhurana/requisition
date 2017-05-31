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
	
	var speech="There is an error in the bot service";
	
    var user_request=JSON.stringify(req.body.result.action);
	var order_item=JSON.stringify(req.body.result.parameters.order_items);
	var order_item_1=JSON.stringify(req.body.result.parameters.order_items1);
	var address=req.body.result.parameters.address;
	var order_color=req.body.result.parameters.color;
	
	var item_description="blank";
    var category_name= "blank";
    var source_agreement_number=" ";
    var supplier_item_number=" ";
    var supplier_contact_name="abcd";
    var supplier_name= "OD";
    var supplier_site_name= "OD";
    var price=" ";
	
	
	
	
	if(req.body.result.action == 'place-order'){
		
	if(order_item='pen'){
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
		
		
		
	}
	
	if(order_item=='Stapler'){
		
	console.log("Inside Stapler");
	
	 item_description="Image 1500 Series Desk Accessories, Stapler";
     category_name= "Desk Supplies";
     source_agreement_number="52172";
     supplier_item_number="ELD15681";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="29.95";
		
	}
	
	if(order_item=='Organizer'){
		
	 item_description="Catch All Organizer, Black";
     category_name= "Desk Supplies";
     source_agreement_number="52172";
     supplier_item_number="ELD16265";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="8.99";
		
	}
	
	if(order_item='Binder Books'){
		
		console.log("Inside Binder Books");
		
	 item_description="Recycled Presstex Data Binder with Storage Hooks for 9-1/2 inch x 11 inch Sheet Size";
     category_name= "Notebooks and Binders";
     source_agreement_number="52172";
     supplier_item_number="ACC54113";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="6.45";
		
	}
	
	if(order_item='Laminating sheet'){
		
		console.log("InsideLaminating sheets");
		
	 item_description="Laminating Sheet, 2 mils, Clear, 9 inch x 12 inch";
     category_name= "Office Supplies";
     source_agreement_number="52172";
     supplier_item_number="CLI65001";
     supplier_contact_name="Gasol, Jim";
     supplier_name= "Office Depot";
     supplier_site_name= "OD US1";
     price="21.99";
	}
	
	if(order_item='Planning System'){
		
		console.log("Inside Planning system");
		
	 item_description="Franklin Covey Planning System, Snap Tab, Champion, Page Size 5-1/2 inch x 8-1/2 inch, Black";
     category_name= "Office Supplies";
     source_agreement_number="52176";
     supplier_item_number="AAG56703";
     supplier_contact_name="Jhee, Abe";
     supplier_name= "Staples";
     supplier_site_name= "Staples US1";
     price="65.99";
	}
	
	if(order_item='Paper'){
	
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
  "OrderDetails": {
        "CategoryName": category_name,
        "ItemDescription": item_description,
        "SourceAgreementNumber": source_agreement_number,
        "SupplierItemNumber": supplier_item_number,
        "SupplierContactName": supplier_contact_name,
        "SupplierName": supplier_name,
        "SupplierSiteName": supplier_site_name,
        "Price": price
        }
      }
    }
    speech="Your order for "+order_item+" has been raised. Your Requisition Id is 1234";
	console.log("user request is of format:"+user_request);
	//console.log("parameters are: "+ JSON.stringify(order_item) +" "+JSON.stringify(address));
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
