'use strict';

function TbplJob (id) {
  this.id = id;
}

TbplJob.prototype = {
  get description() {
    return document.querySelector('#pushes .patches .patchTitle .desc').textContent;
  },

  get results() {
    return document.querySelectorAll('#pushes .results li .osresults .machineResult');
  },

  isSuccessful: function() {
    var isSuccessful = true,
        previousJob;

    if (this.isDone()) {
      Array.prototype.forEach.call(this.results, function(el) {
        if (!el.getAttribute('class').contains('success')) {
          isSuccessful = false;
        } else if (el.textContent === previousJob) {
          isSuccessful = true;
        }
        previousJob = el.textContent;
      });
    } else {
      isSuccessful = false;
    }
    return isSuccessful;
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
