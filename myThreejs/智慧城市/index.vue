<!--  -->
<template>
 <div class="app-container">
     <div class="left_box">
         <div class="shouhui" @click="shouhui">收回</div>
         <div class="borderbox">
             
         </div>
         <div class="boxNum">
             <div v-for="(item,index) in 16" :key="index+100" @click="btnclick(index)">{{index + 1}}</div>
         </div>
         <!-- <div class="build">
             <div class="bulid_box" v-for="i in num" :key="i.addrId">
                <div class="top">
                    <span>A相线温温度：{{i.atem == "数据异常" ? i.atem : i.atem + '°C'}}</span>
                    <span class="font">{{i.addrName}}</span>
                </div>
                <div class="top">
                    <span>B相线温温度：{{i.btem == "数据异常" ? i.btem : i.btem + '°C'}}</span>
                    <span>C相线温温度：{{i.ctem == "数据异常" ? i.ctem : i.ctem + '°C'}}</span>
                </div>
            </div>
         </div>
         <div class="right_build">
             <div class="bulid_box" v-for="i in number" :key="i.addrId">
                <div class="top">
                    <span class="font">{{i.addrName}}</span>
                    <span>A相线温温度：{{i.atem == "数据异常" ? i.atem : i.atem + '°C'}}</span>
                </div>
                <div class="top">
                    <span>B相线温温度：{{i.btem == "数据异常" ? i.btem : i.btem + '°C'}}</span>
                    <span>C相线温温度：{{i.ctem == "数据异常" ? i.ctem : i.ctem + '°C'}}</span>
                </div>
            </div>
         </div> -->
     </div>
     <div class="temp">
        <tempalarm></tempalarm>
     </div>
     <div class="volalarm">
         <volalarm></volalarm>
     </div>
     <div class="calendar">
         <calendar></calendar>
     </div>
 </div>
</template>

<script>
import {getlineTemp} from "@/api/kst/limitAlarm/situation"
import Tempalarm from "./tempalarm.vue"
import Volalarm from './volalarm.vue'
import Calendar from './calendar.vue'
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import TWEEN from "@tweenjs/tween.js";


