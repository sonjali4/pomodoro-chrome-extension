chrome.alarms.onAlarm.addListener(() => {
  // update extension badge
  chrome.action.setBadgeText({ text: '' });

  // create notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon-128.png',
    title: 'Pomodoro Chrome Extension',
    message: "Break time!",
  });

  // start next timer
  chrome.runtime.sendMessage('startNextTimer');
});