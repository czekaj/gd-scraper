const AWS = require('aws-sdk')
const awsRegion = process.env.AWS_REGION || 'us-west-1'

let dynamoDbClient
const makeClient = () => {
  // if (dynamoDbClient) {
  //   return dynamoDbClient
  // }
  const options = {
    region: awsRegion
  }
  if (process.env.AWS_SAM_LOCAL) {
    options.endpoint = 'http://dynamodb:8000'
  }
  dynamoDbClient = new AWS.DynamoDB.DocumentClient(options)
  return dynamoDbClient
}

module.exports = {
  connect: () => makeClient()
}
