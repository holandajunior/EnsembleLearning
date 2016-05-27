var gplay = require('google-play-scraper');
var fs = require('fs');

var appSet = new Set();

var lineReader = require('readline').createInterface({
  input: fs.createReadStream('teste')
});

var wStream = fs.createWriteStream("handledApps.csv", { flags : 'w' });


lineReader.on('line', function (line){

  if(line.indexOf("value") > -1){

    var vals = line.split(":");
    var pattern = /[\"\\\[\]]/g;

    var apps = vals[1].replace(pattern, "").split(",");

    console.log("********************");
    console.log(vals[1]);
    console.log(vals[1].replace(pattern, ""));
    console.log(apps);


     apps.forEach(function(collectedApp){
       appSet.add(collectedApp);
     });


  }



  });

  lineReader.on('close', function(){
    console.log("Total of apps: " + appSet.size);
    appSet.forEach(function(collectedApp){

        gplay.app({appId: collectedApp})
         .then(function(app){
           wStream.write(collectedApp + " " +  app.genreId + "\n");
           //console.log(collectedApp + " " +  app.genreId);
         })
         .catch(function(e){
           console.log(collectedApp + ' = There was an error fetching the application!');
         });


    });



  });
