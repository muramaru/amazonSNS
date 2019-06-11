const express = require( 'express' );
const app = express();
app.get('/sms', (req, res) => {
    
    //load aws-sdk module
    var AWS = require('aws-sdk');
    //loads config.json which we created earlier which contains aws security credentials.
    AWS.config.loadFromPath('config.json');
    // Load the AWS SDK for Node.js
    AWS.config.update({region: 'ap-southeast-1'});

    // Create SMS Attribute parameters
    var params = {
        attributes: { /* required */
        // 'DefaultSMSType': 'Transactional', /* highest reliability */
        'DefaultSMSType': 'Promotional', /* lowest cost */
        'DefaultSenderID': 'DIPREPORT'
    }
    };
    
    // Create promise and SNS service object
    var setSMSTypePromise = new AWS.SNS({apiVersion: '2010-03-31'}).setSMSAttributes(params).promise();
    
    // Handle promise's fulfilled/rejected states
    setSMSTypePromise.then(
        function(data) {
        console.log(data);

        // Create publish parameters
        var params = {
                Message: 'TEXT_MESSAGE',
                PhoneNumber: 'ENTER NUMBER WITH COUNTRY CODE',
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

        }).catch(
        function(err) {
        console.error(err, err.stack);
        });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))