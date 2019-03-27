'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
    dialogflow,
    Button,
    Image,
    BasicCard,
    Suggestions,
    SimpleResponse
} = require('actions-on-google');
const RxHR = require('@akanass/rx-http-request').RxHR;



// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
var name = [];
// Instantiate the Dialogflow client.
const app = dialogflow({
    debug: true
});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('profile name', (conv, {
    profile_name
}) => {



    const options = {

        headers: {
            'profile': 'darshan'
        }
    };

    RxHR.get('https://2te-api.ap-south-1.amazonaws.com/dev/s3/buckets', options).subscribe(
        (data) => {

            if (data.response.statusCode === 200) {
                name = data.body;
                //console.log(data.body); // Show the JSON response object.
            }
        },
        (err) => console.error(err) // Show error in console
    );


    conv.ask('Hi!Which A.W.S service do you want to use ?');

});

app.intent('service name', (conv, {
    service_name
}) => {
    const service = service_name;
    if (service == "S3") {
        conv.ask(new SimpleResponse({
            speech: 'These are the buckets in your S3 account',
            text: 'These are the buckets in your S3 account',
        }));
        conv.ask(new BasicCard({
            text: `${name}`,

            title: 'Buckets',

            display: 'CROPPED',
        }));
        conv.ask('the following are the operations you can do in ' + service);
        conv.ask(new Suggestions(['Create Bucket', 'Delete Bucket', 'Upload file to a bucket']));
    }
    conv.ask('What action would you like to make');
});

app.intent('create bucket', (conv, {
    bucket_name
}) => {
    const bucketname = bucket_name;
    const options = {
        headers: {
            'profile': 'darshan'
        },
        body: {
            "bucket_name": bucketname
        }
    };
     
    RxHR.post('https://.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets', options).subscribe(
        (data) => {
     
            if (data.response.statusCode === 201) {
                console.log(data.body); // Show the JSON response object.
            }
        },
        (err) => console.error(err) // Show error in console
    );
    
});


 



// async function f() {

//     let promise = new Promise((resolve, reject) => {
//       setTimeout(() => resolve("done!"), 1000)
//     });

//     let result = await promise; // wait till the promise resolves (*)

//     alert(result); // "done!"

//     Axios.get('https://2ecute-api.ap-south-1.amazonaws.com/dev/s3/buckets',config)
//     .subscribe(
//       response => console.log(response),
//       error => console.log(error)
//     );
//   }



//   f();
// // Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
