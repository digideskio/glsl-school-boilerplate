#glsl-school-boilerplate
webgl editronで作成した作品をファイルをコピペして、Webで実行できるようにしたものです。

#環境設定

##必要なモジュールをinstall
```
$npm install
```

#ファイル構成
主なファイル構成は以下のようになります。
```
├── dist
│   ├── bundle.js
│   ├── index.html
├── src
│   ├── Config.js
│   ├── glcubic.js
│   ├── index.html // webgl editronのhtmlに対応
│   ├── index.js // webgl editronのJSに対応
│   └── shader
│       ├── fs.frag // webgl editronのfsに対応
│       ├── fsp.frag // webgl editronのfspに対応
│       ├── vs.vert // webgl editronのvsに対応
│       └── vsp.vert // webgl editronのvspに対応
```

#使い方
##起動
```
$npm start
```
webpack-dev-serverをinlineで起動します。

##出力
```
$webpack
```
distフォルダ以下にbundle.js、index.htmlが出力されます。

##ファイルの変更
###JS
```js
import gl3 from './glcubic'
import WE from './Config'

// ============================================================================
//
// サンプルコードを下にコピペしてください
//
// ============================================================================

// ここにJSをペーストする
```

# Todo

* [ ] canvasのresize対応

#参考
- [stackgl/glslify-loader: glslify loader module for webpack](https://github.com/stackgl/glslify-loader)
  - glslifyをwebpackで使うために必要

