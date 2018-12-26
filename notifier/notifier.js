var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
var parse = AWS.DynamoDB.Converter.unmarshall;

exports.handler = (event,context) => {
    event.Records.forEach( (record) => {
        var newReview = parse(record.dynamodb.NewImage)
        
        var params = {
          Message: JSON.stringify(newReview, null, 2),
          TopicArn: process.env.TOPIC_ARN
        };
        var sns = new AWS.SNS({apiVersion: '2010-03-31'})
        sns.publish(params, function(err, data) {
            if (err) {
                console.log('Failed to publish SNS message');
                context.fail(err);
            }
            else {
                console.log('SNS message published successfully');
                context.succeed(data);
            }
        });
    });
};