export default {
 components:{
    Tempalarm,
    Volalarm,
    Calendar
 },
 data () {
  return {
    num:[],
    number:[],
  }
 },
 created(){
     this.getList()
     
 },
 async mounted(){
    this.camera = '';
    this.renderer = '';
    this.scene = '';
    this.model = "";
    //效果组合器
    this.compose = "";
    //场景通道
    this.rendererPass= "";
    //辉光效果
    this.bloompass = "";
    this.gap  = '';
    //射线点击子元素
    this.rayCasterArray= [];
    this.outlineObject= [];
    this.rafId = '';
    this.mouse = {
        x:'',
        y:'',
    },

    window.addEventListener("click", this.raycalsterClick,false);

    this.init();
    await this.loadModel();
    this.rayCastArrayPush();
    this.processing();
    this.animate();
    this.resize();
    this.rayCaster();
 },
 
  destroyed() {
      window.removeEventListener('click',this.raycalsterClick,false)
      cancelAnimationFrame(this.rafId);
    this.scene.traverse((item) => {
      if (item.geometry && item.geometry != null) {
        item.geometry.dispose();
        item.geometry = {};
      } else if (item.material && item.material != null) {
        item.material.dispose();
        item.material = {};
        item = null;
      }
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.rayCasterArray = [];
    });
  },
 methods:{
     //右侧滚轮按钮点击事件
     btnclick(index){
        this.outlineObject.pop();
        let name = index;
         this.model.children.forEach(item =>{
            if(item.type == 'Group' && Number(item.name) == name){
                let tween = new TWEEN.Tween(item.position);
                tween.to({y:3},500);
                tween.start()
            }
            if(item.type == 'Group' && Number(item.name) > name){
                let tween = new TWEEN.Tween(item.position);
                tween.to({y:5},500);
                tween.start()
            }
            if(item.name != name && item.name-0 < name-0){
                let tween2 = new TWEEN.Tween(item.position);
                tween2.to({y:0 },500);
                tween2.start()
            }
            if(item.type == 'Group' && item.position.z >0 && item.name != name){
                  let tween2 = new TWEEN.Tween(item.position);
                    tween2.to({z:0 },500);
                    tween2.start()
              }
        })
        let a = this.model.children.find(item=>{
            return item.name == name
        })
        this.outlineObject.push(a);


        let tween1 = new TWEEN.Tween(a.position);
            tween1.to({z:5},500);
            tween1.start()
        document.querySelector('.boxNum').style.transform = `translateY(-${name * 30}px)`

     },
     //左侧按钮收回事件
     shouhui(){
         this.model.children.forEach(item =>{
             let tween = new TWEEN.Tween(item.position)
             tween.to({y:0,z:0},500)
             tween.start();
         })
     },
     init(){
      // 初始化场景
      this.scene = new THREE.Scene();
      
      
      // 灯光
      let ambientLight = new THREE.AmbientLight(0x666666);


      let lig = new THREE.AmbientLight(0x212121);

      //获取距离
      this.gap = document.querySelector('.left_box').getBoundingClientRect();

      //平行光
      let dlight = new THREE.DirectionalLight(0xffffff, 1);
      dlight.position.set(0, 200, 200.5);
      //背后平行光
      let dlight2 = new THREE.DirectionalLight(0xffffff, 1);
      dlight2.position.set(0, 200, -400.5);

      this.scene.add(dlight, dlight2);

      this.scene.add(ambientLight, lig);

       

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.domElement.setAttribute("class", "three");
      document.querySelector('.left_box').appendChild(this.renderer.domElement);
      let three = document.querySelector('.three');
      three.style.position = 'absolute';
      three.style.top = 0 + 'px';
      three.style.left = 0 + 'px';
      this.renderer.setSize(
        document.querySelector('.left_box').clientWidth + 20,
        document.querySelector('.left_box').clientHeight + 40
      );
      this.renderer.setClearColor(0x011847, 1);
      this.renderer.autoClear = false;

      this.camera = new THREE.PerspectiveCamera(
        80,
        (document.querySelector('.left_box').clientWidth + 20) / (document.querySelector('.left_box').clientHeight + 40),
        0.1,
        40000
      );

        //  this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      this.camera.position.set(0, 100, 300);
      this.camera.lookAt(-30,-150,0)


      // this.camera.position.set(0, -50, 300);
      // this.camera.lookAt(50,-200,0)

      const size = 5000;
      const divisions = 35;

      const gridHelper = new THREE.GridHelper( size, divisions );
      gridHelper.position.y = -25
      gridHelper.layers.set(1);
      gridHelper.material = new THREE.MeshPhongMaterial({
        color:0x011847
      })
      this.scene.add( gridHelper );

     },
      rayCastArrayPush() {
      this.model.children.forEach((item) => {
        if (item.type == "Group") {
          item.name = Number(item.name) - 1;
          item.children.forEach((item2) => {
            this.rayCasterArray.push(item2);
          });
        }
      });
    },
     loadModel(){
      return new Promise((res) => {

          //加载被压缩过的gltf  ./three/js/libs/draco/gltf/  需要从threejs复制到public目录
        const loader = new GLTFLoader();
        let dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("./three/js/libs/draco/gltf/");
        loader.setDRACOLoader(dracoLoader);


        //加载贴图
        new THREE.TextureLoader().load("./tietu3.jpg", (texture) => {
          //加载城市
          loader.load("./city.gltf", (gltf) => {
            gltf.scene.traverse((e) => {
              if (e.type == "Mesh") {
                e.material = new THREE.MeshPhongMaterial({
                  map: texture,
                  shininess: 12,
                });
              }
            });
            gltf.scene.name = "城市";
            gltf.scene.scale.set(5, 4, 5);
            gltf.scene.position.set(-550, -550, -800);
            gltf.scene.rotation.y = -Math.PI/22;


            let city2 = gltf.scene.clone();
            city2.position.set(-550, -550, -1600);
            this.scene.add(city2);

            let city3 = gltf.scene.clone();
            city3.position.set(1000, -550, -1600);
            this.scene.add(city3);

            let city4 = gltf.scene.clone();
            city4.position.set(1000, -550, -800);
            this.scene.add(city4);

            let city5 = gltf.scene.clone();
            city5.position.set(200, -550, -800);
            this.scene.add(city5);

            let city6 = gltf.scene.clone();
            city6.position.set(-1250, -550, -1000);
            this.scene.add(city6);

            let city7 = gltf.scene.clone();
            city7.position.set(2000, -550, -1500);
            this.scene.add(city7);

            let city8 = gltf.scene.clone();
            city8.position.set(1000, -550, -300);
            this.scene.add(city8);

            let city9 = gltf.scene.clone();
            city9.position.set(-1200, -550, -300);
            this.scene.add(city9);

            let city10 = gltf.scene.clone();
            city10.position.set(1000, -550, -300);
            this.scene.add(city10);
            
            if(this.scene){
              this.scene.add(gltf.scene);
            }
          })
        })
          // 加载市政府
        loader.load("./概括市政府2.gltf", (gltf) => {
          this.model = gltf.scene;
          gltf.scene.name = "楼";
          console.log(this.model);
          gltf.scene.scale.set(14, 14, 14);
          gltf.scene.position.y = -550;
          gltf.scene.position.x = -150;

          if(!this.scene){
            this.scene = new THREE.Scene();
          }

          this.scene.add(gltf.scene);
          res();
        });
      })
     },
     animate() {
      this.rafId = requestAnimationFrame(this.animate);
      TWEEN.update();
      this.renderer.clear();
      // this.controls.update();
      this.compose.render();
      this.renderer.render(this.scene, this.camera);
    },
     processing() {
      //后期处理通道
      this.compose = new EffectComposer(this.renderer);
      this.rendererPass = new RenderPass(this.scene, this.camera);
      this.compose.addPass(this.rendererPass);

      //辉光效果
      this.bloompass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.4,
        0,
        0.4
      );
      this.compose.addPass(this.bloompass);

       //边缘线
      this.outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        this.scene,
        this.camera
      );
      this.outlinePass.visibleEdgeColor.set(0x220085);
      this.outlinePass.hiddenEdgeColor.set(0x220085);
      this.outlinePass.edgeStrength = 30;
      this.outlinePass.pulsePeriod = 4;
      this.outlinePass.edgeGlow = 0.5;
      this.compose.addPass(this.outlinePass);

      //FXAA抗锯齿
      let fxaa = new ShaderPass(FXAAShader);
      fxaa.uniforms["resolution"].value.set(
        1 / window.innerWidth,
        1 / window.innerHeight
      );
      fxaa.renderToScreen = true;
      this.compose.addPass(fxaa);
    },
    rayCaster() {
      //默认选中第九层楼
      this.outlineObject.pop();  
      let defaultClick = this.rayCasterArray.find(item =>{
        return item.name == '平面009_1'
      })

      if(defaultClick.parent){
        this.outlineObject.push(defaultClick.parent);
        this.outlinePass.selectedObjects = this.outlineObject;

        //设置z轴动画
        let tween1 = new TWEEN.Tween(defaultClick.parent.position);
            tween1.to({z:5},500);
            tween1.start()

        this.model.children.forEach(item =>{
            if( Number(item.name) == 8){
                let tween = new TWEEN.Tween(item.position);
                tween.to({y:3},500);
                tween.start()
            }
            if(Number(item.name) > 8){
                let tween = new TWEEN.Tween(item.position);
                tween.to({y:5},500);
                tween.start()
            }
        })
      }
    },
    raycalsterClick(e){
         
        let three = document.querySelector(".three");

        this.mouse.x =
          ((e.clientX - this.gap.left) / three.clientWidth) * 2 - 1;
        this.mouse.y =
          -((e.clientY - (this.gap.top - 20)) / three.clientHeight) * 2 + 1;
    
        let raycaster = new THREE.Raycaster();
        if (!this.camera) {
          this.camera = new THREE.OrthographicCamera(
            80,
            window.innerWidth / window.innerHeight,
            0.1,
            40000
          );
        }
        raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = raycaster.intersectObjects(this.rayCasterArray);

        if (intersects.length > 0) {
          this.outlineObject.pop();     
          let intersected = intersects[0].object;
          this.outlineObject.push(intersected.parent);

        let name = intersected.parent.name;

        let num = document.querySelector('.boxNum');
        num.style.transform = `translateY(-${name * 30}px)`

        //遍历模型对象
        this.model.children.forEach(item =>{
            // 遍历查找当前点击的模型  并把当前的模型Y轴设定为3
            if( Number(item.name) == Number(name)){
                // item.position.y = 3
                let tween = new TWEEN.Tween(item.position);
                tween.to({y:3},500);
                tween.start()
            }

            // 遍历查找当楼层高于当前点击的模型  并把大于点击楼层的模型Y轴设定为5  使其空出
            if( Number(item.name) > Number(name)){
                // item.position.y = 5
                let tween = new TWEEN.Tween(item.position);
                tween.to({y:5},500);
                tween.start()
            }
        })
        //设置z轴动画
        let tween1 = new TWEEN.Tween(intersected.parent.position);
            tween1.to({z:5},500);
            tween1.start()


        //遍历模型
          this.model.children.forEach(item =>{
              //判断Z轴是否大于0  大于0收缩 （排他思想）
              if( item.position.z >0 && item.name != name){
                  let tween2 = new TWEEN.Tween(item.position);
                    tween2.to({z:0 },500);
                    tween2.start()
              }
              //遍历判断当前遍历姓名不等于点击的模型name  并且楼层小于点击楼层的时候 让Y轴归零
              if(item.name != name && item.name-0 < name-0){
                let tween2 = new TWEEN.Tween(item.position);
                tween2.to({y:0 },500);
                tween2.start()
              }
          })
          this.outlinePass.selectedObjects = this.outlineObject;
          this.clickNum = this.outlineObject[0].name;
        }
    },
    resize() {
      window.addEventListener("resize", () => {
        let three = document.querySelector('.left_box');
        if(this.renderer){
          this.renderer.setSize(
            (document.querySelector('.left_box').clientWidth + 20),
            document.querySelector('.left_box').clientHeight + 40
          );
        } 
        if(this.camera){
            this.camera.aspect = (document.querySelector('.left_box').clientWidth+20)/(document.querySelector('.left_box').clientHeight + 40);
            this.camera.left = three.offsetWidth / -2;
            this.camera.trimRight = three.offsetWidth / 2;
            this.camera.top = three.offsetHeight / 2;
            this.camera.bottom = three.offsetWidth / -2;
            this.camera.updateProjectionMatrix();
        }      
      });
    },
     getList(){
         getlineTemp().then(res =>{
             res.data.map((item,i) =>{
                if(i % 2 == 0){
                    this.number.unshift(item)
                }else{
                    this.num.unshift(item)
                }
             })
         })
     }

 },
