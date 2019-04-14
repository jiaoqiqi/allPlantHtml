/**
 * 创建坐标系
 * @param w坐标轴长度
 * @returns {THREE.Line}
 */
function createCoordinateSystem(w){
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({vertexColors:true});
    var color1 = new THREE.Color(0xFF0000);
    var color2 = new THREE.Color(0x00FF00);
    var color3 = new THREE.Color(0x0000FF);
    var p0 = new THREE.Vector3(0,0,0);
    var p1 = new THREE.Vector3(w,0,0);
    var p2 = new THREE.Vector3(0,w,0);
    var p3 = new THREE.Vector3(0,0,w);
    geometry.vertices.push(p0);
    geometry.vertices.push(p1);
    geometry.vertices.push(p0);
    geometry.vertices.push(p2);
    geometry.vertices.push(p0);
    geometry.vertices.push(p3);
    geometry.colors.push(color1,color1,color2,color2,color3,color3);
    //THREE.LinePieces  p1→p2 p3→p4
    //THREE.LineStrip
    //THREE.LineSegments
    return new THREE.Line(geometry,material,THREE.LinePieces);
}


function createOrbit(radius){
    var orbit = new THREE.Mesh(new THREE.RingGeometry(radius,  radius+5, 100, 5, 0, Math.PI * 2), new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/solar/neptune.jpg'),
        side: THREE.DoubleSide,
        transparent: false
    }));
    return orbit;
}


var ParamObj  = function(){
        this.earth=true,
        this.earth_orbit=true,
        this.earth_local_coordinate_sys=true,
        this.earth_obj3D=true,

        this.earth_radius=50,
        this.earth_orbit_radius=400,

        //轨道倾斜角度
        this.earth_orbit_x_angle=0,
        this.earth_orbit_y_angle=0,
        this.earth_orbit_z_angle=0,

        this.earth_obj3D_x_angle=0,
        this.earth_obj3D_y_angle=0,
        this.earth_obj3D_z_angle=0,

        this.earth_revolution_x_speed=0,
        this.earth_revolution_y_speed=0,
        this.earth_revolution_z_speed=0,


        this.moon=true,
        this.moon_orbit=true,
        this.moon_local_coordinate_sys=true,
        this.moon_obj3D=true,

        this.moon_radius=20,
        this.moon_orbit_radius=100,

        //轨道倾斜角度
        this.moon_orbit_x_angle=0,
        this.moon_orbit_y_angle=0,
        this.moon_orbit_z_angle=0,

        this.moon_obj3D_x_angle=0,
        this.moon_obj3D_y_angle=0,
        this.moon_obj3D_z_angle=0


        this.moon_revolution_x_speed=0;
        this.moon_revolution_y_speed=0;
        this.moon_revolution_z_speed=0;
};

