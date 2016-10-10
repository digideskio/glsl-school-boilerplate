precision mediump float;

varying vec4 vColor; // 頂点シェーダから送られてくる色

void main(){
    // 色をフラグメントに出力
    gl_FragColor = vColor;
}
