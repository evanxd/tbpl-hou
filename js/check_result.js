'use strict';

/* global TbplJob, Notification */

setTimeout(checkResult, 5000);

function checkResult() {
  var tbpl = new TbplJob();
  var result = 'Fail!';
  if (tbpl.isDone()) {
    if (tbpl.isAllSuccessful()) {
      result = 'Success!';
    }
    Notification.requestPermission( function(status) {
      new Notification('Result', { body: result });
    }); 
  } else {
    setTimeout(checkResult, 5000);
  }
}
