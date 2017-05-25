use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech ="Seems like some problem. Speak again.";
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'requisitionbot'
    });
});





restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});



