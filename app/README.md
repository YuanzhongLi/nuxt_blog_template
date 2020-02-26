# estie_product app

## Setup

```sh
$ npm install
```

## Ordinary mode

app はローカルにて起動し、他は Docker コンテナを利用します。  
api もローカル起動する場合もこのモードが利用できます。

### 手順

- `config/local/meta.js` を修正します。

```js
  TARGET: 'ordinary',
```

- コンテナを起動します（api もローカル起動する場合は[こちら](../api/README.md)も合わせてご確認ください）。

```sh
$ # api が依存しているコンテナも合わせて起動する
$ docker-compose up api
```

- アプリケーションを起動します。

```sh
$ npm run dev
$ # http://localhost:3000 でアクセス可能
```

## 開発で config の設定を変えたい時

meta.js の TARGET を<設定したい config タイプの file>に変えて、config/<設定したい config タイプの file>.js の config を編集して確認できます
