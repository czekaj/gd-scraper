const processor = require('../processor')
const fs = require('fs');

const contents = fs.readFileSync(__dirname + '/event.json', 'utf8')
processor.handler(contents, null, () => {
  console.log("Handler execution finished");
})