import consola from 'consola';

/**
 * @classdesc ログ操作を取り扱うクラス
 */
class Log {
  /**
   * @constructor
   */
  constructor() {
    // production では info 以上、そうでなければ debug 以上を出力
    // https://github.com/nuxt/consola/blob/v2.3.2/src/types.js
    consola.level = process.env.NODE_ENV === 'production' ? 3 : 4;
    this.useConsole = Boolean(process.env.USE_CONSOLE);
  }

  /**
   * デバッグログを出力する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {void}
   */
  debug(message, ...params) {
    this.log(consola.debug, message, ...params);
  }

  /**
   * 情報ログを出力する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {void}
   */
  info(message, ...params) {
    this.log(consola.info, message, ...params);
  }

  /**
   * 警告ログを出力する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {void}
   */
  warn(message, ...params) {
    this.log(consola.warn, message, ...params);
  }

  /**
   * エラーログを出力する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {void}
   */
  error(message, ...params) {
    this.log(consola.error, message, ...params);
  }

  /**
   * エラーログを出力し 空配列 を返却する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {array} 空配列
   */
  errorAndReturnEmptyArray(message, ...params) {
    this.error(message, ...params);
    return [];
  }

  /**
   * エラーログを出力し 空オブジェクト を返却する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {Object} 空オブジェクト
   */
  errorAndReturnEmptyObject(message, ...params) {
    this.error(message, ...params);
    return {};
  }

  /**
   * エラーログを出力し null を返却する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {null}
   */
  errorAndReturnNull(message, ...params) {
    this.error(message, ...params);
    return null;
  }

  /**
   * エラーログを出力し false を返却する。
   *
   * @param {*} message
   * @param {...*} params
   * @returns {false}
   */
  errorAndReturnFalse(message, ...params) {
    this.error(message, ...params);
    return false;
  }

  /**
   * ログ出力を実行する。
   *
   * @param {Function} callback
   * @param {*} message
   * @param {*} params
   * @returns {void}
   */
  log(callback, message, ...params) {
    // サーバ側なら問答無用で出力する
    if (!process.browser) {
      callback(message, ...params);
    } else if (this.useConsole) {
      callback(message, ...params);
    }
  }
}

const logger = new Log();

// this を束縛した状態でエクスポートする
export default {
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  errorAndReturnEmptyArray: logger.errorAndReturnEmptyArray.bind(logger),
  errorAndReturnEmptyObject: logger.errorAndReturnEmptyObject.bind(logger),
  errorAndReturnNull: logger.errorAndReturnNull.bind(logger),
  errorAndReturnFalse: logger.errorAndReturnFalse.bind(logger),
};
