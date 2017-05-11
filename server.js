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
  projectId: 'Enter your project ID',
  keyFilename: 'Enter the path of your key file'
};

var datastore = require('@google-cloud/datastore')(config);
var storage = require('@google-cloud/storage')(config);
var kvstore = require('google-cloud-kvstore');
var store = kvstore(datastore);

var index = 'yelpf';

var Type = 'restaurants';
var Type2 = 'events';


app.get('/restaurants/zip/:id', function(req, res) { //To respond with information of related to some retaurants in a particular neighborhood
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
    }
}, function(err, data) {
	console.log(data.hits.hits);
	res.send(data.hits.hits);
 });
});

app.get('/social/zip/:id', function(req, res) {	  //To respond with information of related to some music venues, jazz club, opera and social clubs in a particular neighborhood
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

app.listen(8080);
console.log('Listening on port 8080...');
