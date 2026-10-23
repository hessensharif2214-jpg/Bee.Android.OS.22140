self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// This lets the page call showNotification() through the SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data;
    self.registration.showNotification(title || 'Bee Project', {
      body: body || '',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3QgeD0iNiIgeT0iMTIiIHdpZHRoPSIzNiIgaGVpZ2h0PSIyNiIgcng9IjUiIHJ5PSI1IiBmaWxsPSIjRkZDQzAwIiBzdHJva2U9IiMxMTEiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik02IDE4IEw0MiAxOCIgc3Ryb2tlPSIjMTExIiBzdHJva2Utd2lkdGg9IjIiLz48cmVjdCB4PSIzMCIgeT0iMjIiIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiByeD0iMiIgcnk9IjIiIGZpbGw9IiMxMTEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjI2IiByPSIyIiBmaWxsPSIjRkZDQzAwIi8+PC9zdmc+',
      badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3QgeD0iNiIgeT0iMTIiIHdpZHRoPSIzNiIgaGVpZ2h0PSIyNiIgcng9IjUiIHJ5PSI1IiBmaWxsPSIjRkZDQzAwIiBzdHJva2U9IiMxMTEiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
      tag: 'bee-project',
      renotify: true,
      requireInteraction: false,
      vibrate: [100, 60, 150]
    });
  }
});

// Handle notification tap
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

// Handle push (optional, only works if you have a push server)
self.addEventListener('push', (event) => {
  let data = { title: 'Bee Project', body: 'You have a new notification' };
  try { if (event.data) data = event.data.json(); } catch(e) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: 'bee-project',
      renotify: true
    })
  );
});