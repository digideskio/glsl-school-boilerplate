// attributeは毎回違う
attribute vec3 position; // 頂点の座標
attribute vec4 color;    // 頂点の色

// uniformは毎回同じ
uniform mat4 mvpMatrix;  // 頂点の座標変換行列

varying vec4 vColor;     // フラグメントシェーダへのバイパス変数

void main(){
    // 頂点を行列で変換する
    gl_Position = mvpMatrix * vec4(position, 1.0);

    // 頂点カラーはそのままフラグメントシェーダへ
    vColor = color;
}
