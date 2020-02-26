/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import AppConfig from '../../config';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * serviceWorkerからSubscriptionを取得する
 */
async function getsubscription() {
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  return sub;
}

/**
 * 公開鍵を元に、ServiceWorkerからSubscriptionを取得する
 */
async function initSubscribe() {
  const option = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(AppConfig.VAPID_API_PUBLIC_KEY),
  };
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.subscribe(option);
  return sub;
}


function formatSub(sub) {
  const rawKey = sub.getKey ? sub.getKey('p256dh') : '';
  const key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
  const rawAuthSecret = sub.getKey ? sub.getKey('auth') : '';
  const auth = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
  return {
    endpoint: sub.endpoint,
    p256dh: key,
    auth,
  };
}

export default {
  computed: {
    isTenantLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
    isAgentLoggedIn() {
      return this.$store.state.agent.isLoggedIn;
    },
  },
  beforeMount() {
    if (!this.isTenantLoggedIn && !this.isAgentLoggedIn) return;
    window.addEventListener('load', async () => {
      navigator.serviceWorker.register('/service-worker.js');
      // すでにserviseworkerが動いているか確認
      const sub = await getsubscription();
      console.log('sub', sub);
      if (!sub) {
        // ブラウザに通知許可を要求する
        const permission = await Notification.requestPermission();
        if (permission === 'denied') {
          console.error('ブラウザの通知設定をONにしてください');
        } else {
          const data = await initSubscribe();
          const initSub = formatSub(data);
          console.log('initSub', initSub);
          if (this.isTenantLoggedIn) {
            await this.$axios.$post('/webpush/set_tenant_key', initSub)
              .then(() => console.log('success'))
              .catch(() => console.log('error'));
          }
          if (this.isAgentLoggedIn) {
            await this.$axios.$post('/webpush/set_agent_key', initSub)
              .then(() => console.log('success'))
              .catch(() => console.log('error'));
          }
        }
      }
    });
  },
};
