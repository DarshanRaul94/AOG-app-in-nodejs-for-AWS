'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow,Button,Image,BasicCard} = require('actions-on-google');
const axios = require('axios');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
var name='';
// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('profile name', (conv, {profile_name}) => {
  
 

  name = profile_name;
 /*
 var config = {
  headers: {'profile': 'darshan'}
};
 axios.get('https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets',config)
  .then(response => {
    console.log(response.data);
   name=JSON.stringify(response.data);
  })
  .catch(error => {
    console.log(error);
  }); */
    // Respond with the user's lucky number and end the conversation.
  
    conv.ask('Hi ' + name + '.Which A.W.S service do you want to use ?');
});
app.intent('service name', (conv, {service_name}) => {
  const service = service_name;
    conv.ask('ok ' + name + '.the following are the operations you can do in ' + service);
  conv.ask(new BasicCard({
 
  subtitle: 'Use this to create a bucket',
  title: 'CREATE BUCKET',
  
  display: 'CROPPED',
}));
   conv.ask(new BasicCard({
 
  subtitle: 'Use this to delete a bucket',
  title: 'DELETE BUCKET',
  
  display: 'CROPPED',
}));
  conv.ask(new BasicCard({
 
  subtitle: 'List the buckets in your account',
  title: 'LIST BUCKETS',
  
  display: 'CROPPED',
}));
  conv.ask('What action would you like to make');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
