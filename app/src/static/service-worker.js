// ブラウザに対して通知イベントを検知した際に実行される処理を定義
this.addEventListener('push', (e) => {
  console.log('e in service worker', e);
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
    data: {
      link_to: data.link,
    },
  };
  e.waitUntil(this.registration.showNotification(data.title, options));
});
// 通知バーがクリックされた際に実行される処理を定義
this.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.link_to));
});
