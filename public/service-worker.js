
self.addEventListener('push', function(event) {
  const options = {
    body: event.data.text(),
    icon: '/lovable-uploads/6c4f1fb6-e6ec-4ae1-9b8e-c18cce73a22d.png',
    badge: '/lovable-uploads/6c4f1fb6-e6ec-4ae1-9b8e-c18cce73a22d.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Annual Service Reminder', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'explore') {
    clients.openWindow('/annual-service');
  }
});
