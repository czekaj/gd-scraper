const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-1'});
const options = {}
if (process.env.AWS_SAM_LOCAL) {
  options.endpoint = 'http://dynamodb:8000'
}
const client = new AWS.DynamoDB.DocumentClient(options)
const DYNAMODB_TABLE_NAME = process.env.TABLE_NAME
console.log(process.env.TABLE_NAME)

exports.handler = (event, context, callback) => {
  // console.log('RECEIVED EVENT:', event)
  const reviews = event
  var batchWriteRequest = {
    RequestItems : {
      [DYNAMODB_TABLE_NAME] : []
    }
  }
  reviews.forEach((review) => {
    var putRequest = {
      PutRequest : {
        Item : {
          reviewId: review.reviewId,
          url: review.url || " ",
          date: review.date,
          summary: review.summary || " ",
          stars: review.stars || " ",
          author: review.author || " ",
          pros: review.pros || " ",
          cons: review.cons || " ",
          advice: review.advice || " "
        },
        ConditionExpression: "reviewId <> :r",
        ExpressionAttributeValues: {
            ":r": {S: review.reviewId},
        }   
      }
    }
    batchWriteRequest.RequestItems[DYNAMODB_TABLE_NAME].push(putRequest)
  })
  client.batchWrite(batchWriteRequest, (err, data) => {
    if (err) {
      console.log("Error", err)
    } else {
      console.log("Success", data)
    }
  })
}
