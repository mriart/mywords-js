// Flash cards for learning english
// MRS, 202111

var express = require('express');
var app = express();
var port = 8080;
var fs = require('fs');
var myWords = [];
var myWordsRandom = [];
var myCard = [];
var idx;
var debug = 0;

//Return random card of mywords.txt, that is a line in array format
function getRandomCard() {
	var idx = Math.floor(Math.random() * myWordsLength);
	if (debug == 1) console.log('idx: ', idx);
	myCard = myWords[idx].split(":");
	return myCard;
}

//Return sequential card of mywords.txt
function getSeqCard() {
	idx++;
	if (idx == myWordsLength) idx = 0;
	return myWordsRandom[idx];
}

//Randomize an array
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle...
	while (currentIndex != 0) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	return array;
  }
  

//Initialize
myWords = fs.readFileSync('./mywords.txt').toString().split('\n');
myWords.pop(); //Removes last empty line
var myWordsLength = myWords.length;
if (debug == 1) console.log('initialization myWords, myWordsLength:', myWords, myWordsLength);
var myWordsRandom = shuffle(myWords);
if (debug == 1) console.log("myWordsRandom: ", myWordsRandom);
idx = -1;

app.set("view engine", "ejs");
app.get ("/", function (req,res) {
	myCard = getSeqCard();
	if (debug == 1) console.log('getSeqCard:', myCard);

	res.render("index.ejs", {lit0: myCard[0], lit1: myCard[1], lit2: myCard[2], lit3: myCard[3], lit4: myCard[4]});	
});

app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on port: ", port);
})
