// Flash cards for learning english
// MRS, 202111

var express = require('express');
var app = express();
var port = 8080;
var fs = require('fs');
var file = [];
var myWords = [];
var myCard = [];
var idx;
var debug = 0;

//Return sequential card of mywords.txt
function getSeqCard() {
	idx++;
	if (idx == myWords.length) idx = 0;
	if (debug == 1) console.log('idx: ', idx);
	myCard = myWords[idx].split(";");
	return myCard;
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
  
//Insufle probabilities to array. The first 33% is normal, up to 66% double probabilities, the rest the triple.
//That is because I want the latest entries in mywords.txt, appears more times in the quiz.
function prob(array) {
	var j = 0;
	var arrayOut = [];
	for (i=0; i<Math.floor(array.length/3); i++) {
		arrayOut[j] = array[i];
		j++;
	}
	for (i=Math.floor(array.length/3); i<Math.floor(array.length/3)*2; i++) {
		arrayOut[j] = array[i]; 
		j++;
		arrayOut[j] = array[i];
		j++;
	}
	for (i=Math.floor(array.length/3)*2; i<array.length; i++) {
		arrayOut[j] = array[i]; 
		j++;
		arrayOut[j] = array[i];
		j++;
		arrayOut[j] = array[i];
		j++;
	}
	return arrayOut;
}

//Initialize
file = fs.readFileSync('./mywords.txt').toString().split('\n');
file.pop(); //Removes last empty line
if (debug == 1) console.log('Load of mywords.txt, file:', file);
myWords = shuffle(prob(file)); 
if (debug == 1) console.log("myWords: ", myWords);
idx = -1;


//Express, for http requests
app.set("view engine", "ejs");

app.get ("/", function (req,res) {
	myCard = getSeqCard();
	if (debug == 1) console.log('getSeqCard:', myCard);

	res.render("index.ejs", {lit0: myCard[0], lit1: myCard[1], lit2: myCard[2], lit3: myCard[3], lit4: myCard[4]});	
});

app.get ("/favicon.png", function (req,res) {
	res.sendFile(__dirname + "/favicon.png");
});

app.get ("/iconplus.png", function (req,res) {
	res.sendFile(__dirname + "/iconplus.png");
});

app.get ("/postword.html", function (req,res) {
	res.render("postword.ejs");	
});

//Start server
app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on port: ", port);
})
