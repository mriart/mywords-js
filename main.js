var express = require('express');
var app = express();
var port = 8080;
var fs = require('fs');
var myWords = [];
var myCard = [];
var debug = 1;

//Return random card of mywords.txt, that is a line in array format
function getRandomCard() {
	var idx = Math.floor(Math.random() * myWordsLength);
	if (debug == 1) console.log('idx: ', idx);
	myCard = myWords[idx].split(":");
	return myCard;
}

//Initialize
myWords = fs.readFileSync('./mywords.txt').toString().split('\n');
myWords.pop(); //Removes last empty line
var myWordsLength = myWords.length;
if (debug == 1) console.log('initialization myWords, myWordsLength:', myWords, myWordsLength);

app.set("view engine", "ejs");
app.get ("/", function (req,res) {
	myCard = getRandomCard();
	if (debug == 1) console.log('getRandomCard:', myCard);
	res.render("index.ejs", {lit0: myCard[0], lit1: myCard[1], lit2: myCard[2], lit3: myCard[3], lit4: myCard[4]});	
});

app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on port: ", port);
})
