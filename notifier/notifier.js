const AWS = require('aws-sdk')
const awsRegion = process.env.AWS_REGION || 'us-west-1'

const options = {
  region: awsRegion
}
if (process.env.AWS_SAM_LOCAL) {
  options.endpoint = 'http://dynamodb:8000'
}
const client = new AWS.DynamoDB.DocumentClient(options)

// var db = require('./config/dynamodb.js')

exports.handler = (event, context, callback) => {
  var cb = (err, data) => {
    console.log('CALLBACK:')
    const dbReviewIds = data.Items.map((item) => item.reviewId)
    const eventReviewIds = event.reviews.map((item) => item.reviewId)
    var newReviewIds = eventReviewIds.filter(function (item) {
      return dbReviewIds.indexOf(item) === -1
    })
    console.log(err, newReviewIds)
    callback(err, newReviewIds)
  }
  client.scan({
    TableName: 'ReviewsTable',
    ProjectionExpression: 'reviewId'
  }).send(cb)
  // console.log('RECEIVED EVENT:', event)
}
