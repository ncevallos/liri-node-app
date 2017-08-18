//Below we import all the necessary files and features
var fs = require("fs");
var Twitter = require('twitter');
var sourceFile = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var textFile = 'log.txt';

//below parses any arguments that may have been passed through the command line
var command = process.argv[2];
var command2 = process.argv[3];

//The variables below access the keys contained in keys.js and puts them into local variables
var conkey = sourceFile.twitterKeys.consumer_key;
var consecret = sourceFile.twitterKeys.consumer_secret;
var acckey = sourceFile.twitterKeys.access_token_key;
var accsecret = sourceFile.twitterKeys.access_token_secret;
var spotKeyID = sourceFile.spotifyKeys.id;
var spotKeySecret = sourceFile.spotifyKeys.secret;

//below initializes client for use with the twitter NPM
var client = new Twitter({
  consumer_key: conkey,
  consumer_secret: consecret,
  access_token_key: acckey,
  access_token_secret: accsecret
});

//below initializes spotify for use with the spotify NPM
var spotify = new Spotify({
  id: spotKeyID,
  secret: spotKeySecret
});

//Below is all the code to read and execute the commands. It was placed inside of a function, so that if the do command is run, the information from random.txt can be first read and placed into variables and then runCommand can be re-executed using that information.
function appendCommand(command){
  fs.appendFile(textFile, "\nCommand run: " + command + ", \n", function(err) {

  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we say nothing
  else {
  }

});
}

//The run command function was implemented so to eliminate reoccuring code of appending the command type to log.txt. As far as appending the data that is retrieved by each function, that is still being done in each code condition.
function runCommand(){


if(command === "my-tweets"){
appendCommand(command);

var params = {ncevUCF: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    for(i=0; i<9; i++){
    console.log("Tweet: " + tweets[i].text);
    console.log("Tweeted at: " + tweets[i].created_at);
      fs.appendFile(textFile, "\n Tweet: "+tweets[i].text + "\n Tweeted at: "+ tweets[i].created_at + "\n", function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }

        // If no error is experienced, we say nothing
        else {
        }

      });

    }
  }
});
}


else if(command === "spotify-this-song"){
	if(command2 === undefined){
		var songName = "I Saw The Sign";
	}
	else {
		var songName = command2;
	}

appendCommand(command);
 
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
      console.log("Artist(s): " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name + "\nAlbum: " + data.tracks.items[0].album.name + "\nURL to Play Song: " + data.tracks.items[0].external_urls.spotify);

      fs.appendFile(textFile, "\nArtist(s): " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name + "\nAlbum: " + data.tracks.items[0].album.name + "\nURL to Play Song: " + data.tracks.items[0].external_urls.spotify + "\n", function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }

        // If no error is experienced, we say nothing
        else {
        }

});
});
	}


else if(command === "movie-this"){

appendCommand(command);

		var movieName = "";
	if(command2 === undefined){
		var movieName = "Mr. Nobody";
	}
	else{
		var movieName = command2;
	}
	    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
        request(queryURL, function (error, response, body) {
 		  console.log("\nTitle of the Movie is: " + JSON.parse(body).Title + "\nYear released: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry Produced:  " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors );

      fs.appendFile(textFile, "\nTitle of the Movie is: " + JSON.parse(body).Title + "\nYear released: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry Produced:  " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\n", function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }

        // If no error is experienced, we say nothing
        else {
        }

			});

      });

}


else if(command === "do-what-it-says"){


appendCommand(command);
      fs.readFile("./random.txt", "utf8", function(error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }


      // We split the data in the file into an array at the comma
      var dataArr = data.split(",");

      // We then pass the split data into the command variables and then re-run the runCommand function.
      command = dataArr[0];
      command2 = dataArr[1];
      runCommand();

    });
    }
else{
  //this line will print if there is not a valid command passed into the node command line.
	console.log("You entered an invalid command!");
}
}

//below runs runCommand initially when the file is run.
runCommand();