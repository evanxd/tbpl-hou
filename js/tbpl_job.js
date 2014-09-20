'use strict';

function TbplJob (id) {
  this.id = id;
}

TbplJob.prototype = {
  get results() {
    return document.querySelectorAll('#pushes .results li .osresults .machineResult');
  },
  
  isAllSuccessful: function() {
    var isAllSuccessful = true;
    if (this.isDone()) {
      Array.prototype.forEach.call(this.results, function(el) {
        if (!el.getAttribute('class').contains('success')) {
          isAllSuccessful = false;
        }
      });
    } else {
      isAllSuccessful = false;
    }
    return isAllSuccessful;
  },
  
  isDone: function() {
    var isDone = this.results ? true : false;
    Array.prototype.forEach.call(this.results, function(el) {
      if (el.getAttribute('class').contains('running') ||
          el.getAttribute('class').contains('pending')) {
        isDone = false;
      }
    });
    return isDone;
  }
};
