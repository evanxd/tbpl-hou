'use strict';

var tabs = require('sdk/tabs');
var ContentScript = require('./content_script').ContentScript;

tabs.on('ready', function(tab) {
  var contentScript;
  // Inject the script if we are in the TBPL job page.
  if (tab.url.indexOf('https://tbpl.mozilla.org/?rev=') !== -1) {
    contentScript = new ContentScript(tab);
    contentScript.inject(['tbpl_job.js', 'check_result.js']);
  }
});
