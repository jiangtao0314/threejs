<template>
  <div style="overflow: hidden">
    <div class="three" ref="three">
      <div class="banner">
        山西运城能耗监测平台
      </div>
      <div class="leftBox">
        <div class="topBox">
          <div class="title">
            <div class="titleFont">用电情况/<span class="smallFont">kW·h</span></div>
          </div>

          <div class="cable">
              <img src="~@/assets/three/cable.png" alt="" class="cableImg">
              <div class="getCable">
                <div>
                  <span class="cableIcon"></span> <span class="tit">当前用电量</span><br>
                  <span class="cableData">{{this.allCable.todayValue}}<span class="smallFont">kW·h</span></span>
                </div>
                <div>
                  <span class="cableIcon"></span> <span class="tit">昨日用电量</span><br>
                  <span class="cableData">{{this.allCable.yesterdayValue}}<span class="smallFont">kW·h</span></span>

                </div>
                <div>
                  <span class="cableIcon"></span> <span class="tit">本月用电量</span><br>
                  <span class="cableData">{{this.allCable.monthValue}}<span class="smallFont">kW·h</span></span>

                </div>
                <div>
                  <span class="cableIcon"></span> <span class="tit">本年用电量</span><br>
                  <span class="cableData">{{this.allCable.yearValue}}<span class="smallFont">kW·h</span></span> 
                </div>
              </div>
          </div>

        </div>
        <div class="centerBox">
        <div class="prient">
          <div class="title leftCentertitle">
            <div class="titleFont">设备状态/<span class="smallFont">台</span></div>
          </div>
            
            <div class="allPrient">
              <div class="prientAllFont">设备总数</div>
              <span class="allPrientData">{{this.prient.allPrient}}</span>
            </div>

  
              <div class="linePrient">
                <div class="linePrientData">
                  <span>在线设备</span>
                  <span>{{this.prient.linePrient}}</span>
                </div>
                <div class="linePrientBar">
                  <div class="allPrientColor">
                    <div class="linePrientColor" :style="{width:this.prient.linePrientPosition+'%'}"></div>
                    <div class="linePrientDot" :style="{left:this.prient.linePrientPosition+'%'}"></div>
                  </div>
                </div>
              </div>
              <div class="outLinePrient">
                <div class="outLinePrientData">
                  <span>离线设备</span>
                  <span>{{this.prient.unLinePrient}}</span>
                </div>
                <div class="outLinePrientBar">
                    <div class="allPrientColor">
                      <div class="outLinePrientColor" :style="{width:this.prient.unLinePrientPoistion+'%'}"></div>
                      <div class="outLinePrientDot" :style="{left:this.prient.unLinePrientPoistion+'%'}"></div>
                    </div>
                </div>
              </div>

          </div>
        </div>


        <div class="bottomBox">
          <div class="title leftBottomtitle">
            <div class="titleFont">线温报警状况</div>
          </div>
            <div class="toHot">
              <img src="~@/assets/three/tohot.png" alt="">
              <div class="toHotData">{{this.temp.over}}</div>
              <div class="toHotFont">过热报警总次数(次)</div>
            </div>
            <div class="toBar">
              <img src="~@/assets/three/tobar.png" alt="">
              <div class="toBarData">{{this.temp.overLoad}}</div>
              <div class="toBarFont">过载报警总次数(次)</div>
            </div>
        </div>
      </div>


      <div :class="[isShowDataBox?'rightBox':'displayRightBox']">
        <div class="rightTopBox">
          <div class="title">
            <div class="titleFont"><span class="strongF">{{this.clickNum + 1}}F </span>用电情况/<span class="smallFont">kW·h</span></div>
          </div>
            <div class="rightGetCable">
              <div>
                  <span class="cableIcon"></span> <span class="tit">当前用电量</span><br>
                  <span class="cableData">{{this.partCable.todayValue}}<span class="smallFont">kW·h</span></span>
              </div>
              <div>
                  <span class="cableIcon"></span> <span class="tit">昨日用电量</span><br>
                  <span class="cableData">{{this.partCable.yesterdayValue}}<span class="smallFont">kW·h</span></span>

              </div>
              <div>
                  <span class="cableIcon"></span> <span class="tit">本月用电量</span><br>
                  <span class="cableData">{{this.partCable.monthValue}}<span class="smallFont">kW·h</span></span>

              </div>
              <div>
                  <span class="cableIcon"></span> <span class="tit">本年用电量</span><br>
                  <span class="cableData">{{this.partCable.yearValue}}<span class="smallFont">kW·h</span></span>

              </div>
            </div>
        </div>
        <div class="rightCenterBox">
          <div class="title">
            <div class="titleFont"> <span class="strongF">{{this.clickNum + 1}}F </span>设备状态/<span class="smallFont">台</span></div>
          </div>

          <div class="rightBoxLine">

          <div class="linePrient rightLine">
                <div class="linePrientData">
                  <span>在线设备</span>
                  <span>{{this.partPrient.linePrient}}</span>
                </div>
                <div class="linePrientBar">
                  <div class="allPrientColor">
                    <div class="linePrientColor" :style="{width:this.partPrient.linePrientPosition+'%'}"></div>
                    <div class="linePrientDot" :style="{left:this.partPrient.linePrientPosition+'%'}"></div>
                  </div>
                </div>
            </div>

            <div class="outLinePrient rightLine">
                <div class="outLinePrientData">
                  <span>离线设备</span>
                  <span>{{this.partPrient.unLinePrient}}</span>
                </div>
                <div class="outLinePrientBar">
                    <div class="allPrientColor">
                      <div class="outLinePrientColor" :style="{width:this.partPrient.unLinePrientPoistion+'%'}"></div>
                      <div class="outLinePrientDot" :style="{left:this.partPrient.unLinePrientPoistion+'%'}"></div>
                    </div>
                </div>
              </div>
          
          </div>

        </div>
        <div class="rightBottomBox">
          <div class="title">
            <div class="titleFont"><span class="strongF">{{this.clickNum + 1}}F </span>线温报警状况</div>
          </div>

          <div class="rightToHot">
            <div>{{this.partTemp.over}}</div>
            <img src="~@/assets/three/rightToHot.png" alt="">
            <span>过热报警总次数(次)</span>
          </div>
          <div class="rightToBar">
            <div class="rightToBarData">{{this.partTemp.overLoad}}</div>
            <img src="~@/assets/three/rightToBar.png" alt="">
            <span >过载报警总次数(次)</span>
          </div>
        </div>
      </div>




      <svg-icon
        :icon-class="$store.state.home.full ? 'bigno' : 'bigok'"
        :class="{ isbig: $store.state.home.full }"
        class="istogglebig"
        @click="bigs(false)"
      ></svg-icon>
    </div>
  </div>
