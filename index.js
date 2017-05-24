'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.get('/place-order', function(req, res) {
    var speech = "Your Requisition is created with id 123451234 and purchase id is 1234"
    return res.json{
                speech:speech,
                displayText:speech,
                data:{
                    google:{
                        expect_user_response: false,
                        final_response: {
                            speech_response: {
                            text_to_speech: data.message
                            }
                        }
                    }
                },
                contextOut:[],
                source:"requisitionbot"
            };
});



restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
