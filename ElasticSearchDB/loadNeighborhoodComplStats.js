//Storing the output of Hadoop MapReduce that segregates the neighbourhood locations based on year and count of differentcomplaints, into ElasticSearchDB
var elasticsearch = require('aws-es');
var lineread = require('readline').createInterface({
  input: require('fs').createReadStream('NeighborLatLong.csv')
});

var elasticSearch = new elasticsearch({
    accessKeyId: 'Enter the ID',
    secretAccessKey: 'Enter the Key',
    service: 'es',
    region: 'us-west-2',
    host: 'Enter the host name'
});
var index = 'neighborstats';

var Type = 'datastatscoor';

var i = 0;

lineread.on('line', function (line) {
	line=line.split('\t');
	key=line[0].split(',');
	value=line[1].split(',');
	console.log(key);
	console.log(value);
	    i = i + 1;
	    elasticSearch.index({ //Posting details to elasticSearch	
		index: index,
		type: Type,
		id: String(i),
		body: {
			year : key[0],
			lat : key[1],
			lon : key[2],
			total : value[0],
			noise : value[1],
			rodent : value[2],
			other : value[3]

		}
	    }, function(err, data) {
		console.log(data);
		i = i + 1;
	    });		
	
	

});