</template>
	
	<script>
// 全屏子组件引入
import air from "./indexCell/air.vue";
import ele from "./indexCell/ele.vue";
import water from "./indexCell/water.vue";
import smoke from "./indexCell/smoke.vue";
import patrol from "./indexCell/patrol.vue";
// 引入全屏组件
import screenfull from "screenfull";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
//后期处理通道
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
//tweenjs
import TWEEN from "@tweenjs/tween.js";
import {getAllPrient,getCable,getID,getNum} from '@/api/index.js'

export default {
  name: "Index",
  components: { air, ele, water, smoke, patrol },
  data() {
    return {
      //相机
      camera:"",
      //当前点击哪个楼层
      clickNum:0,
      // 传参集合
      paramsData:{
        addrId:'1',
        devType:'1',
      },
      // 是否显示右侧盒子
      isShowDataBox:true,
      // 全部设备状态
      prient:{
        linePrient:'',
        unLinePrient:'',
        allPrient:'',
        linePrientPosition:'',
        unLinePrientPoistion:'',
      },
      //局部设备状态
      partPrient:{
        linePrient:'',
        unLinePrient:'',
        allPrient:'',
        linePrientPosition:'',
        unLinePrientPoistion:'',
      },
      //全局用电状态
      allCable:{
        monthValue: 0,
        todayValue: 0,
        yearValue: 0,
        yesterdayValue: 0,
      },
      //局部用电状态
      partCable:{
        monthValue: 0,
        todayValue: 0,
        yearValue: 0,
        yesterdayValue: 0,
      },
      //全局温度报警
      temp:{
        over:0,
        overLoad:0,
      },
      //局部温度报警
      partTemp:{
        over:0,
        overLoad:0,
      },
      addrId:[],
    };
  },

  created() {
    // this.$store.dispatch("global/getTime");
    this.$nextTick(() => {
      this.$store.state.home.getDataNum++;
    });
    window.onresize = () => {
      if (this.$store.state.home.full && window.innerHeight < 1000) {
        this.bigs();
      }
    };
    this.getDicts("static_data").then(res => {
        this.paramsData.addrId = res.data[0].dictValue
        this.getData();
      });
  },
  async mounted() {
     //当前激活的charts数据
      this.spriteMap= [],
      
      //echarts配置
      this.chartsOption= {},
      //抗锯齿
      this.fxaa= {},
      //射线点击子元素
      this.rayCasterArray= [],
      //模型是否加载
      this.loading= true,
      
      //场景
      this.scene= "",
      //精灵集合
      this.spriteArray= [],
      //渲染器
      this.renderer= [],
      //环境光
      this.ambientLight= "",
      //控制器
      this.controls= "",
      //政府大楼模型
      this.model= "",
      //效果组合器
      this.compose= "",
      //场景通道
      this.rendererPass= "",
      //鼠标选中
      this.mouse= {},
      //边缘线
      this.outlinePass= "",
      //边缘线集合
      this.outlineObject= [],
      //辉光效果
      this.bloompass="",
      //道路效果
      this.roadtexTure= [],
      //扩散效果
      this.s= 0,
      this.p= 1,
      this.lightMesh= "",
      //城市模型
      this.citycopy= "",
      this.shadercube= [],
      //requestAnimationFrame id
      this.rafId= null,
      //动态获取侧边栏和顶部距离
      this.gap= "",

    this.init();
    await this.loadModel();
    this.initLoad();
    this.addLight();
    this.processing();
    this.animate();
    this.rayCastArrayPush();
    this.resize();
    this.rayCaster();
  },
  destroyed() {
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
      this.spriteArray = [];
    });
  },
  methods: {
    // 全屏/取消全屏
    bigs() {
      if (this.$store.state.home.full) {
        if (document.exitFullscreen) {
          document
            .exitFullscreen()
            .then((res) => {
              console.log("已经全屏");
            })
            // 取消全屏
            .catch(() => {
              console.warn(
                "您通过不被期望的方法退出了全屏，请使用期望的方法退出全屏（点击右上角取消全屏按钮）"
              );
            });
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.$store.state.home.full = false;
      } else {
        // 全屏化
        let el = this.$refs.three;

        if (screenfull.enabled) {
          screenfull.request(el);
        }
        this.$store.state.home.full = true;
      }
      setTimeout(() => {
          this.gap = this.$refs.three.getBoundingClientRect();
          this.renderer.setSize(
            window.innerWidth - this.gap.left,
            window.innerHeight - this.gap.top
          );
      }, 300);
    },
    openBorder() {},
    //给模型添加layers层级
    addLayers(model) {
      model.traverse((e) => {
        if (e.type == "Mesh") {
          e.layers.set(1);
        }
      });
    },
    //画路
    initLoad() {
      let roadTexture1 = new THREE.TextureLoader().load("./road.png");
      roadTexture1.wrapS = roadTexture1.wrapT = THREE.RepeatWrapping;
      roadTexture1.repeat.set(1, 1);
      roadTexture1.needsUpdate = true;

      this.roadtexTure.push(roadTexture1);

      let material = new THREE.MeshBasicMaterial({
        map: roadTexture1,
        side: THREE.BackSide,
        transparent: true,
      });

      // 右侧环绕路
      let points1 = [
        new THREE.Vector3(980, -15, 2000),
        new THREE.Vector3(980, -15, -400),
        new THREE.Vector3(1600, -15, -600),
        new THREE.Vector3(1900, -15, -400),
        new THREE.Vector3(2000, -15, 2000),
      ];

      let points2 = [
        new THREE.Vector3(2050, -15, 2000),
        new THREE.Vector3(1950, -15, -450),
        new THREE.Vector3(1650, -15, -650),
        new THREE.Vector3(930, -15, -450),
        new THREE.Vector3(930, -15, 2000),
      ];

      //左侧十字路口
      let points3 = [
        new THREE.Vector3(-950, -15, 2000),
        new THREE.Vector3(-950, -15, -1800),
      ];
      let points4 = [
        new THREE.Vector3(-1000, -15, -1800),
        new THREE.Vector3(-1000, -15, 2000),
      ];
      let points5 = [
        new THREE.Vector3(-2000, -15, -740),
        new THREE.Vector3(2300, -15, -740),
      ];
      let points6 = [
        new THREE.Vector3(2300, -15, -790),
        new THREE.Vector3(-2000, -15, -790),
      ];

      //政府楼左侧弯路
      let points7 = [
        new THREE.Vector3(-938, -15, 300),
        new THREE.Vector3(-500, -15, 200),
        new THREE.Vector3(-500, -15, -100),
        new THREE.Vector3(-965, -15, -200),
      ];

      // 左侧城市道路
      let points8 = [
        new THREE.Vector3(-980, -15, 230),
        new THREE.Vector3(-1900, -15, 230),
      ];
      let points9 = [
        new THREE.Vector3(-1900, -15, 280),
        new THREE.Vector3(-980, -15, 280),
      ];

      // 右侧城市道路
      let points10 = [
        new THREE.Vector3(1600, -15, -1500),
        new THREE.Vector3(1600, -15, -790),
      ];
      let points11 = [
        new THREE.Vector3(1650, -15, -790),
        new THREE.Vector3(1650, -15, -1500),
      ];

      //左下角道路
      let points12 = [
        new THREE.Vector3(-910, -15, 1100),
        new THREE.Vector3(-1900, -15, 1100),
      ];
      let points13 = [
        new THREE.Vector3(-1900, -15, 1150),
        new THREE.Vector3(-910, -15, 1150),
      ];


      for(let i = 1;i<14;i++){
        let curver = new THREE.CatmullRomCurve3(eval("points" + i))
        let tubeGeometry = new THREE.TubeGeometry(curver, 20, 6);
        let mesh = new THREE.Mesh(tubeGeometry, material);
        if(i == 3||i == 4||i == 5||i == 6||i == 10||i == 11){
          mesh.rotation.y = Math.PI / 40;
        }
        mesh.layers.set(1);
        this.scene.add(mesh);
      }
    },
    //冲击波 
    addLight() {
      let geometry = new THREE.CylinderGeometry(350, 350, 10, 64);

      let texture = new THREE.TextureLoader().load("./or.png");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.needsUpdate = true;

      let materials = [
        new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
        }),
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        }),
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        }),
      ];

      this.lightMesh = new THREE.Mesh(geometry, materials);
      this.lightMesh.layers.set(1);
      this.scene.add(this.lightMesh);
    },
    processing() {
      //后期处理通道
      this.compose = new EffectComposer(this.renderer);
      this.rendererPass = new RenderPass(this.scene, this.camera);
      this.compose.addPass(this.rendererPass);
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

      //辉光效果
      this.bloompass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.4,
        0,
        0.4
      );
      this.compose.addPass(this.bloompass);

      //FXAA抗锯齿
      let fxaa = new ShaderPass(FXAAShader);
      fxaa.uniforms["resolution"].value.set(
        1 / window.innerWidth,
        1 / window.innerHeight
      );
      fxaa.renderToScreen = true;
      this.compose.addPass(fxaa);
    },

    //遍历group  命名 并添加raycaster点击对象到 rayCasterArray
    rayCastArrayPush() {
      this.model.children.forEach((item) => {
        if (item.type == "Group") {
          item.name = Number(item.name) - 1;
          item.children.forEach((item2) => {
            item2.layers.set(1);
            this.rayCasterArray.push(item2);
          });
        }
      });
    },
    //模型加载
    loadModel() {
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
            this.addLayers(gltf.scene);
            gltf.scene.position.set(800, 5, -1300);
            gltf.scene.rotation.y = -Math.PI/22
            if(this.scene){
              this.scene.add(gltf.scene);
            }

            //克隆城市（深拷贝）

            let city2 = gltf.scene.clone();
            city2.position.set(0, 5, -1250);
            this.addLayers(city2);
            this.scene.add(city2);

            let city3 = gltf.scene.clone();
            city3.position.set(-750, 5, -1250);
            this.addLayers(city3);
            this.scene.add(city3);

            let city4 = gltf.scene.clone();
            city4.position.set(1300, 5, -200);
            this.addLayers(city4);
            this.scene.add(city4);

            let city5 = gltf.scene.clone();
            city5.position.set(-1600, 5, -200);
            this.addLayers(city5);
            this.scene.add(city5);

            let city6 = gltf.scene.clone();
            city6.position.set(-1600, 5, -1100);
            this.addLayers(city6);
            this.scene.add(city6);

            let city7 = gltf.scene.clone();
            city7.position.set(1900, 5, -1250);
            city7.rotation.y = Math.PI / 2 - Math.PI/20;
            this.addLayers(city7);
            this.scene.add(city7);

            let city8 = gltf.scene.clone();
            city8.position.set(-1300, 5, 700);
            city8.rotation.y = Math.PI - 0.15;
            this.addLayers(city8);
            this.scene.add(city8);

            let city9 = gltf.scene.clone();
            city9.position.set(1500, 5, 600);
            city9.rotation.y = Math.PI - 0.15;
            this.addLayers(city9);
            this.scene.add(city9);

            let city10 = gltf.scene.clone();
            city10.position.set(1300, 5, 1200);
            city10.rotation.y = Math.PI * 2 - 0.15;
            this.addLayers(city10);
            this.scene.add(city10);

            let city11 = gltf.scene.clone();
            city11.position.set(-1400, 5, 1600);
            city11.rotation.y = Math.PI * 2 - 0.15;
            this.addLayers(city11);
            this.scene.add(city11);

            let city12 = gltf.scene.clone();
            city12.position.set(-300, 5, 1700);
            city12.rotation.y = Math.PI - 0.15;
            this.addLayers(city12);
            this.scene.add(city12);

            let city13 = gltf.scene.clone();
            city13.position.set(350, 5, 1650);
            city13.rotation.y = -Math.PI/20
            this.addLayers(city13);
            this.scene.add(city13);
          });


          //加载小城市
          loader.load('./city2.gltf',(gltf) =>{
            gltf.scene.traverse((e) => {
              if (e.type == "Mesh") {
                e.material = new THREE.MeshPhongMaterial({
                  map: texture,
                  shininess: 12,
                });
              }
            })
            gltf.scene.name = "小城市";
            gltf.scene.scale.set(5, 4, 5);
            this.addLayers(gltf.scene);
            gltf.scene.rotation.y = -Math.PI/20
            gltf.scene.position.set(-500, -15, 900);
            this.scene.add(gltf.scene);

            let smallCity2 = gltf.scene.clone();
            smallCity2.position.set(600, -15, 900)
            this.scene.add(smallCity2);

            let smallCity3 = gltf.scene.clone();
            smallCity3.position.set(1200, -15, 1750)
            smallCity3.rotation.y = Math.PI/2 - Math.PI/20
            this.scene.add(smallCity3);
          })


          //加载市政府周围楼房
          loader.load("./box.gltf", (gltf) => {
            gltf.scene.traverse((e) => {
              e.material = new THREE.MeshPhongMaterial({
                map: texture,
              });
            });
            gltf.scene.name = "周边楼";
            gltf.scene.scale.set(0.7, 0.7, 0.7);
            gltf.scene.position.y = -15;
            this.addLayers(gltf.scene);
            this.scene.add(gltf.scene);
          });
        });

        // 加载市政府
        loader.load("./szf-2.gltf", (gltf) => {
          this.model = gltf.scene;
          gltf.scene.name = "楼";
          gltf.scene.scale.set(15, 15, 15);
          gltf.scene.position.y = 15;
          gltf.scene.position.x = -215;
          gltf.scene.position.z = 120;

          gltf.scene.traverse((item) => {
            item.layers.set(1);
          });


          // 定时器 延迟tween动画执行时间
          setTimeout(() => {
            let scale = gltf.scene.scale;
            let position = gltf.scene.position;
            let tween = new TWEEN.Tween(scale);
            tween.to({ y: 15 }, 800);
            tween.start();

            let tween1 = new TWEEN.Tween(position);
            tween1.to({ y: 0 }, 800);
            tween1.start();
          }, 800);

          if(!this.scene){
            this.scene = new THREE.Scene();
          }

          this.scene.add(gltf.scene);
          res();
        });
      });
    },
    init() {
      // 初始化场景
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        40000
      );
      
      // 灯光
      this.ambientLight = new THREE.AmbientLight(0x666666);
      this.ambientLight.layers.enable(0);
      this.ambientLight.layers.enable(1);

      let lig = new THREE.AmbientLight(0x212121);
      lig.layers.set(1);

      //获取距离
      this.gap = this.$refs.three.getBoundingClientRect();

      //平行光
      let dlight = new THREE.DirectionalLight(0xffffff, 1);
      dlight.position.set(0, 200, 200.5);
      dlight.layers.set(1);

      //背后平行光
      let dlight2 = new THREE.DirectionalLight(0xffffff, 1);
      dlight2.position.set(0, 200, -400.5);
      dlight2.layers.set(1);

      this.scene.add(dlight, dlight2);

      this.scene.add(this.ambientLight, lig);

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.domElement.setAttribute("class", "three");
      this.$refs.three.appendChild(this.renderer.domElement);
      this.renderer.setSize(
        window.innerWidth - this.gap.left,
        window.innerHeight - this.gap.top
      );
      this.renderer.setClearColor(0x011847, 1);
      this.renderer.autoClear = false;

      const size = 5000;
      const divisions = 35;

      const gridHelper = new THREE.GridHelper( size, divisions );
      gridHelper.position.y = -25
      gridHelper.layers.set(1);
      gridHelper.material = new THREE.MeshPhongMaterial({
        color:0x011847
      })
      this.scene.add( gridHelper );

      this.camera.position.set(2500, 2000, -700);
      
      
        //轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.minDistance = 600;
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.8;
      this.controls.maxDistance = 2500;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.4;

      var tween = new TWEEN.Tween({
        x1: 2500,
        y1: 2000,
        z1: -700,
        x2: 0, 
        y2: 0, 
        z2: 0  
    });
    tween.to({
        x1: -200, 
        y1: 200,
        z1: 450, 
        x2: 0, 
        y2: 200, 
        z2: 0  
    },3000);
    tween.onUpdate((object)=>{
        this.camera.position.x = object.x1;
        this.camera.position.y = object.y1;
        this.camera.position.z = object.z1;
        this.controls.target.x = object.x2;
        this.controls.target.y = object.y2;
        this.controls.target.z = object.z2;
        this.controls.update();
    })
    tween.onComplete(()=>{
    })
    tween.onComplete(()=>{
        this.controls.enabled = true;
    })
    tween.easing(TWEEN.Easing.Quadratic.InOut);
    tween.start();

    
    },
    animate() {
      if (this.roadtexTure.length > 0) {
        this.roadtexTure.forEach((item) => {
          item.offset.x -= 0.01;
        });
      }
      this.rafId = requestAnimationFrame(this.animate);
      if(this.controls){
        this.controls.update();
      } 
      TWEEN.update();
      this.renderer.clear();
      this.camera.layers.set(1);
      this.compose.render();

      this.renderer.clearDepth();
      this.camera.layers.set(0);
      this.renderer.render(this.scene, this.camera);
      this.s += 0.01;
      this.p -= 0.003;
      if (this.s > 4) {
        this.s = 0;
        this.p = 1;
      }
      this.lightMesh.scale.set(1 + this.s, 3, 1 + this.s);
      this.lightMesh.material[0].opacity = this.p;
    },

    rayCaster() {
      //射线点击事件

      //默认选中第一层楼
      this.outlineObject.pop();
      let three = document.querySelector(".three");
      
      let defaultClick = this.rayCasterArray.find(item =>{
        return item.name == '平面001_1'
      })

      if(defaultClick.parent){
        this.outlineObject.push(defaultClick.parent);
        this.outlinePass.selectedObjects = this.outlineObject;
      }

      window.addEventListener("click", (e) => {
        this.mouse.x =
          ((e.clientX - this.gap.left) / three.clientWidth) * 2 - 1;
        this.mouse.y =
          -((e.clientY - this.gap.top) / three.clientHeight) * 2 + 1;

        let raycaster = new THREE.Raycaster();
        raycaster.layers.set(1);
        if (!this.camera) {
          this.camera = new THREE.OrthographicCamera(
            80,
            window.innerWidth / window.innerHeight,
            0.1,
            40000
          );
          // this.camera.position.set(0, 250, 700);
        }
        raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = raycaster.intersectObjects(this.rayCasterArray);

        if (intersects.length > 0) {
          this.outlineObject.pop();
          
          let intersected = intersects[0].object;

          this.outlineObject.push(intersected.parent);
          this.outlinePass.selectedObjects = this.outlineObject;
          this.clickNum = this.outlineObject[0].name;

          this.spriteArray.forEach((item) => {
            item.visible = false;
          });

          if(this.paramsData.addrId != this.addrId[this.clickNum]){
            this.paramsData.addrId = this.addrId[this.clickNum];
            this.isShowDataBox = false;
            this.getPartData()
          }
        }
      });
    },
    //窗口变更适配
    resize() {
      window.addEventListener("resize", () => {
        let three = document.querySelector(".three");
        if(this.renderer){
          this.renderer.setSize(
          window.innerWidth - this.gap.left,
          window.innerHeight - this.gap.top
          );
        } 
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.left = three.offsetWidth / -2;
        this.camera.trimRight = three.offsetWidth / 2;
        this.camera.top = three.offsetHeight / 2;
        this.camera.bottom = three.offsetWidth / -2;
        this.camera.updateProjectionMatrix();
      });
    },
    //------------------------------------------------------------------------------------------------------------
    //非threejs部分
    getData(){
      //获取所有设备
      getAllPrient(this.paramsData).then((res)=>{
        this.prient.linePrient = res.data.onLine;
        this.prient.unLinePrient = res.data.offLine;
        this.prient.allPrient = Number(res.data.onLine) + Number(res.data.offLine);
        this.prient.linePrientPosition = this.prient.linePrient / this.prient.allPrient * 100;
        this.prient.unLinePrientPoistion =  this.prient.unLinePrient / this.prient.allPrient * 100;
      });
      console.log(this.paramsData);
      getCable(this.paramsData).then((res) =>{
        console.log(res);
        this.allCable = res.data;
      });
      getNum(this.paramsData).then(res=>{
        this.temp = res.data
      })
      getID().then((res)=>{
        this.addrId = res.data;
        this.paramsData.addrId = res.data[0] + ''
        this.getPartData();
      })
    },

    //局部楼层数据
    async getPartData(){
      let res = await getAllPrient(this.paramsData);
      this.partPrient.linePrient = res.data.onLine;
      this.partPrient.unLinePrient = res.data.offLine;
      this.partPrient.allPrient = Number(res.data.onLine) + Number(res.data.offLine);
      this.partPrient.linePrientPosition = this.partPrient.linePrient / this.partPrient.allPrient * 100;
      this.partPrient.unLinePrientPoistion =  this.partPrient.unLinePrient / this.partPrient.allPrient * 100;
      
      this.paramsData.addrId += '';
      let temp = await getNum(this.paramsData)
      if(temp.data){
        this.partTemp = temp.data
      }else{
        this.partTemp = {
          over:0,
          overLoad:0,
        }
      }

      let a = await getCable(this.paramsData);
      this.partCable = a.data;
      this.isShowDataBox = true
    }
   

  },
