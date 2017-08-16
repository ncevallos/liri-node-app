var Twitter = require('twitter');
var sourceFile = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var command = process.argv[2];


var client = new Twitter({
  consumer_key: 'sourceFile.twitterKeys.consumer_key',
  consumer_secret: 'sourceFile.twitterKeys.consumer_secret',
  access_token_key: 'sourceFile.twitterKeys.access_token_key',
  access_token_secret: 'sourceFile.twitterKeys.access_token_secret'
});
console.log(sourceFile.twitterKeys.consumer_key);
console.log(sourceFile.twitterKeys.consumer_secret);

var spotify = new Spotify({
  id: 'sourceFile.spotifyKeys.id',
  secret: 'sourceFile.spotifyKeys.secret'
});
//change to my-tweets
if(command === "twitter"){

 //GET https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=20
var params = {therealDonaldTrump: 'node.js'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
  console.log(response);
});
}
//change to spotify-this-song
else if(command === "spotify"){
	if(process.argv[3] === undefined){
		var songName = "I Saw The Sign";
	}
	else {
		var songName = process.argv[3];
	}

 
	spotify.search({ type: 'track', query: 'All the Small Things' })
  		.then(function(response) {
   		 	console.log(response);
  		})
  		.catch(function(err) {
  		    console.log(err);
  		});
	}
//change to movie-this
else if(command === "movie"){

		var movieName = "";
	if(process.argv[3] === undefined){
		var movieName = "Mr. Nobody";
	}
	else{
		var movieName = process.argv[3];
	}
	    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
        request(queryURL, function (error, response, body) {
 		  console.log("Title of the Movie is: " + JSON.parse(body).Title);
          console.log("Year released: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbRating); 
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country Produced:  " + JSON.parse(body).Country); 
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot); 
          console.log("Actors: " + JSON.parse(body).Actors);
			});


}
//change to do-what-it-says
else if(command === "do"){

}
else{
	console.log("You entered an invalid command!");
}