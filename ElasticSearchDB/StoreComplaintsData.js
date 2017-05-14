//Store the NYC311 data into ElasticSearch for querying purposes
var elasticsearch = require('aws-es');
var lineread = require('readline').createInterface({
  input: require('fs').createReadStream('data.csv')
});

var elasticSearch = new elasticsearch({
    accessKeyId: 'Enter the ID',
    secretAccessKey: 'Enter the Key',
    service: 'es',
    region: 'us-west-2',
    host: 'Enter the host name'
});
var index = 'nyc311data';

var Type = 'data_new';

var i;


lineread.on('line', function (line) {
	line=line.split(',');
	//console.log(line.length);
	if(line.length == 54 && line[50]!='' && line[51]!='' && line[16]!=''){

	    elasticSearch.index({ //Posting of the details to elasticSearch	
		index: index,
		type: Type,
		id: line[0],
		body: {
			date : line[1],
			agency : line[3],
			agencyName : line[4],
			complaintType : line[5],
			descriptor : line[6],
			locationType : line[7],
			zip : line[8],
			address : line[9],
			street : line[10],
			city : line[16],
			status : line[19],
			due : line[20],
			loc : {lat: line[50], lon: line[51]}

		}
	    }, function(err, data) {
		console.log(data);
		
	    });		
	}
	
	

});
