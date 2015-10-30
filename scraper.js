const Browser = require('zombie');

var browser = new Browser();

browser.visit('https://www.reddit.com/', function() {
    browser.assert.success();
    console.log(browser.text('body'));
});
