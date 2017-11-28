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

var date = new Date()
var sortDate = date.getTime() / 1000;

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

exports.updateAvailabilities = functions.database.ref('/appointments/{username}/' + date.getMonth())
    .onUpdate(event => {
      var dateInner = new Date();
      var db = admin.database();
	  var ref = db.ref("today");
      // Grab the current value of what was written to the Realtime Database.
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      console.log(JSON.stringify(event.data.val()) + "     event event event eeeeeee");
      var obj = event.data.val();
      var x = 0;
   	  console.log(typeof obj + "     type of of of type of of of");
      for(var day in obj) {
      	console.log("dat:     " + JSON.stringify(day));
      	var r = new Date(obj[day].date.day * 1000);
      	console.log(r.getUTCDate() + "    rrrrrr" + "      :  dateinner  " + dateInner.getUTCDate());
      	if(r.getUTCDate() == dateInner.getUTCDate()) {
      		ref.orderByChild("salon").equalTo(event.params.username).on("value", function(snapshot) {
			  if(snapshot.val() == null) {
			  	for(var z = 0; z<obj[day].reserved.appointment.length; z++) {
			  		if(obj[day].reserved.appointment[z].selected == true) {
			  			console.log('selected == true push');
			  			ref.push({salon:event.params.username, time:obj[day].reserved.appointment[z].time, selected:true});
			  		}
			  	}			  	
			  }
			  else {
				  var b = false;
				  var snapper = snapshot.val();
				  snapshot.forEach(function(entry) {
				  	
				  	for(var a of obj[day].reserved.appointment) {
				  		
			  			for(var snap in snapper) {
			  				if(snapper[snap].salon == event.params.username && snapper[snap].time == z.time) {
			  					console.log('selected == true updating');
			  					snapper[snap].selected = a.selected;
			  				}
			  			}
			  			b = true;
			  			console.log("    snapshot val    "+JSON.stringify(snapshot.val()));
				  		
				  	}
				  })

				  return ref.update(snapper)
			  }

			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
      	}

      	x++;
      }

	  

      //return event.data.ref.parent.child('uppercase').set(uppercase);
    });

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