watch: {
    "$store.state.app.sidebar.opened": function() {
      setTimeout(() => {
          this.gap = document.querySelector('.left_box').getBoundingClientRect();
          this.renderer.setSize(
           document.querySelector('.left_box').clientWidth + 20,
            document.querySelector('.left_box').clientHeight + 40
          );
      }, 300);
    }
}
}

</script>

<style lang='scss' scoped>
.app-container{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    background: url("../../../../assets/image/situation.png") no-repeat;
    background-size: 100% 100%;
    .left_box{
        width: 68%;
        height: 100%;
        float: left;
        .build{
            width: 30%;
            height: 100%;
            position: relative;
            .bulid_box{
                width: 88%;
                height: 6.5%;
                position: relative;
                top: 4.5%;
                left: 6.5%;
                display: flex;
                flex-direction: column;
                color: #fff;
                font-size: 14px;
                justify-content: space-between;
                margin-bottom: 12.2%;

                .top{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .right_build{
            width: 30%;
            height: 100%;
            position: relative;
            left: 69%;
            top: -100%;
            .bulid_box{
                width: 88%;
                height: 6.5%;
                position: relative;
                top: 8.5%;
                left: 6%;
                display: flex;
                flex-direction: column;
                color: #fff;
                font-size: 14px;
                justify-content: space-between;
                margin-bottom: 12.5%;

                .top{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .font{
            color: #ffae01;
        }
    }
    .temp{
        width: 31.5%;
        height: 19.5%;
        position: relative;
        float: right;
    }
    .volalarm{
        width: 31.5%;
        height: 19.5%;
        position: relative;
        float: right;
        top: 3.5%;
    }
    .calendar{
        width: 31.5%;
        height: 52.5%;
        position: relative;
        float: right;
        top: 7.5%;
    }
}
@media screen and (min-height: 990px){
    .app-container{
    .left_box{
        .build{
            .bulid_box{
                margin-bottom: 14.2%;
            }
        }
        .right_build{
            .bulid_box{
                margin-bottom: 14.5%;
            }
        }
    }
}
}
.borderbox{
    width: 30px;
    height: 30px;
    position: absolute;
    right: 35%;
    top:50%;
    transform: translateY(-50%);
    border: 1px solid white;
    z-index: 10;
}
.boxNum{
    width: 30px;
    position: absolute;
    line-height: 30px;
    right: 35%;
    z-index: 11;
    top: 50%;
    color: white;
    margin-top: -15px;
    transform: translateY(-240px);
    transition: all 0.5s;
}
.boxNum>div{
    height: 30px;
    width: 30px;
    cursor: pointer;
    text-align: center;
    user-select: none;
}
.shouhui{
    color: white;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    cursor: pointer;
}
</style>
