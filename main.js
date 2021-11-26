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
	myCard = myWords[idx].split(":");
	return myCard;
}

//Initialize
myWords = fs.readFileSync('./mywords.txt').toString().split('\n');
myWords.pop();
var myWordsLength = myWords.length;
if (debug == 1) console.log('initialization:', myWords, myWordsLength);

app.set("view engine", "ejs");
app.get ("/", function (req,res) {
	myCard = getRandomCard();
	if (debug == 1) console.log('getRandomCard:', myCard);
	res.render("answer.ejs", {quiz: myCard[0], quizExample: myCard[1], translation: myCard[2], sound: myCard[3], example: myCard[4]});	
});

app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on port: ", port);
})
