const url = process.argv[2]

require('chromedriver')
var webdriver = require('selenium-webdriver')
var chrome = require('selenium-webdriver/chrome')

var options = new chrome.Options()
options.addArguments('headless')
options.addArguments('disable-gpu')

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build()

driver.get(url).then(async () => {
  var reviews = await driver.findElements({
    className: 'empReview'
  })
  reviews.forEach(async (review) => {
    var getFieldByClass = async (classNameValue) => {
      try {
        var field = await review.findElement({
          className: classNameValue
        })
      } catch (e) {
        return ''
      }
      return field.getText()
    }
    var date = await review.findElement({
      tagName: 'time'
    })
    date = await date.getText()
    var stars = await review.findElement({
      className: 'value-title'
    })
    stars = await stars.getAttribute('title')
    stars = '*'.repeat(stars)
    var reviewObj = {
      date,
      summary: await getFieldByClass('summary'),
      stars,
      author: await getFieldByClass('authorInfo'),
      pros: await getFieldByClass('pros'),
      cons: await getFieldByClass('cons'),
      advice: await getFieldByClass('adviceMgmt')
    }
    console.log(JSON.stringify({ review: reviewObj }, null, 2))
  })
})
