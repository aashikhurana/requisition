'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.get('/place-order', function(req, res) {
    var user_speech = "Your Requisition is created with id 123451234 and purchase id is 1234"
    return res.json{
                speech:user_speech,
                displayText:user_speech,
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


restService.listen((process.env.PORT || 5000), function() {
    console.log("Server up and listening");
});



