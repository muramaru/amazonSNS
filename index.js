const express = require( 'express' );
const app = express();
app.get('/sms', (req, res) => {
    
    //load aws-sdk module
    var AWS = require('aws-sdk');
    //loads config.json which we created earlier which contains aws security credentials.
    AWS.config.loadFromPath('config.json');
    // Load the AWS SDK for Node.js
    AWS.config.update({region: 'ap-southeast-1'});

    // Create publish parameters
    var params = {
    Message: 'TEXT_MESSAGE', /* required */
    PhoneNumber: '+66838196107',
    DefaultSenderID: 'กสอ.',
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
    function(data) {
        console.log("MessageID is " + data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });
    // var sns = new AWS.SNS();
    // var SNS_TOPIC_ARN = "AWS SNS test";
    
   
    //subscribing a mobile number to a topic
//     sns.subscribe({
//         Protocol: 'sms',
//         TopicArn: SNS_TOPIC_ARN,
//         Endpoint: 0838196107 // type mobile number to whom you want to send a message.
//     }, function(error, data) {
//         if (error) {
//             console.log("error when subscribe", error);
//         }
//         console.log("subscribe data", data);
//         var SubscriptionArn = data.SubscriptionArn;
//         var params = {
//             TargetArn: SNS_TOPIC_ARN,
//             Message: 'This is message',//type your message
//             Subject: 'This is Subject' //type your subject
//         };
        
//         //publish a message.
//         sns.publish(params, function(err_publish, data) {
//             if (err_publish) {
//                 console.log('Error sending a message', err_publish);
//             } else {
//                 console.log('Sent message:', data.MessageId);
//             }
//             var params = {
//                 SubscriptionArn: SubscriptionArn
//             };
            
//             //unsubscribing the topic
//             sns.unsubscribe(params, function(err, data) {
//                 if (err) {
//                     console.log("err when unsubscribe", err);
//                 }
//             });
//         });
//    });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))