import { WebGLRenderer, PerspectiveCamera, Scene, Mesh, SphereGeometry, MeshPhongMaterial, DoubleSide, Vector3, HemisphereLight, AxesHelper, ObjectLoader, Vector2, DirectionalLight, PlaneGeometry, TextureLoader, MirroredRepeatWrapping, RepeatWrapping, ClampToEdgeWrapping, MeshBasicMaterial, Group, CylinderBufferGeometry, FrontSide, BackSide } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// import * as THREE from "three"
// THREE.WebGLRenderer(); THREE.PerspectiveCamera();
var renderer, camera, control, scene;

var effectComposer, renderPass, bloomPass;
var params = {
    exposure: 1,
    bloomStrength: 1.7,
    bloomThreshold: 0.01,
    bloomRadius: 0.4
};
var gui;

var textureLoader = new TextureLoader();
var textureTest, waveMesh;

import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer" //jsm js module
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass" //jsm js module
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass" //jsm js module
import { GUI } from "three/examples/jsm/libs/dat.gui.module"
import {get } from "./fetch";
import * as cga from "xtorcga"
import { toSVGData, parsePathNode } from "./svgPath"
var roadMaterial;

function init() {
    renderer = new WebGLRenderer({ antialias: true });
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xffffff);
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
    camera.position.y = 1000;
    camera.position.z = 500;

    control = new OrbitControls(camera, renderer.domElement);
    // camera.lookAt(new Vector3(0, 1, 1))

    var light = new HemisphereLight(0xffffff, 0x444444);
    // var dirlight = new DirectionalLight(0xffffff);

    scene = new Scene();

    scene.add(light);
    // scene.add(dirlight);

    scene.add(new AxesHelper(10000));

    // scene.add(new Mesh(new SphereGeometry(2, 30, 30), new MeshPhongMaterial({ color: 0xff0000, side: DoubleSide })));


    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        effectComposer.setSize(window.innerWidth, window.innerHeight);
        renderPass.setSize(window.innerWidth, window.innerHeight)
        bloomPass.setSize(window.innerWidth, window.innerHeight);
    })




    loadModel();

    initEffectComposer();

    initGUI()
}

function loadModel() {
    var mtlLoader = new MTLLoader();
    var objLoader = new OBJLoader();

    for (let i = 1; i < 8; i++) {
        mtlLoader.load("../assets/model/city/ny" + i + ".mtl", function(preMaterial) {
            preMaterial.preload();
            objLoader.setMaterials(preMaterial).load("../assets/model/city/ny" + i + ".obj", function(obj) {
                obj.position.set(6691, 604.35216, 2154.6111);
                scene.add(obj);

            })
        })
    }

    //---纹理的讲解-------------------
    var textureLoader = new TextureLoader();
    textureTest = textureLoader.load("./assets/flower-1.jpg");
    // texture.offset.set(0.5, 0);
    textureTest.repeat.set(1, 1);
    textureTest.rotation = Math.PI;
    textureTest.wrapS = RepeatWrapping; // ClampToEdgeWrapping; //RepeatWrapping; //MirroredRepeatWrapping
    textureTest.wrapT = RepeatWrapping; // ClampToEdgeWrapping; //RepeatWrapping; //MirroredRepeatWrapping

    //
    var plane = new Mesh(new PlaneGeometry(200, 200), new MeshPhongMaterial({
        map: textureTest
    }));
    scene.add(plane);

    // ---城市道路加载-------


    get("../../assets/data/城市应急场景.json").then(response => {
        if (response.ok) {
            return response.json()
        } else {

        }
    }).then(data => {
        var paths = [data.d[25],
            data.d[26],
            data.d[27]
        ];
        var strs = []
        for (let i = 0; i < paths.length; i++) {
            const node = paths[i];
            var pts = node.p.points.__a
            var sgs = node.p.segments.__a
            var str = toSVGData(sgs, pts)
            strs.push(str)
        }


        // var lineMaterial = new LineBasicMaterial({
        //     color: 0xff0000,
        // });


        var roadMap = textureLoader.load("../assets/model/city/traffic_01.png");
        roadMap.wrapS = RepeatWrapping
        roadMap.wrapT = RepeatWrapping
        roadMap.rotation = Math.PI / 2;
        roadMap.offset.set(0.5, 0.5);

        var roadMap1 = textureLoader.load("../assets/model/city/traffic_01.png");
        roadMap1.wrapS = RepeatWrapping
        roadMap1.wrapT = RepeatWrapping
        roadMap1.rotation = Math.PI / 2;
        roadMap1.offset.set(0.5, 0.5);

        var roadMap2 = textureLoader.load("../assets/model/city/traffic_01.png");
        roadMap2.wrapS = RepeatWrapping
        roadMap2.wrapT = RepeatWrapping
        roadMap2.rotation = Math.PI / 2;
        roadMap2.offset.set(0.5, 0.5);

        roadMaterial = [new MeshBasicMaterial({
            map: roadMap,
            transparent: true,
            depthWrite: false,
        }), new MeshBasicMaterial({
            map: roadMap1,
            transparent: true,
            depthWrite: false,
        }), new MeshBasicMaterial({
            map: roadMap2,
            transparent: true,
            depthWrite: false,
        })]

        var roadGroup = new Group();
        roadGroup.position.set(66.94476, 0, -235.22057);
        var roaddata = [{
                "position": {
                    "x": 66.94476,
                    "y": -235.22057
                },
                "thickness": 10
            },
            {
                "position": {
                    "x": 7.04712,
                    "y": -284.96567
                },
                "thickness": 14
            },
            {
                "position": {
                    "x": -42.85882,
                    "y": -603.58046
                },
                "thickness": 20
            }
        ]

        for (let p = 0; p < strs.length; p++) {
            var path = parsePathNode(strs[p])
            var group = new Group();
            group.position.set(roaddata[p].position.x, 0, roaddata[p].position.y)

            for (var j = 0, jl = path.subPaths.length; j < jl; j++) {

                var subPath = path.subPaths[j];

                var points = subPath.getPoints();
                var v3ps = [];
                for (let k = 0; k < points.length; k++) {
                    const p2o = points[k];
                    v3ps.push(new Vector3(p2o.x, 0, p2o.y))
                }
                // carPath.splitByFromToDistance(0, 10);
                // var extrudeRes = cga.extrude();

                var geometry = cga.extrudeToGeometryBuffer([cga.v3(-roaddata[p].thickness / 2, 0, 0), cga.v3(roaddata[p].thickness / 2, 0, 0)], v3ps, {
                    normal: cga.v3(0, 0, 1),
                    isClosed: true,
                    sealStart: false,
                    sealEnd: false,
                    textureScale: new cga.Vector2(1 / roaddata[p].thickness, 1 / 2500)
                })

                var roadMesh = new Mesh(geometry, roadMaterial[p]);

                group.add(roadMesh);
                group.position.set(-104.29041, 0, -303.55284);
            }
            roadGroup.add(group);
            roadGroup.rotation.y = Math.PI / 2;
        }
        scene.add(roadGroup)

    }).catch(e => {
        console.error(e)
    });

    var waveTexture = textureLoader.load("../assets/model/city/gradual_blue_01.png")
        //----扩散波-------
    var cylinderGeo = new CylinderBufferGeometry(
        50, //顶部半径
        50, //底部半径
        200, //高
        50, //分段
        1,
        true
    );
    cylinderGeo.translate(0, 100, 0);

    var cylinder = new Mesh(cylinderGeo,
        new MeshBasicMaterial({
            transparent: true,
            map: waveTexture,
        })
    );

    waveMesh = generateTransparent(cylinder);
    waveMesh.position.x += 500;

    scene.add(waveMesh);
}

