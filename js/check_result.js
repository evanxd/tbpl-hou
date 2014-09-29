'use strict';

/* global TbplJob, TbplAudio, Notification */

(function() {
  var container = document.querySelector('#container');

  addTrackingSign();
  setTimeout(checkResult, 5000);

  function checkResult() {
    var tbpl = new TbplJob();
    var result = false;
    if (tbpl.isDone()) {
      if (tbpl.isSuccessful()) {
        result = true;
      }

      Notification.requestPermission(function() {
        var notification = new Notification(tbpl.description, { 
          body: result ? 'Success!' : 'Failure!'
        });
        notification.onshow = function() {
          new TbplAudio(result ? 'marioIGotIt' : 'marioDead').play();
        };
        notification.onclick = function() {
          window.focus();
        };
      });

      removeTrackingSign();
    } else {
      setTimeout(checkResult, 5000);
    }
  }

  function addTrackingSign() {
    container.style.borderStyle = 'dashed';
    // Firefox light orange, https://www.mozilla.org/en-US/styleguide/identity/firefox/color/.
    container.style.borderColor = '#FF9500';
  }

  function removeTrackingSign() {
    container.style.borderStyle = null;
    container.style.borderColor = null;
  }
})();
