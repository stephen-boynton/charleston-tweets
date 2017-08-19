const TwitterPackage = require("twitter");
const config = require("./config");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const secret = {
	consumer_key: config.conkey,
	consumer_secret: config.consec,
	access_token_key: config.acckey,
	access_token_secret: config.accsec
};
var Twitter = new TwitterPackage(secret);

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
	console.log("a user connected");
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
});

io.on("connection", function(socket) {
	Twitter.stream(
		"statuses/filter",
		{ locations: "-80.179596,32.660025,-79.823227,33.042468" },
		function(stream) {
			stream.on("data", function(tweet) {
				console.log(tweet);
				io.emit("tweet", tweet);
			});

			stream.on("error", function(error) {
				console.log(error);
			});
		}
	);
});

app.set("port", 3000);

http.listen(app.get("port"), () => {
	console.log("Your app has started, sir.");
});
