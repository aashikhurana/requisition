'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var restService = express();
var http = require('http');

var qs = require('querystring');

var soap=require('soap');

var parsestring=require('xml2js').parseString;
var url = 'https://ucf6-fap1297-prc.oracledemos.com/prcPoEditDocumentPurchaseRequest/PurchaseRequestService?WSDL';

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
	
	var item_description="blank";
    var category_name= "blank";
    var source_agreement_number=" ";
    var supplier_item_number=" ";
    var supplier_contact_name="abcd";
    var supplier_name= "OD";
    var supplier_site_name= "OD";
    var price=" ";
	var speech="";
	
	var requisition_id=" ";
	
	
	
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
	
	var  OrderRequestElement =   {
	"createRequisition": {
        "interfaceSourceCode": "UK_F2F_Bot",
        "requisitioningBUName": "US1 Business Unit",
        "groupBy": "NONE",
        "maximumBatchSize": "2500",
        "errorProcessingLevel": "ALL",
        "purchaseRequestPayload": {
          "Description": "Ladder with Right Handrail",
          "ApproverEmail": "fap1966-casey.brown@oracleads.com",
          "DocumentStatusCode": "APPROVED",
          "PreparerEmail": "fap1966-calvin.roth@oracleads.com",
          "RequisitioningBUName": "US1 Business Unit",
          "ExternallyManagedFlag": "FALSE",
          "PurchaseRequestInputReqLineInterface": {
            "CategoryName": category_name,
            "CurrencyCode": "USD",
            "DeliverToLocationCode": "Seattle",
            "DeliverToOrganizationCode": "001",
            "DestinationTypeCode": "EXPENSE",
            "ItemDescription": item_description,
            "LineType": "Goods",
            "ProcurementBUName": "US1 Business Unit",
            "Quantity": "1",
            "SourceAgreementNumber": source_agreement_number,
            "SupplierItemNumber": supplier_item_number,
            "SupplierContactName": supplier_contact_name,
            "SupplierName": supplier_name,
            "SupplierSiteName": supplier_site_name,
            "RequestedDeliveryDate": "2017-06-02",
            "Price": {
              "-currencyCode": "USD",
              "#text": price
            },
            "UnitOfMeasure": "Ea",
            "PurchaseRequestInputReqDistInterface": {
              "ChargeAccountId": "300000047301445",
              "Percent": "100"
            }
          }
        }
      }
	};
	
  console.log("Request Payload is: "+JSON.stringify(OrderRequestElement));
	  
 
console.info('Do the SOAP call');

soap.createClient(url, function(err, client){
   
   
   console.log("Setting security");
   client.setSecurity(new soap.BasicAuthSecurity('calvin.roth', 'wxI69587'));
  // The Client now has all the methods of the WSDL. Use it to create a new order by feeding it the JSON Payload
  console.log('Calling Webservice');
  client.createRequisition(OrderRequestElement, function(err, result, body) {
   parseString(body, function(err, result){
    // Get The Result From The Soap API and Parse it to JSON
    var requestResult = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0].createRequisitionResponse[0].return[0];
    console.log(requestResult);
	speech="Your request for"+order_item+"has been raised. Thank you for using Requisition Bot. Have a nice day!";
  });
 
});
client.on('soapError', function(err) {
    console.log("Error is caused due to"+err.message);
	speech="There is an error in bot service";
  });

});


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
	
	
