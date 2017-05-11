//The following code is used to store the analyzed output files from hadoop into the Google cloud datastore for querying purposes
var config = {
  projectId: 'Enter the project ID',
  keyFilename: 'Enter the path of your key file'
};

var lineread = require('readline').createInterface({
  input: require('fs').createReadStream('Enter Your CSV filename')
});

var datastore = require('@google-cloud/datastore')(config);
var storage = require('@google-cloud/storage')(config);
var kvstore = require('google-cloud-kvstore');
var store = kvstore(datastore);

var i=0;
lineread.on('line', function (line) {
  line=line.split('\t');
  key=line[0];
  value=line[1].split('||');
  if(value[9] != "" && value[10] != ""){
  if(isNaN(key)!=true){
  	if(key.toString().length == 5){
  		console.log(key);
		console.log(value[0]);
   		var arr = new Array();
		var l=value.length;
		if(l > 25)
		{
			for(var p=0;p<=25;p++){ arr.push(value[p]);}
			arr.push(value[l-1]);
			console.log(arr);
			store.set(key, arr, function(err, key) {console.log(key);});
		}
		else
		{
			console.log(value);
			store.set(key, value, function(err, key) {console.log(key);});
		}
		
	}
  
  }}
});
