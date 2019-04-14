/**
 * 星球
 * 球：半径、纹理、颜色、自转方向、速度、倾斜角度；
 * 星环：纹理、颜色、内径、外径、倾斜角度
 * 轨道：纹理、轨道半径、公转速度、倾斜角度
 */

/**
 *  画星球
 *
 * @param radius 半径
 * @param segments
 * @param img  纹理图
 * @returns {THREE.Mesh}
 */
function createSphere(radius, segments,img) {
    return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(img),
        bumpScale: 0.05,
        specular: new THREE.Color('#190909')
    }));
}

function createSphere_0(radius, segments,img){
    return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments),new THREE.MeshLambertMaterial( {
        map: THREE.ImageUtils.loadTexture(img) ,
        emissive:0xffffff
    }));
}

/**
 * 画太阳系sky
 *
 * @param radius
 * @param segments
 * @returns {THREE.Mesh}
 */
function createSolarSky(radius, segments) {
    return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/galaxy_starfield.jpg'),
        side: THREE.BackSide
    }));
}

/**
 * 画环形：如土星环
 *
 * @param radius
 * @param segments
 * @returns {THREE.Mesh}
 */
function createRings(radius, segments) {
    var ring = new THREE.Mesh(new THREE.RingGeometry(1.2 * radius, 2 * radius, 2 * segments, 5, 0, Math.PI * 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/ring.png'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    }));
    //ring.rotation.set(Math.PI / 2,0, 0);
    return ring;
}

/**
 * 画轨道(天体轨道),土星环等
 * @param radius
 * @param segments
 * @param opacity
 * @returns {THREE.Mesh}
 */
function createOrbit(radius, segments,angle,opacity){
    //innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength
    var orbit = new THREE.Mesh(new THREE.RingGeometry(radius,  radius+5, 500, 5, 0, Math.PI * 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/ring.jpg'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: opacity
    }));
    //if(parseFloat(stars.Earth.sd)==radius)
    //    orbit.rotation.set(Math.PI / 2,(10*π/180).toFixed(2), 0);
    return orbit;
}

/**
 * 画球体发光。太阳发光效果
 * @returns {THREE.ShaderSprite.sprite|{vertexShader, fragmentShader}|*|THREE.ShaderLib.sprite}
 */
function createSprits(color,img){
    return new THREE.Sprite(new THREE.SpriteMaterial(
        {
            map: new THREE.ImageUtils.loadTexture( 'images/solar/glow.png' ),
            useScreenCoordinates: false, alignment: THREE.SpriteAlignment.center,
            color: 0xFEAB10, transparent: true, blending: THREE.AdditiveBlending
        }));
}