chrome.runtime.onInstalled.addListener(function() {
    console.log("Smart Follow-Up Assistant Installed");
  });
  
  function checkReminders() {
    const currentTime = new Date().toISOString();
    
    chrome.storage.local.get(null, function(reminders) {
      for (const key in reminders) {
        const reminder = reminders[key];
        if (reminder.followUpTime <= currentTime) {
          chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Follow-Up Reminder',
            message: `Time to follow up on: ${reminder.email}`
          });
          chrome.storage.local.remove(key); // Remove the reminder once triggered
        }
      }
    });
  }
  
  // Check reminders every minute
  setInterval(checkReminders, 60000);
  
