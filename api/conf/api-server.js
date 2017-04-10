var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require ('cors'),
    path = require('path'),
    app = express();

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.get('/api', function(req, res){
    // var authorTemplate = require('../js/AuthorTemplateBuilder');
    var PaperGerberaTemplateBuilder = require('../../backup/PaperGerberaTutorialImages/PaperGerberaTemplateBuilder.js');

    var authorTemplate = new PaperGerberaTemplateBuilder();

    res.send(authorTemplate.get(req.query));
    // res.json(authorTemplate.get(req.query));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});