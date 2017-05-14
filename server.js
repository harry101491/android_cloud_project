var path = require("path");
var express = require('express');
var elasticsearch = require('aws-es');
var app = express();
var config = require('./config.js');
var cities = require('cities');


var elasticSearch = new elasticsearch({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: config.service,
    region: config.region,
    host: config.host
});
var body_parser = require('body-parser');

app.use(body_parser.urlencoded({
    extended: true
}));

app.use(body_parser.json());
app.set('view engine','ejs');

var config = {
  projectId: 'Enter the project id of your google platform',
  keyFilename: 'Enter the path of your key file'
};

var datastore = require('@google-cloud/datastore')(config);
var storage = require('@google-cloud/storage')(config);
var kvstore = require('google-cloud-kvstore');
var store = kvstore(datastore);

var index = 'nyc311data';


var Type = 'data_new';
var Type2 = 'events';

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//To render the html containing the designs
app.get('/count_file:match_text?', function(req, res) {
	var text = req.param('match_text');
	text1=text.split(',');
	lat = text1[0];
	lon = text1[1]; 
	console.log(lat+','+lon);
	res.render('total_bar');
	
});

//For fetching neighborhood locations for the google map
app.get('/gmap/zip/:lat/:lon', function(req, res) {
    elasticSearch.search({
    index: index,
    type: Type,
    body: {
        query: {
             "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_distance" : {
                    "distance" : "3.21869km",
                    "loc" : {
                        "lat" : req.params.lat,
                        "lon" : req.params.lon
                    }
                }
            }
        }
    }
        }

        //size: 1
}, function(err, data) {
	if(err){console.log(err);}
	else{
		console.log(data.hits.hits);
		res.send(data.hits.hits);
	}
 });
});

//To fetch nearby restaurant data
app.get('/restaurants/zip/:lat/:lon', function(req, res) {
    elasticSearch.search({
    index: 'yelpf',
    type: 'restaurants',
    body: {
        query: {
            match: {zip : cities.gps_lookup(req.params.lat, req.params.lon).zipcode}
        },
        sort: {
            rating: "desc"
        },
        //size: 1
    }
}, function(err, data) {
	if(err){console.log(err);}
	else{
		console.log(data.hits.hits);
		res.send(data.hits.hits);
	}
 });
});

//To fetch data related to music clubs, music venues, opera, jazz and blue
app.get('/social/zip/:lat/:lon', function(req, res) {
    elasticSearch.search({
    index: 'yelpf',
    type: Type2,
    body: {
        query: {
            match: {zip : cities.gps_lookup(req.params.lat, req.params.lon).zipcode}
        },
        sort: {
            rating: "desc"
        },
        //size: 1
    }
}, function(err, data) {
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log(data.hits.hits);
		res.send(data.hits.hits);
	}
 });
});

//to return the total count of different complaints in the neighborhood
app.get('/count/zip/:lat/:lon', function(req, res) {
    elasticSearch.search({
    index: 'neighborstats',
    type: 'datastatscoor',
    body: {
        query: {
            match: {lat : req.params.lat},match: {lon : req.params.lon}
        }
        //size: 1
    }
}, function(err, data) {
	if(err)
	{
		console.log(err);
		
	}
	else
	{
		//console.log(data.hits.hits);
		var arr=data.hits.hits;
		var store=[];
		for (var i=0; i<arr.length;i++)
		{
			var temp={"year":arr[i]._source.year, "total":arr[i]._source.total, "noise":arr[i]._source.noise,"rodent":arr[i]._source.rodent,"other":arr[i]._source.other};
			store.push(temp);
		}
		res.send(store);
		
	}
 });
});

//To return the complaints in the surrounding neighborhood
app.get('/complaints/zip/:lat/:lon', function(req, res) {
    store.get(cities.gps_lookup(req.params.lat, req.params.lon).zipcode, function(err, data) {
	if(err){console.log(err);}
	else{	
		console.log(data);
		res.send(data);
	}
    });
});

// To return the rating
app.get('/rating/zip/:lat/:lon', function(req, res) {
	store.get(cities.gps_lookup(req.params.lat, req.params.lon).zipcode, function(err, data) {
	if(err){console.log(err);}
	else{
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
	}
    });
  
});



app.listen(3000);
console.log('Listening on port 3000...');
