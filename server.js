var express = require('express');
var elasticsearch = require('aws-es');
var app = express();
var config = require('./config.js');

var elasticSearch = new elasticsearch({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: config.service,
    region: config.region,
    host: config.host
});

var config = {
  projectId: 'finalproj-167105',
  keyFilename: 'finalProj-3d8fb5b0c6f8.json'
};

var datastore = require('@google-cloud/datastore')(config);
var storage = require('@google-cloud/storage')(config);
var kvstore = require('google-cloud-kvstore');
var store = kvstore(datastore);

var index = 'yelpf';

var Type = 'restaurants';
var Type2 = 'events';


app.get('/restaurants/zip/:id', function(req, res) {
    elasticSearch.search({
    index: index,
    type: Type,
    body: {
        query: {
            match: {zip : req.params.id}
        },
        sort: {
            rating: "desc"
        },
        //size: 1
    }
}, function(err, data) {
	console.log(data.hits.hits);
	res.send(data.hits.hits);
 });
});

app.get('/social/zip/:id', function(req, res) {
    elasticSearch.search({
    index: index,
    type: Type2,
    body: {
        query: {
            match: {zip : req.params.id}
        },
        sort: {
            rating: "desc"
        },
        //size: 1
    }
}, function(err, data) {

	console.log(data.hits.hits);
	res.send(data.hits.hits);
 });
});

app.get('/complaints/zip/:id', function(req, res) {
    store.get(req.params.id, function(err, data) {
	console.log(data);
	res.send(data);
    });
});

app.listen(3000);
console.log('Listening on port 3000...');
