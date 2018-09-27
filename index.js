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

var reviews = []

driver.get(url).then(async () => {
  var reviewEls = await driver.findElements({
    className: 'empReview'
  })
  for (var i = 0; i < reviewEls.length; i++) {
    var getFieldByClass = async (classNameValue) => {
      try {
        var field = await reviewEls[i].findElement({
          className: classNameValue
        })
      } catch (e) {
        return ''
      }
      return field.getText()
    }
    var date = await reviewEls[i].findElement({
      tagName: 'time'
    })
    date = await date.getText()
    var stars = await reviewEls[i].findElement({
      className: 'value-title'
    })
    stars = await stars.getAttribute('title')
    stars = '*'.repeat(stars)
    var review = {
      date,
      summary: await getFieldByClass('summary'),
      stars,
      author: await getFieldByClass('authorInfo'),
      pros: await getFieldByClass('pros'),
      cons: await getFieldByClass('cons'),
      advice: await getFieldByClass('adviceMgmt')
    }
    reviews.push({ review })
  }
  console.log(JSON.stringify(reviews, null, 2))
})
