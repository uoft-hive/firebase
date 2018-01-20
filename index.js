// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our blog
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");

var usersRef = ref.child("users");
usersRef.set({
  bee1: {
    location: "Toronto, Canada",
    full_name: "Benedetta Mussati"
  },
  bee2: {
    location: "Edinburgh, United Kingdom",
    full_name: "Antonia Calvi"
  }
});

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const hiveFunctions = require('firebase-functions');


// a. the action name from the add_contact Dialogflow intent
const ADD_CONTACT_ACTION = 'add.contact';
// b. the parameters that are parsed from the add_contact intent
const CONTACT_ARGUMENT = 'contact';
const HIVE_ARGUMENT = 'hive';


exports.Hive = hiveFunctions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that generates the silly name
  function addContact (app) {
    let hive = app.getArgument(HIVE_ARGUMENT);
    let contact = app.getArgument(CONTACT_ARGUMENT);
    let deviceCoordinates = app.getDeviceLocation().coordinates;
    app.tell('I added ' +
      contact + ' to the hive ' + hive);
  }


  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(ADD_CONTACT_ACTION, addContact);


app.handleRequest(actionMap);
});
