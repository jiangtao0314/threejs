//shader
const shader =  {
    vertexShader:`varying vec2 vUv;
        varying float v_py;
        void main() {
            vUv = uv;
            v_py = position.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         } `,
    fragmentShader: ` // 根据片元的高度来渐变
        varying vec2 vUv;
        uniform float lightHeight;
        uniform float lightWidth;
        uniform float maxH;
        uniform sampler2D texture1;
        varying float v_py;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 colorGo;
        float plot (vec2 st, float pct){
          return  smoothstep( pct-lightWidth, pct, v_py) - smoothstep( pct, pct+0.02, v_py);
        }
        void main(){
        float f1 = plot(vUv,lightHeight);
        vec4 b1 = vec4(colorGo.r, colorGo.g, colorGo.b, 1.0) ;
        // vec3 gradient = mix(color1, color2, v_py * 0.1); // 除法渐变 0.1 或者说 10.0 是指停止渐变高度
        vec3 gradient =  mix(color1, color2, smoothstep( 0.0, maxH, v_py)); //内置 smoothstep法渐变
        // gl_FragColor = vec4(gradient,1.); // 仅仅渐变色
        gl_FragColor = mix(vec4(gradient,1.),b1,f1);  //渐变与光效混合
        gl_FragColor = mix(texture2D(texture1, vUv),vec4(gl_FragColor.r,gl_FragColor.g,gl_FragColor.b,0.9),0.9);  //再混合材质
} `
}
const shader2 = {
    vertexShader:`varying vec2 vUv;
        varying float v_py;
         varying float v_pz;
         varying float v_px;
        void main() {
            vUv = uv;
            v_py = position.y;
            v_pz = position.z;
            v_px = position.x;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         } `,
    fragmentShader: ` // 根据片元的高度来渐变
        varying vec2 vUv;
        uniform float lightHeight;
        uniform float lightWidth;
        uniform float opacity1;
        uniform float goz;
        uniform float goWidth;
        uniform float maxH;
        uniform sampler2D texture1;
        varying float v_py;
        varying float v_pz;
        varying float v_px;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 colorGo;
        uniform vec3 colorLine;
        uniform vec3 colorCircle; 
        uniform vec3 center; //扫描圈中心店
        uniform float u_r;
        uniform float u_length;
        uniform float u_max;
        float getLeng(float x, float z){
            return  sqrt((x-center.x)*(x-center.x)+(z-center.z)*(z-center.z)); //sqrt开根号 取R
        }
        float plot (vec2 st, float pct){
          return  smoothstep( pct-lightWidth, pct, v_py) - smoothstep( pct, pct+0.02, v_py);
        }
        void main(){
        float f1 = plot(vUv,lightHeight);
        vec4 b1 = vec4(colorGo.r, colorGo.g, colorGo.b, 1.0) ;
        // vec3 gradient = mix(color1, color2, v_py * 0.1); // 除法渐变 0.1 或者说 10.0 是指停止渐变高度
        vec3 gradient =  mix(color1, color2, smoothstep( -625.0, maxH, v_py)); //内置 smoothstep法渐变
        // gl_FragColor = vec4(gradient,1.); // 仅仅渐变色
        gl_FragColor = mix(vec4(gradient,1.),b1,f1);  //渐变与光效混合
        gl_FragColor = mix(texture2D(texture1, vUv),vec4(gl_FragColor.r,gl_FragColor.g,gl_FragColor.b,opacity1),0.5);  //再混合材质
        if( abs(v_pz - goz) <= goWidth ) { // 如果在扫描线范围内
          gl_FragColor = mix(
          vec4(gl_FragColor.r,gl_FragColor.g,gl_FragColor.b,1),
          vec4(colorLine.r,colorLine.g,colorLine.b,(1.0- abs(v_pz - goz) / goWidth) * 0.9),
          0.5);
        }
        float cr = getLeng(v_px,v_pz);
        if ( abs(cr - u_r) <= u_length ) {
          gl_FragColor = mix(
          vec4(gl_FragColor.r,gl_FragColor.g,gl_FragColor.b,1),
          vec4(colorCircle.r,colorCircle.g,colorCircle.b,(1.0- abs(cr - u_r) / u_length) * 0.9),
          0.5);
        }
} `
}
const ShaderBar = {
    uniforms: {
        lightHeight: { //运动时高度
            value: 0
        },
        lightWidth: { // 大小(高度)
            value: 5
        },
        maxH: {
            value : 20.0 //中间值
        },
        texture1: {
            value: textureLoader.load("../../data/ysThree/models/obj/city2/maoyidasha02.jpg")
        },
        color1:{value: new THREE.Color('#001327')},
        color2:{value: new THREE.Color('#00FFFF')},
        colorGo:{value: new THREE.Color('#ff6713')}
    },
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
}
const ShaderBar2 = {
    uniforms: {
        lightHeight: {value:  -625},//运动时高度
        lightWidth: {value: 10},// 大小(高度)
        maxH: {value : -300},//中间值
        texture1: {value: textureLoader.load("../../data/ysThree/models/obj/city2/ny1.jpg")},
        opacity1: {value: 0.9},
        goz: {value: -400},//定义扫过的线的 z
        goWidth: {value: 10},// 定义扫过线的 宽度
        center: {value: new THREE.Vector3(-7911,-620,-2084)},
        u_r: { value: 0.25 },
        u_length: { value: 20 }, //圆环厚度
        u_max: { value: 600 }, //扫过最大值
        color1:{value: new THREE.Color('#001327')},
        color2:{value: new THREE.Color('#00FFFF')},
        colorGo:{value: new THREE.Color('#88FF69')},
        colorLine: {value: new THREE.Color('#b017ff')},
        colorCircle:{value: new THREE.Color('#b017ff')}
    },
    vertexShader: shader2.vertexShader,
    fragmentShader: shader2.fragmentShader
}