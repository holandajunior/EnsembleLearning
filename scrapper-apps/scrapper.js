var gplay = require('google-play-scraper');
 
gplay.app({appId: 'com.dxco.pandavszombies'})
  .then(function(app){
    console.log('Retrieved application: ' + app.icon);
  })
  .catch(function(e){
    console.log('There was an error fetching the application!');
  });