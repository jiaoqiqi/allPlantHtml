/**
 * Created by hn on 2015/12/18.
 */

var container, scene, camera, renderer, controls, stats,light;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

var SCREEN_WIDTH,SCREEN_HEIGHT;

/**
 * 初始化three
 */
function initThree(){
     initScene();
     initCamera();
     initRenderer();
     initContainer();
     initEvents();
     initControls();
     initStats();
     initLight();
 }

/**
 * 初始化渲染器
 */
function initRenderer() {
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:false} );
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}
/**
 * 初始化stats
 */
function initStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );
}
/**
 * 初始化相机
 */
function initCamera() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    camera = new THREE.PerspectiveCamera( 45, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000000);
    scene.add(camera);
    camera.position.set(0,0,1500);
    camera.lookAt(scene.position);
}
/**
 * 初始化场景
 */
function initScene() {
    scene = new THREE.Scene();
}
/**
 * 初始化光线
 */
function initLight() {
    light = new THREE.PointLight(0xffffff,1.5,20000,0.3);
    light.position.set(0,0,0);
    scene.add(light);

    //var light1 = new THREE.PointLight(0xffffff,1,10000,0.3);
    //light1.position.set(offsetX-offsetX/4,offsetX,0);
    //scene.add(light1);
    //
    //var light2 = new THREE.PointLight(0xffffff,1,10000,0.3);
    //light2.position.set(offsetX,0,offsetX/4);
    //scene.add(light2);
    //
    //var light3 = new THREE.PointLight(0xffffff,1,10000,0.3);
    //light3.position.set(offsetX,0,-offsetX/4);
    //scene.add(light3);
}
/**
 * 初始化容器
 */
function initContainer(){
    container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );
}

/**
 *  事件Events
 */
function initEvents(){
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
}
/**
 * 初始化控制器
 */
function initControls(){
    controls = new THREE.OrbitControls( camera, renderer.domElement );
}

