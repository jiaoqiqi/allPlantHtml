/**
 * Created by hn on 2015/12/18.
 */

// 星球名字
var sun,mercury,venus,earth,moon,mars,jupiter,saturn,uranus,neptune,comet;
// 星球公转object3D
var mercury_object3D,venus_object3D,earth_obj3D,mars_object3D,jupiter_object3D,saturn_object3D,uranus_object3D,neptune_object3D,comet_object3D;

var stars = [mercury,venus,mars,jupiter,saturn,uranus,neptune,comet];
var obj3Ds = [mercury_object3D,venus_object3D,mars_object3D,jupiter_object3D,saturn_object3D,uranus_object3D,neptune_object3D,comet_object3D];


var particleGroup, particleAttributes;

//整体往x轴方向偏移量
var offsetX = -1000;

/**
 * 更改天体运行状态
 */
function updatePlanetsMove(){
    obj3Ds[0].rotation.z += 0.01;//水星公转
    obj3Ds[1].rotation.z += 0.01;//金星公转
    earth_obj3D.rotation.z += 0.01;//地球公转
    moon_obj3D.rotation.z += 0.01;//月球公转
    obj3Ds[2].rotation.z += 0.01;//火星公转
    obj3Ds[3].rotation.z += 0.01;//木星公转
    obj3Ds[4].rotation.z += 0.01;//土球公转
    obj3Ds[5].rotation.z += 0.01;//天王星公转
    obj3Ds[6].rotation.z += 0.01;//海王星公转

    //obj3Ds[7].rotation.y += 0.02;//彗星公转

    sun.rotation.y += 0.001;//太阳自转
    stars[0].rotation.y += 0.01;//水星自转
    stars[1].rotation.y += 0.01;//金星自转
    earth.rotation.y += 0.01;//地球自转
    moon.rotation.y += 0.1;//月球自转
    stars[2].rotation.y += 0.01;//火星自转
    stars[3].rotation.y += 0.01;//木星自转
    stars[4].rotation.y += 0.01;//土球自转
    stars[5].rotation.y += 0.01;//天王星自转
    stars[6].rotation.y += 0.01;//海王星自转
}

function updateSunFire(){
    var time = 4 * clock.getElapsedTime();
    for ( var c = 0; c < particleGroup.children.length; c ++ ) {
        var sprite = particleGroup.children[ c ];

        var a = particleAttributes.randomness[c] + 1;
        var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
        sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
        sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor;
        sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;
    }

    // rotate the entire group
    particleGroup.rotation.y = time * 0.25;
}


/**
 * 画行星
 * @param radius
 * @param segment
 * @param axisHelper
 * @param index
 * @param px
 * @param py
 * @param pz
 * @param image
 * @param angle
 */
function drawPlanet(radius,segment,axisHelper,index,px,py,pz,image,rea,roa) {
    stars[index] = createSphere(radius,segment,image);
    stars[index].position.set(px, py, pz);
    stars[index].rotation.set(roa - Math.PI/2,0,0);

    var orbit = createOrbit(px,200,0,0.8);

    obj3Ds[index] = new THREE.Object3D();
    obj3Ds[index].add(axisHelper);
    obj3Ds[index].add(stars[index]);
    //添加行星公转轨道
    obj3Ds[index].add(orbit);
    obj3Ds[index].position.set(offsetX,0,0); //位置在太阳中心
    obj3Ds[index].rotation.set(Math.PI/2,rea,0);

    if (index==4) {
        var ring = createRings(radius, 120);
        ring.position.set(px,0,0);
        obj3Ds[index].add(ring);
    }
    scene.add(obj3Ds[index]);
}


//画太阳
function drawSun(){
//  drawSunFire()

    sun = createSphere_0(stars.Sun.dia,500,'images/solar/sun.jpg');
    sun.position.set(offsetX,0,0);
    scene.add(sun);

    // 太阳光
    var sunSprite = createSprits(0xFEAB10,'images/solar/glow.png');
    sunSprite.scale.set(stars.Sun.dia * 8, stars.Sun.dia * 8, 8);
    sun.add(sunSprite);
}