/**
 * 透明的解决方案
 * @param {*} mesh 
 */
function generateTransparent(mesh) {
    var group = new Group();
    var frontMesh = new Mesh(mesh.geometry, new MeshBasicMaterial({
        transparent: true,
        map: mesh.material.map,
        side: FrontSide,
        opacity: 0.8 //1是不透明 0是完全透明，默认是1
    }));
    var backMesh = new Mesh(mesh.geometry, new MeshBasicMaterial({ transparent: true, map: mesh.material.map, side: BackSide, opacity: 0.8 }));
    backMesh.renderOrder = 0;
    frontMesh.renderOrder = 1;
    group.add(backMesh);
    group.add(frontMesh);
    return group;
}

function initEffectComposer(params) {
    effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(window.innerWidth, window.innerHeight);

    //这个通道主要是把当前场景渲染成一张图片
    renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight),
        1.7, //strength发光强度  值越大就越亮
        0.4, //radius 发光半径  发光扩散半径  值越大，扩散就越均匀 值越小 基本上就往模型上集中
        0.1, //threshold 发光的阈值 大于这个阈值才发光，准确亮度比阈值越大的地方放光就越强烈

    )

    effectComposer.addPass(bloomPass);

}


function initGUI() {
    gui = new GUI();
    gui.add(params, 'exposure', 0.1, 2).onChange(function(value) {
        // renderer.toneMappingExposure
        renderer.toneMappingExposure = value; //调节整个场景亮度，默认值是1

    });

    gui.add(params, 'bloomThreshold', 0.0, 1.0).step(0.01).onChange(function(value) {

        bloomPass.threshold = Number(value);

    });

    gui.add(params, 'bloomStrength', 0.0, 3.0).step(0.01).onChange(function(value) {

        bloomPass.strength = Number(value);

    });

    gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function(value) {

        bloomPass.radius = Number(value);

    });
}


function render() {

    // renderer.render(scene, camera);
    if (roadMaterial) {
        roadMaterial[0].map.offset.x += 0.002;
        roadMaterial[1].map.offset.x += 0.004;
        roadMaterial[2].map.offset.x += 0.008;
    }

    waveMesh.scale.x += 0.05;
    waveMesh.scale.z += 0.05;
    if (waveMesh.scale.x > 20) {
        waveMesh.scale.x = 1;
        waveMesh.scale.z = 1;
    }

    // textureTest.offset.x += 0.03;
    // renderer.render()

    effectComposer.render(scene, camera);

    // 做任何事情
    requestAnimationFrame(render);
}

init();
render();
render();