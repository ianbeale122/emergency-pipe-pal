
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await registerServiceWorker();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
}

export async function scheduleNotification(date: Date) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  // Schedule notification for one day before the service
  const notificationDate = new Date(date);
  notificationDate.setDate(notificationDate.getDate() - 1);
  
  const now = new Date();
  const timeUntilNotification = notificationDate.getTime() - now.getTime();
  
  if (timeUntilNotification > 0) {
    setTimeout(() => {
      new Notification('Annual Service Reminder', {
        body: 'Your annual boiler service is scheduled for tomorrow',
        icon: '/lovable-uploads/6c4f1fb6-e6ec-4ae1-9b8e-c18cce73a22d.png'
      });
    }, timeUntilNotification);
  }
}
