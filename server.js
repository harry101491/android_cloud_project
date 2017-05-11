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

app.get('/rating/zip/:id', function(req, res) {
	store.get(req.params.id, function(err, data) {
	var val = data;
	var rate = val[val.length-1];
	//console.log(rate);
	if(rate >= 71 && rate <=100){
		var text = "It looks like the law and order is very strict in this area. Almost all the complaints that were made to the police has been taken care of. We can assume that the neighborhood is a good neighborhood";
		var PeaceLevel= "High";
		console.log({ "PeaceLevel":PeaceLevel, "text":text });
		res.send({"PeaceLevel":PeaceLevel, "text":text });
	}
	else if(rate >= 31 && rate <=70){
		var text = "It looks like the law and order is average in this area. There are still a lot of complaints that are yet to be taken care of, by the police. We can assume that the people are slightly overwhelmed by the crimes. This is what an average neighborhood looks like. People are happy with their own near and dear ones with little interaction with the outside world. And they are also very much socially aware of their surroundings to avoid harmful situations";
		var PeaceLevel= "Medium";
		res.send({"PeaceLevel":PeaceLevel, "text":text });
	}
	else if(rate >= 0 && rate <=30){
		var text = "It looks like the law and order is not very strict in this area. Almost all the complaints that were made to the police are open. The police is overwhelmed by the amount of complaints related to crime and social life. Safety is a major concern in these areas. And by this time, people have recognized that it is their responsibility to take care of themselves. Being Self independent and highly alert is a requirement to survive here. We can assume that the neighborhood is a very bad one.";
		var PeaceLevel= "Low";
		res.send({"PeaceLevel":PeaceLevel, "text":text });
	}
    });
});


app.listen(3000);
console.log('Listening on port 3000...');
