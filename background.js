chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });

  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon-128.png',
    title: 'Pomodoro Chrome Extension',
    message: "Break time!",
  });
});