const $pageUrl = process.argv[2]
console.debug('$pageUrl=' + $pageUrl)

require('chromedriver')
var webdriver = require('selenium-webdriver')
var chrome = require('selenium-webdriver/chrome')

var options = new chrome.Options()
options.addArguments('headless')
options.addArguments('disable-gpu')

var $browser = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build()
