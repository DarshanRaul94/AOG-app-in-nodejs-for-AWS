'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow,Button,Image,BasicCard,Suggestions,SimpleResponse} = require('actions-on-google');
const axios = require('axios');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
var name=[];
// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('profile name', (conv, {profile_name}) => {
  
 

  //name = profile_name;

 var config = {
  headers: {'profile': 'darshan'}
};
 axios.get('https://2f7wrz7c6baws.com/dev/s3/buckets',config)
  .then(response => {
    console.log(response.data);
   name=response.data.buckets;
  })
  .catch(error => {
    console.log(error);
  }); 
    // Respond with the user's lucky number and end the conversation.
  
    conv.ask('Hi ' + name + '.Which A.W.S service do you want to use ?');
});
app.intent('service name', (conv, {service_name}) => {
  const service = service_name;
  if(service=="S3"){
    conv.ask(new SimpleResponse({
  speech: 'These are the buckets in your S3 account',
  text: 'These are the buckets in your S3 account',
}));
    conv.ask(new BasicCard({
  text: '${name[0]}', // Note the two spaces before '\n' required for
                               // a line break to be rendered in the card.
  
  title: 'Buckets',
  
  display: 'CROPPED',
}));
    conv.ask('the following are the operations you can do in ' + service);
  conv.ask(new Suggestions(['Create Bucket','Delete Bucket','Upload file to a bucket']));
  }
  conv.ask('What action would you like to make');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
