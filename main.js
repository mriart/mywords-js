var express = require('express');
var app = express();
var path = require('path');
var PORT = 8080;

// Without middleware
app.get('/', function(req, res){
	var options = {
		root: path.join(__dirname)
	};
	
	var fileName = 'answer.html';
	res.sendFile(fileName, options, function (err) {
		if (err) {
			next(err);
		} else {
			console.log('Sent:', fileName);
		}
	});
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
