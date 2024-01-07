// This file is required for service worker registration, but doesn't need to implement any of these
self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

 self.addEventListener('push', (event) => {
    let pushData = event.data.json();
    if (!pushData || !pushData.title) {
        console.error('Received WebPush with an empty title. Received body: ', pushData);
    }
    self.registration.showNotification(pushData.title, pushData)
});

self.addEventListener('notificationclick', (event) => event.notification.close());