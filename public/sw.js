self.addEventListener("notificationclick", function (event) {
  const url = self.registration.scope;
  event.notification.close(); // Android needs explicit close.

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];

        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }

      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

self.addEventListener("push", async (event) => {
  const data = event.data.json();

  self.registration.showNotification(data.title, { body: data.body });
});
