import gl3 from './glcubic'
import WE from './Config'

// ============================================================================
//
// school 2016 10 sample.002 : vertex attribute
//
// ============================================================================
//
// 頂点シェーダで利用できる attribute 変数について理解を深めましょう。
// attribute 変数は、頂点属性と呼ばれる「頂点が持つ固有の情報」を受け取ります。
// 一番わかりやすいのは、頂点の座標、です。頂点はそれぞれが固有の座標を持ってい
// るからこそ、三次元空間内に立体的な形状を作ることができるわけですね。
//
// attribute 変数には、最低でも頂点座標が含まれる場合が多いでしょう。ただし、実
// 際にはどんな属性を頂点に持たせるのかは、実装者の自由です。
// ここでは、頂点属性に色の情報、すなわち頂点カラーを持たせることで、シェーダ内
// でどのように attribute 変数として振る舞うのか、確認してみましょう。
//
// ============================================================================
//
// ◆やってみよう！◆
// 頂点属性の「頂点カラー」を定義している場所を見つけて値を修正してみよう。
// 頂点カラーの定義を変更すると、描画結果にどのような影響があるのかを、動作確認
// しながら自分なりに検証してみよう。
//
// ============================================================================

(function(){
    'use strict';
    var gl, camera, canvasElement, canvasWidth, canvasHeight;
    camera = new InteractionCamera();

    // glcubic の初期化
    canvasElement = document.getElementById('canvas');
    gl3.initGL(canvasElement);
    if(!gl3.ready){console.log('initialize error'); return;}

    // 扱いやすいように gl に WebGL Context オブジェクトを代入しておく
    gl = gl3.gl;

    // canvas のサイズをフレーム内の最大幅(512px)に設定
    canvasWidth  = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvasElement.width  = canvasWidth;
    canvasElement.height = canvasHeight;

    // マウスカーソルの動きに応じてカメラを動かすためのイベント登録
    canvasElement.addEventListener('mousedown', camera.mouseInteractionStart, false);
    canvasElement.addEventListener('mousemove', camera.mouseInteractionMove, false);
    canvasElement.addEventListener('mouseup', camera.mouseInteractionEnd, false);
    canvasElement.addEventListener('wheel', camera.wheelScroll, false);

    // 初期化関数の呼び出し
    init();



    function init(){
        // glcubic でプログラムオブジェクトのラッパーを生成
        var prg = gl3.program.create_from_source(
            WE.vs,
            WE.fs,
            ['position', 'color'],
            [3, 4],
            ['mvpMatrix'],
            ['matrix4fv']
        );
        if(!prg){return;}

        // 四角形ポリゴンの頂点データを定義
        var planePosition = [
            -1.0,  1.0,  0.0,
             1.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ];
        var planeColor = [
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ];
        var planeIndex = [
            0, 1, 2, 2, 1, 3
        ];
        var floorVBO = [
            gl3.create_vbo(planePosition),
            gl3.create_vbo(planeColor)
        ];
        var floorIBO = gl3.create_ibo(planeIndex);

        // 行列関係の初期化
        var mMatrix   = gl3.mat4.identity(gl3.mat4.create());
        var vMatrix   = gl3.mat4.identity(gl3.mat4.create());
        var pMatrix   = gl3.mat4.identity(gl3.mat4.create());
        var vpMatrix  = gl3.mat4.identity(gl3.mat4.create());
        var mvpMatrix = gl3.mat4.identity(gl3.mat4.create());

        // WebGL コンテキストのフラグなどを有効化
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        // レンダリング許可フラグを立ててレンダリング開始
        WE.run = true;
        render();

        // レンダリング関数
        function render(){
            // 透視射影変換行列
            camera.update();
            var perspective = gl3.camera.create(
                camera.cameraPosition,
                camera.centerPoint,
                camera.cameraUpDirection,
                60, 1.0, 0.1, camera.cameraDistance * 5.0
            );
            gl3.mat4.vpFromCamera(perspective, vMatrix, pMatrix, vpMatrix);

            // シーンをクリアしビューポートを設定
            gl3.scene_clear([0.3, 0.3, 0.3, 1.0], 1.0);
            gl3.scene_view(camera, 0, 0, canvasWidth, canvasHeight);

            // ベースシーン用のプログラムオブジェクトをセットしてアクティブに
            prg.set_program();

            // 床面の頂点データをバインド
            prg.set_attribute(floorVBO, floorIBO);

            // 行列を一度初期化
            gl3.mat4.identity(mMatrix);

            // 行列に拡大を適用
            gl3.mat4.scale(mMatrix, [5.0, 5.0, 1.0], mMatrix);

            // 行列を乗算してひとつにまとめる
            gl3.mat4.multiply(vpMatrix, mMatrix, mvpMatrix);

            // MVP マトリックスをシェーダにプッシュ
            prg.push_shader([mvpMatrix]);

            // 描画命令を発行して三角形で描画
            gl3.draw_elements(gl.TRIANGLES, planeIndex.length);

            // フラグをチェックして再帰
            if(WE.run){requestAnimationFrame(render);}
        }
    }

    // カメラ関連 =============================================================
    function InteractionCamera(defaultDistance){
        var distance = 20.0;
        if(defaultDistance && !isNaN(parseInt(defaultDistance, 10))){
            distance = defaultDistance;
        }
        this.cameraDistance     = distance;
        this.dCameraDistance    = this.cameraDistance;
        this.cameraPosition     = [0.0, 0.0, this.cameraDistance];
        this.centerPoint        = [0.0, 0.0, 0.0];
        this.cameraUpDirection  = [0.0, 1.0, 0.0];
        this.dCameraPosition    = [0.0, 0.0, this.cameraDistance];
        this.dCenterPoint       = [0.0, 0.0, 0.0];
        this.dCameraUpDirection = [0.0, 1.0, 0.0];
        this.cameraRotateX      = 0.0;
        this.cameraRotateY      = 0.0;
        this.cameraScale        = 0.0;
        this.clickStart         = false;
        this.prevPosition       = [0, 0];
        this.offsetPosition     = [0, 0];
        this.qt  = gl3.qtn.identity(gl3.qtn.create());
        this.qtx = gl3.qtn.identity(gl3.qtn.create());
        this.qty = gl3.qtn.identity(gl3.qtn.create());

        this.mouseInteractionStart = function(eve){
            this.clickStart = true;
            this.prevPosition = [
                eve.pageX,
                eve.pageY
            ];
            eve.preventDefault();
        };
        this.mouseInteractionMove = function(eve){
            if(!this.clickStart){return;}
            var w = canvasElement.width;
            var h = canvasElement.height;
            var s = 1.0 / Math.min(w, h);
            this.offsetPosition = [
                eve.pageX - this.prevPosition[0],
                eve.pageY - this.prevPosition[1]
            ];
            this.prevPosition = [eve.pageX, eve.pageY];
            switch(eve.buttons){
                case 1:
                    this.cameraRotateX += this.offsetPosition[0] * s;
                    this.cameraRotateY += this.offsetPosition[1] * s;
                    this.cameraRotateX = this.cameraRotateX % 1.0;
                    this.cameraRotateY = Math.min(Math.max(this.cameraRotateY % 1.0, -0.25), 0.25);
                    break;
            }
        };
        this.mouseInteractionEnd = function(eve){
            this.clickStart = false;
        };
        this.wheelScroll = function(eve){
            var w = eve.wheelDelta;
            if(w > 0){
                this.cameraScale = 0.8;
            }else if(w < 0){
                this.cameraScale = -0.8;
            }
        };
        this.update = function(){
            var v = [1.0, 0.0, 0.0];
            this.cameraScale *= 0.75;
            this.cameraDistance += this.cameraScale;
            this.cameraDistance = Math.min(Math.max(this.cameraDistance, 5.0), this.dCameraDistance * 2.0);
            this.dCameraPosition[2] = this.cameraDistance;
            gl3.qtn.identity(this.qt);
            gl3.qtn.identity(this.qtx);
            gl3.qtn.identity(this.qty);
            gl3.qtn.rotate(this.cameraRotateX * gl3.PI2, [0.0, 1.0, 0.0], this.qtx);
            gl3.qtn.toVecIII(v, this.qtx, v);
            gl3.qtn.rotate(this.cameraRotateY * gl3.PI2, v, this.qty);
            gl3.qtn.multiply(this.qtx, this.qty, this.qt);
            gl3.qtn.toVecIII(this.dCameraPosition, this.qt, this.cameraPosition);
            gl3.qtn.toVecIII(this.dCameraUpDirection, this.qt, this.cameraUpDirection);
        };
        this.mouseInteractionStart = this.mouseInteractionStart.bind(this);
        this.mouseInteractionMove = this.mouseInteractionMove.bind(this);
        this.mouseInteractionEnd = this.mouseInteractionEnd.bind(this);
        this.wheelScroll = this.wheelScroll.bind(this);
        this.update = this.update.bind(this);
    }
})();
