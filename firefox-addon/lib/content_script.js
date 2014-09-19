'use strict';

var pageMods = require("sdk/page-mod");
var data = require("sdk/self").data;

function ContentScript(tab) {
  this.tab = tab;
}

ContentScript.prototype = {
  inject: function(scripts) {
    var contentScript = [];
    if (!Array.isArray(scripts)) {
      scripts = [scripts];
    }
    scripts.forEach(function(script) {
      contentScript.push(data.url(script));
    });

    this.tab.attach({
      contentScriptFile: contentScript
    });
  }
};

exports.ContentScript = ContentScript;
