var express = require('express');
var app = express();
var port = 8080;

app.set("view engine", "ejs");
app.get ("/", function (req,res) {
	res.render("answer.ejs", {quiz: "gosar", quizExample: "Com goses dir això", translation: "dare", sound: "dee", example: "How do you dare?"});	
});

app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on port: ", port);
})