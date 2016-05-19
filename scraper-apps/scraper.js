var gplay = require('google-play-scraper');

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('teste')
});

lineReader.on('line', function (line) {
  if(line != '}' && line != '{'){
    var vals = line.split(" : ");

    var pattern = /[\"\\\[\]]/g;

    var apps = vals[1].replace(pattern, "").split(",");

    console.log("********************");
    console.log(vals[1]);
    console.log(vals[1].replace(pattern, ""));
    console.log(apps);

    apps.map(function(app){
      gplay.app({appId: app})
        .then(function(app){
          console.log('Retrieved application: ' + app.icon);
        })
        .catch(function(e){
          console.log('There was an error fetching the application!');
        });

    });

  }
});
