var gplay = require('google-play-scraper');
var fs = require('fs');

var lineReader = require('readline').createInterface({
  input: fs.createReadStream('teste')
});

var wStream = fs.createWriteStream("handledApps.csv", { flags : 'w' });

lineReader.on('line', function (line){
  if(line != '}' && line != '{'){
    var vals = line.split(" : ");

    var pattern = /[\"\\\[\]]/g;

    var apps = vals[1].replace(pattern, "").split(",");

    console.log("********************");
    console.log(vals[1]);
    console.log(vals[1].replace(pattern, ""));
    console.log(apps);

     apps.map(function(collectedApp){

         gplay.app({appId: collectedApp})
          .then(function(app){
            wStream.write(collectedApp + " " +  app.genreId + "\n");
          })
          .catch(function(e){
            console.log('There was an error fetching the application!');
          });


     });


  }



});
