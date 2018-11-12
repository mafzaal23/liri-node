//various required packages and keys
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require('file-system');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//stylistic var
var demDashes = "---------------------------"
var fsNewLine = "\n"

//input arguments
var command = process.argv[2];
var input = process.argv;

//taking movie or song title arguments
var title = "";
for (var i=3; i<input.length; i++) {
  if (i>3 && i<input.length) {
    title = title + "+" + input[i];
  } else {
    title = title + input[i];
  }
}

//switch cases for command
switch(command) {

  case "my-tweets":
    fs.appendFile('log.txt', demDashes + "\n", (err) => {
      if (err) throw err;
    });
    fs.appendFile('log.txt', "Command: " + command + "\n", (err) => {
      if (err) throw err;
    });
    fs.appendFile('log.txt', demDashes + "\n", (err) => {
      if (err) throw err;
    });
    tweetTweet()
  break;

  case "spotify-this-song":
    if(title){
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Command: " + command + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Search Term: " + title + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      tunesMan(title)
    } else{
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Command: " + command + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Search Term: Ace of Base by Default" + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      tunesMan("The Sign ace of base")
    }
  break;

  case "movie-this":
    if(title){
      movieTime(title)
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Command: " + command + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Search Term: " + title + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
    } else{
      movieTime("Mr. Nobody")
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Command: " + command + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', "Search Term: Mr. Nobody by default" + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
    }
  break;

  case "do-what-it-says":
    doIttt()
  break;

  default:
    console.log("Enter a Command: my-tweets | spotify-this-son | movie-this | do-what-it-says")
  break;
}

//display 20 most recent tweets
function tweetTweet() {
  var tweetHandle = {screen_name: "FullStackJoe"};
  client.get("statuses/user_timeline", tweetHandle, function(error, tweets, response){
    if (!error) {
      for (var i=0; i<tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log("@FullStackJoe: " + tweets[i].text + "  | Created At: " + date.substring(0, 19));
        console.log(demDashes)
        fs.appendFile('log.txt', demDashes + "\n", (err) => {
          if (err) throw err;
        });
        fs.appendFile("log.txt", "@FullStackJoe: " + tweets[i].text + "  | Created At: " + date.substring(0, 19) + "\n", (err) => {
          if (err) throw err;
        });
        fs.appendFile('log.txt', demDashes + "\n", (err) => {
          if (err) throw err;
        });
      }
    } else {
      console.log("Twitter Error Occurred")
    }
  })
}

function tunesMan(title) {
  spotify.search({ type:"track", query:title}, function(error, data) {
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++)
      var spotifyPath = data.tracks.items[i];
      console.log(demDashes)
      console.log("Artist: " + spotifyPath.artists[0].name)
      console.log("Song: " + spotifyPath.name)
      console.log("Preview URL: " + spotifyPath.preview_url)
      console.log("Album: " + spotifyPath.album.name)
      console.log(demDashes)
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Artist: " + spotifyPath.artists[0].name + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Song: " + spotifyPath.name + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Preview Url: " + spotifyPath.preview_url + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Album: " + spotifyPath.album.name + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", demDashes + "\n", (err) => {
        if (err) throw err;
      });
    } else {
      console.log("Spotify Error Occurred")
    }
  })
}

function movieTime(title) {
  var movieQueryUrl = "http://omdbapi.com/?apikey=trilogy&t=" + title + "&plot=short&tomatoes=true";
  request (movieQueryUrl, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      var body = JSON.parse(body);
      console.log(demDashes)
      console.log("Title: " + body.Title)
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log(demDashes)
      fs.appendFile('log.txt', demDashes + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Title: " + body.Title + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Release Year: " + body.Year + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "IMdB Rating: " + body.imdbRating + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + body.tomatoRating + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Country: " + body.Country + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Language: " + body.Language + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Plot: " + body.Plot + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", "Actors: " + body.Actors + "\n", (err) => {
        if (err) throw err;
      });
      fs.appendFile("log.txt", demDashes + "\n", (err) => {
        if (err) throw err;
      });
    } else {
      console.log("OMDB Error Occurred")
    }
    if (title === "Mr. Nobody") {
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
      console.log(demDashes)
    }
  })
}

function doIttt(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');
    tunesMan(txt[1]);
  });
}