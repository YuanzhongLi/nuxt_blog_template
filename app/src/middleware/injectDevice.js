import log from '~/utils/log';

/**
 * デバイス情報をストアに保存する処理をコールする。
 *
 * @param {Object} app
 * @param {Object} context
 */
export default async function (context) {
  await context.store.dispatch('device/injectDeviceData', (context.app, context)).catch(log.error);
}