function drawSunFire(){
    var particleTexture = THREE.ImageUtils.loadTexture( 'images/solar/spark.png' );

    particleGroup = new THREE.Object3D();
    particleAttributes = { startSize: [], startPosition: [], randomness: [] };

    var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, useScreenCoordinates: false, color: 0xFFFFFF } );

    var totalParticles = 400;
    var radiusRange = 123;

    var geometry = new THREE.BufferGeometry();
    for( var i = 0; i < totalParticles; i++ ) {
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set( 128, 128, 1 ); // imageWidth, imageHeight
        sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
        sprite.position.setLength( radiusRange * (0.1 * 0.1 + 0.85) );
        sprite.material.color.set(0xEA2806);
        sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles

        particleGroup.add( sprite );
        particleAttributes.startPosition.push( sprite.position.clone() );
        particleAttributes.randomness.push( Math.random() );
    }
    particleGroup.position.y = 5;
    scene.add( particleGroup );
}

//画行星和卫星
function drawEarthAndMoon(axisHelper){

    //地球
    earth = createSphere(stars.Earth.dia,32,'images/solar/earth.jpg');
    earth.position.set(stars.Earth.sd,0,0);
    earth.rotation.set(stars.Earth.roa - Math.PI/2,0,0);
    //地球公转轨道
    var earth_orbit = createOrbit(stars.Earth.sd);
    earth_obj3D = new THREE.Object3D();
    earth_obj3D.add(axisHelper) ;
    earth_obj3D.add(earth);
    earth_obj3D.add(earth_orbit);
    earth_obj3D.position.set(offsetX,0,0);  //位置在太阳中心
    earth_obj3D.rotation.set(Math.PI/2,stars.Earth.rea,0);

    //月球
    moon = createSphere(stars.Moon.dia,16,'images/solar/moon.jpg');
    moon.position.set(stars.Moon.sd,0,0);
    moon.rotation.set(-Math.PI/2,0,0);
    //月球公转轨道
    var moon_orbit = createOrbit(stars.Moon.sd);
    moon_obj3D = new THREE.Object3D();
    moon_obj3D.add(axisHelper) ;
    moon_obj3D.add(moon);
    moon_obj3D.add(moon_orbit);
    moon_obj3D.position.set(stars.Earth.sd,0,0); //位置在地球中心
    moon_obj3D.rotation.set(stars.Moon.rea,0,0);

    earth_obj3D.add(moon_obj3D);

    scene.add(earth_obj3D);
}


//画太阳系
function drawSolarSystem() {
    var axisHelper = new THREE.AxisHelper(4);
    // CUSTOM // 太阳
    drawSun();
    // CUSTOM // 水星
    drawPlanet(stars.Mercury.dia,15,axisHelper,0,stars.Mercury.sd,0,0,'images/solar/mercury.jpg',stars.Mercury.rea,stars.Mercury.roa);
    // CUSTOM // 金星
    drawPlanet(stars.Venus.dia,25,axisHelper,1,stars.Venus.sd,0,0,'images/solar/venus.jpg',stars.Venus.rea,stars.Venus.roa);
    // CUSTOM // 地球-月球
    drawEarthAndMoon(axisHelper);
    // CUSTOM // 火星
    drawPlanet(stars.Mars.dia,15,axisHelper,2,stars.Mars.sd,0,0,'images/solar/mars.jpg',stars.Mars.rea,stars.Mars.roa);
    // CUSTOM // 木星
    drawPlanet(stars.Jupiter.dia,60,axisHelper,3,stars.Jupiter.sd,0,0,'images/solar/jupiter.jpg',stars.Jupiter.rea,stars.Jupiter.roa);
    // CUSTOM // 土星
    drawPlanet(stars.Saturn.dia,60,axisHelper,4,stars.Saturn.sd,0,0,'images/solar/saturn.jpg',stars.Saturn.rea,stars.Saturn.roa);
    // CUSTOM // 天王星
    drawPlanet(stars.Uranus.dia,60,axisHelper,5,stars.Uranus.sd,0,0,'images/solar/uranus.jpg',stars.Uranus.rea,stars.Uranus.roa);
    // CUSTOM // 海王星
    drawPlanet(stars.Neptune.dia,60,axisHelper,6,stars.Neptune.sd,0,0,'images/solar/neptune.jpg',stars.Neptune.rea,stars.Neptune.roa);
    // CUSTOM // 彗星
    //drawPlanet(15,15,axisHelper,7,900,500,0,'images/solar/moon.jpg',Math.PI/2);
}