// threejs在vue中销毁会继续占用内存 需手动销毁
  
  //监听全屏事件
    watch: {
    "$store.state.app.sidebar.opened": function() {
      setTimeout(() => {
          this.gap = this.$refs.three.getBoundingClientRect();
          this.renderer.setSize(
            window.innerWidth - this.gap.left,
            window.innerHeight - this.gap.top
          );
      }, 300);
    }
  }
};
</script>
	
	<style lang="scss" scoped>
.dashboard-editor-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/image/big/big-bac.png") no-repeat;
  background-size: 100% 100%;
  overflow: auto;

  --transtiontime: all 0.5s;
  --wid1: calc((100% - var(--mar) * 3) / 2);
  --wid2: calc((100% - var(--wid1) - var(--mar) * 4) / 2);
  --mar: 1%;
}
.air,
.ele,
.water,
.smoke,
.patrol {
  position: absolute;
  height: 45%; // top占8%， bottom占2%
}
.air,
.ele {
  width: var(--wid1);
  top: 7%;
}
.air {
  left: var(--mar);
}
.ele {
  right: var(--mar);
}
.water,
.smoke,
.patrol {
  width: var(--wid2);
  top: 53%;
}
.water {
  width: var(--wid1);
  left: var(--mar);
}
.smoke {
  left: calc(var(--mar) * 2 + var(--wid1));
}
.patrol {
  right: var(--mar);
}
/deep/ .app-container {
  &.border1 {
    background: url("../assets/image/big/border1.png") no-repeat;
    background-size: 100% 100%;
    .app-container-tip {
      left: 9.2%;
    }
  }
  &.border2 {
    background: url("../assets/image/big/border2.png") no-repeat;
    background-size: 100% 100%;
    .app-container-tip {
      left: 19.5%;
    }
  }

  .app-container-tip {
    color: #55e8ff;
    position: absolute;
    top: 4px;
    font-size: 13px;
    transform: translateX(-50%);
    transition: var(--transtiontime);
  }

  &.full {
    .app-container-tip {
      font-size: 16px;
      top: 5px;
    }
  }
}

