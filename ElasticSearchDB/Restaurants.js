//The script is used to store details of some music venues, jazz club, opera and social clubs fetchted from yelp into the Elastice Search DB
'use strict';
var config = require('./config.js');
const yelp = require('yelp-fusion');
var elasticsearch = require('aws-es');
console.log(config.Client_ID);
var zip = [10453,10457,10460,10458,10467,10468,10451,10452,10456,10454,10455,10459,10474,10463,10471,10466,10469,10470,10475,10461,10462,10464,10465,10472,10473,11212,11213,11216,11233,11238,11209,11214,11228,11204,11218,11219,11230,11234,11236,11239,11223,11224,11229,11235,11201,11205,11215,11217,11231,11203,11210,11225,11226,11207,11208,11211,11222,11220,11232,11206,11221,11237,10026,10027,10030,10037,10039,10001,10011,10018,10019,10020,10036,10029,10035,10010,10016,10017,10022,10012,10013,10014,10004,10005,10006,10007,10038,10280,10002,10003,10009,10021,10028,10044,10065,10075,10128,10023,10024,10025,10031,10032,10033,10034,10040,11361,11362,11363,11364,11354,11355,11356,11357,11358,11359,11360,11365,11366,11367,11412,11423,11432,11433,11434,11435,11436,11101,11102,11103,11104,11105,11106,11374,11375,11379,11385,11691,11692,11693,11694,11695,11697,11004,11005,11411,11413,11422,11426,11427,11428,11429,11414,11415,11416,11417,11418,11419,11420,11421,11368,11369,11370,11372,11373,11377,11378,10302,10303,10310,10306,10307,10308,10309,10312,10301,10304,10305,10314];

//AWS Credentials and elastic search host name
var elasticSearch = new elasticsearch({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: config.service,
    region: config.region,
    host: config.host
});

var index = 'yelpf';

var Type = 'restaurants';

var i; //to keep track of the id of the posts being made
//This search operation helps retrieve the id of the latest record
elasticSearch.search({
    index: index,
    type: Type,
    body: {
        query: {
            match_all: {}
        },
        sort: {
            timestamp: "desc"
        },
        size: 1
    }
}, function(err, data) {
    if (data.status == 404) {
        i = 1;
        return;
    }


    if (data.hits.hits[0] == undefined) {
        i = 1;
    } else
        i = parseInt(data.hits.hits[0]._id) + 1;

});

const token = yelp.accessToken(config.Client_ID, config.Client_Secret).then(response => {

	console.log(response.jsonBody.access_token);
	const client = yelp.client(response.jsonBody.access_token);
 for(var k=0;k<zip.length;k++){
	console.log(zip[k]+'running');
	client.search({
	  category_filter:'restaurants',
	  location: zip[k]
	}).then(response => {
	var business = response.jsonBody.businesses.length;
	
	for(var j=0;j<response.jsonBody.businesses.length;j++){
		var name=response.jsonBody.businesses[j].name;
		var img=response.jsonBody.businesses[j].image_url;
		var url=response.jsonBody.businesses[j].url;
		var rating=response.jsonBody.businesses[j].rating;
		var lat=response.jsonBody.businesses[j].coordinates.latitude;
		var lng=response.jsonBody.businesses[j].coordinates.longitude;
		var fullAddress=response.jsonBody.businesses[j].location.display_address;
		var phone= response.jsonBody.businesses[j].display_phone;
		var zip=response.jsonBody.businesses[j].location.zip_code;
		var city=response.jsonBody.businesses[j].location.city;
		var timestamp=Date.now();
		
	    i = i + 1;
	    elasticSearch.index({ //Posting of some restaurant details to elasticSearch	
		index: index,
		type: Type,
		id: String(i),
		body: {
		 name: response.jsonBody.businesses[j].name,
		 img: response.jsonBody.businesses[j].image_url,
		 url: response.jsonBody.businesses[j].url,
		 rating: response.jsonBody.businesses[j].rating,
		 lat: response.jsonBody.businesses[j].coordinates.latitude,
		 lng: response.jsonBody.businesses[j].coordinates.longitude,
		 fullAddress: response.jsonBody.businesses[j].location.display_address,
		 phone: response.jsonBody.businesses[j].display_phone,
		 zip: response.jsonBody.businesses[j].location.zip_code,
		 city: response.jsonBody.businesses[j].location.city,
		 timestamp: timestamp
		}
	    }, function(err, data) {
		console.log(data);
	    });		
		
	}

	}).catch(e => {
	  console.log(e);
	});
	}
}).catch(e => {
  console.log(e);
});




