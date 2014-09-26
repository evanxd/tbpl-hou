'use strict';

var tabs = require('sdk/tabs');
var ContentScript = require('./content_script').ContentScript;

tabs.on('ready', function(tab) {
  var contentScript;
  // If url matches https://tbpl.mozilla.org/?rev=*&tree=Gaia-Try or
  // https://tbpl.mozilla.org/?tree=Gaia-Try&rev=*,
  // inject the script if we are in the TBPL job page.
  if (tab.url.match(/^https:\/\/tbpl.mozilla.org\/\?rev=\w+\x26tree=Gaia-Try/) ||
      tab.url.match(/^https:\/\/tbpl.mozilla.org\/\?tree=Gaia-Try\x26rev=\w+/)) {
    contentScript = new ContentScript(tab);
    contentScript.inject(['tbpl_job.js', 'check_result.js']);
  }
});