.big-tit {
  height: 6%;
  text-align: center;

  &::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }

  h3 {
    display: inline-block;
    font-size: 1.3rem;
    background-image: linear-gradient(to top, #fff, #fff, #07d4f4);
    -webkit-background-clip: text;
    color: transparent;
    margin: 0;
    vertical-align: middle;
    letter-spacing: 2px;
    transition: var(--transtiontime);

    &.isfull {
      font-size: 1.4rem;
    }
  }
  .tip-time {
    color: #fff;
    position: absolute;
    top: 0.7vh;
    right: 20%;
    transform: translateX(50%);
  }
}

// 全屏按钮
.istogglebig {
  color: #fff;
  position: absolute;
  top: 10px;
  right: 5px;
  font-size: 25px;
  cursor: pointer;
}
.three {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}
.rightBox{
  position: absolute;
  background-image: url('~@/assets/three/rightBorder.png');
  background-size: 100% 100%;
  color: #fff;
  width: 26%;
  right: 10px;
  top:72px;
  bottom: 10px;
  transition: all 0.5s !important;
  user-select:none
}
.leftBox{
  color: #fff;
  position: absolute;
  width: 26%;
  left: 10px;
  top:72px;
  bottom: 10px;
  user-select:none
}
.displayRightBox{
  position: absolute;
  width: 26%;
  background-image: url('~@/assets/three/rightBorder.png');
  background-size: 100% 100%;
  color: #fff;
  width: 26%;
  right: 10px;
  top:72px;
  bottom: 10px;
  user-select:none;
  transform: translateX(130%);
}
.banner{
  position: absolute;
  top:0;
  background-image: url('~@/assets/three/顶部.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 72px;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  line-height: 3vw;
  font-size: 1.3vw;
  letter-spacing:9px;
  user-select:none;
}
.topBox,.centerBox,.bottomBox{
  width: 100%;
  background-image: url('~@/assets/three/背景.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 2%;
  position: relative;
}
.topBox,.centerBox{
  height: 29.1%;
}
.centerBox{
  overflow: hidden;
  margin-top: 2%;
}
.allPrientData{
  display: inline-block;
  position: relative;
  bottom: 15px;
}
.bottomBox{
  height: 37.7%;
}
.title{
  background-image: url('~@/assets/three/title.png');
  background-size: 100% 80%;
  background-repeat: no-repeat;
  background-position-y: 4px;
  color: #00ffff;
  position:relative;
  left: 20px;
  top: 20px;
  font-size: 14px;
  padding: 0 0 6px 30px;
  margin: 0;
  display: inline-block;
}
.titleFont{
  display: inline-block;
}
.cableImg{
  margin-top: 13.5%;
  margin-left:20px;
  width: 26%;
}
.getCable{
  position: absolute;
  top: 25%;
  left: 35%;
}
.getCable>div{
  display: inline-block;
  width: 50%;
  height:20%;
}
.smallFont{
  font-size: 9px;
}
.cableIcon{
  vertical-align: middle;
  display: inline-block;
  height: 15px;
  width: 3px;
  background-image: linear-gradient(#ff946a,#ff3333);
}
.tit{
  font-size: 12px;
  padding-left: 5px;
}
.cableData{
  display: inline-block;
  font-size: 21px;
  padding: 15% 0 12% 0%;
}
.prient{
  width: 100%;
  height: 100%;
  position: relative;
}
.allPrient{
  height: 45%;
  width: 200px;
  background: url('~@/assets/three/prient.png') no-repeat;
  margin-top: 22%;
  margin-left: 3%;
  text-align: center;
  font-size: 34px;
  z-index: 10;
  text-shadow: 0px 0px 10px rgb(89, 166, 197);
}
.prientAllFont{
  position: absolute;
  left: 17%;
  top: 30%;
  font-size: 16px;
}
.toBar>img,.toHot>img{
  width: 90%;
}
.toHot,.toBar{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 20%;
  left: 5%;
}
.toBar{
  top: 60%;
}
.toHotFont,.toBarFont{
  font-size: 14px;
  position: absolute;
  top:22%;
  left: 45%;
}
.toHotData,.toBarData{
  width: 200px;
  text-align: center;
  position: absolute;
  font-size: 30px;
  top: 5%;
  left: 35%;
}
.toHotData{
  background-image: -webkit-linear-gradient(bottom, #9966ff, #66ccff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.toBarData{
  background-image: -webkit-linear-gradient(bottom, #009933, #66ff66);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.linePrient,.outLinePrient{
  width: 50%;
  height: 50px;
  position: absolute;
  right: 20px;
  top: 80px;
}
.outLinePrient{
  margin-top:5%;
  top: 140px;
}
.rightTopBox{
  width: 100%;
  height: 33.2%;
}
.rightCenterBox{
  width: 100%;
  height: 31.1%;
}
.rightBottomBox{
  width: 100%;
  height: 35.7%;
}
.rightGetCable{
  width: 100%;
  height: 100%;
}
.rightGetCable>div{
  display: inline-block;
    width: 40%;
    height: 32%;
    margin-top:8%;
    margin-left:10%;
}
.rightToHot,.rightToBar{
  width: 100%;
  position: relative;
  text-align: center;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.strongF{
  font-size: 20px;
}
.rightToHot>img,.rightToBar>img{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12%;
}
.rightToHot>span,.rightToBar>span{
  vertical-align: bottom;
  display: inline-block;
  margin-top: 15%;
  font-size: 14px;
  position: relative;
}
.rightToHot>div,.rightToBar>div{
  position: absolute;
  width: 100%;
  display: inline-block;
  text-align: center;
  top: 50%;
  z-index: 2;
  font-size: 30px;
  transform: translateY(-70%);
  background-image: -webkit-linear-gradient(bottom, #9966ff, #66ccff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rightToBar>.rightToBarData{
  background-image: -webkit-linear-gradient(bottom, #009933, #66ff66);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.linePrientData,.outLinePrientData{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}
.linePrientBar,.outLinePrientBar{
  position: relative;
  width: 100%;
}
.allPrientColor{
  margin-top: 15px;
  position: absolute;
  background-color: #003399;
  height: 6px;
  width: 100%;
}
.outLinePrientColor,.linePrientColor{
  background-image: -webkit-linear-gradient(left, #003399, #33cccc);
  position: absolute;
  left: 0;
  height: 6px;
  z-index: 2;
}
.outLinePrientColor{
  background-image: -webkit-linear-gradient(left, #003399, #ff3333);
}
.outLinePrientDot,.linePrientDot{
  width: 20px;
  height: 20px;
  background-image: url('~@/assets/three/line.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 5;
}
.outLinePrientDot{
  background-image: url('~@/assets/three/unline.png');
}
.rightBoxLine{
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
}
.rightLine{
  width: 80%;
  left: 10%;
}
</style>
	