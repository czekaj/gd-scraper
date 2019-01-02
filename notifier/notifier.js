var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
var parse = AWS.DynamoDB.Converter.unmarshall;

exports.handler = (event,context) => {
    event.Records.forEach( (record) => {
        if (record.eventName == 'INSERT') {
            var newReview = parse(record.dynamodb.NewImage)
            let message = ''
            for (let key of Object.keys(newReview)) {
              message += `${key.toUpperCase()}\t\t${newReview[key]}\n`
            }
            var params = {
              Message: message,
              TopicArn: process.env.TOPIC_ARN
            };
            var sns = new AWS.SNS({apiVersion: '2010-03-31'})
            sns.publish(params, function(err, data) {
                if (err) {
                    console.log('Failed to publish SNS message');
                    context.fail(err);
                }
                else {
                    console.log('SNS message published successfully for DynamoDB record', JSON.stringify(record, null, 2));
                    context.succeed(data);
                }
            });
        }
    });
};
