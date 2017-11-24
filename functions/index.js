const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var geoTools = require('geo-tools');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  apiKey: 'AIzaSyBzXEp6HR01Pau5cotJ2wve1Z7aKEfvkUI'
};

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBzXEp6HR01Pau5cotJ2wve1Z7aKEfvkUI',
  Promise: Promise
});

//var geocoder = NodeGeocoder(options);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.sortDistance = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
    var array = req.query.text.split(':');
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  // Get a database reference to our posts
	var db = admin.database();
	var ref = db.ref("profiles/stylists");
	var promises = [];
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
	  //console.log(snapshot.val());
	  var snap = snapshot.val();
	  for(const user in snap) {
	  	promises.push(new Promise(function(resolve, reject) {
	  		var snapadd = snap[user].address;
		  	console.log(snapadd + " snap user address (((((((())))))))");
		  	if(snapadd != null || typeof snapadd != undefined) {
					googleMapsClient.geocode({
					  address: snapadd
					}).asPromise()
						.then(response => { 
						  console.log(response.json.results[0].geometry.location.lat);
						  

						  console.log("  +++   " + response.json.results[0].geometry.location.lat + ' ' + response.json.results[0].geometry.location.lng + ' ' + array[0] + ' ' + array[1]);

						  
						  var distanceBetween = distance(response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng, array[0], array[1]);
						  console.log(distanceBetween + "      distance between spots");
						  var refList = db.ref("distances/"+array[2]);
						  console.log(snap[user].username + "    snap username");
						  refList.push({ 
						  	username: snap[user].username,
						  	distance: Math.round(distanceBetween * 100) / 100
						  })

						  resolve();
						})
						.catch(err => { console.log(err); reject(err);})
			}
			else {
				resolve();
			}	
		}).catch(err => console.log('error from catch   ' + err)));
	  	//console.log(typeof user + 'type of');
	  	
	  }

	  var p = Promise.all(promises);
	  console.log(JSON.stringify(p) +     "     promises logged");

	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
});

function distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

