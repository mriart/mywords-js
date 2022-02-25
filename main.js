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
//Also, start with last 5 introduced words, as a kind of study.
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
	
	arrayOut = shuffle(arrayOut);
	arrayOut.unshift(array[arrLen-1], array[arrLen-2], array[arrLen-3], array[arrLen-4], array[arrLen-5]);
	return arrayOut;
}

//Initialize
file = fs.readFileSync('./mywords.txt').toString().split('\n');
file.pop(); //Removes last empty line
if (debug == 1) console.log('Load of mywords.txt, file:', file);

myWords = prob(file); 
if (debug == 1) console.log("myWords: ", myWords);
idx = -1;


//Express, for http requests
app.set("view engine", "ejs");     //Use EJS views   
app.use(express.static('public')); //Send static files like png's
app.use(express.json());           //For POST recovery params
app.use(express.urlencoded({ extended: true }));

app.get ("/", function (req,res) {
	myCard = getSeqCard();
	if (debug == 1) console.log('getSeqCard:', myCard);

	res.render("index.ejs", {lit0: myCard[0], lit1: myCard[1], lit2: myCard[2], lit3: myCard[3], lit4: myCard[4]});	
});

app.get ("/postword", function (req,res) {
	res.render("postword.ejs");	
});

/* Postword into Cloudant
app.post ("/postword", function (req,res) {
	const { CloudantV1 } = require('@ibm-cloud/cloudant');
	const { IamAuthenticator } = require('ibm-cloud-sdk-core');
	const authenticator = new IamAuthenticator({
		apikey: 'see Cloudant-7b at IBM Cloud'
	});
	const service = new CloudantV1({
		authenticator: authenticator
	});
	service.setServiceUrl('https://0634c5f6-50c4-47aa-81a6-f5a4dcce30ed-bluemix.cloudantnosqldb.appdomain.cloud');
	if (debug == 1) console.log('Service Cloudant', service);
	
	const wordDoc = {
	  "cat": req.body.cat,
	  "exemple": req.body.cat.exemple,
	  "eng": req.body.eng,
	  "pron": req.body.pron,
	  "example": req.body.example
	};
		
	service.postDocument({
		db: 'mywords',
		document: wordDoc
	}).then(response => {
		console.log("\nPostDoc:");
		console.log(response.result);
	});

	res.redirect('/');
});
*/

//Postword sending an email to mriart@gmail.com from mriart@mywords.io
app.post ("/postword", function (req,res) {
	var sendmail = require('sendmail')({silent: true})
	sendmail({from: 'mriart@mywords.io', to: 'mriart@gmail.com', subject: "New word: " + req.body.cat + " / " + req.body.eng}, function (err, reply) {
  			console.log(err && err.stack)
  			console.dir(reply)
	});
	res.redirect('/');	
});


//Start server
app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on port: ", port);
})
