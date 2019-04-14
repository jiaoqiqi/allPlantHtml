/**
 * Created by Administrator on 2015/12/19.
 */
var stars = {
    Mercury: {
        dia: 4878, //直径(km)(/200 换算成半径再缩放)
        sd: 0.39,  //日距(约1.496亿km,天文单位)
        pd: 0.3075, //近日距(天文单位)
        ad: 0.4612, //远日距(天文单位)一天文单位约等于149,597,870,700米
        rea: 7.0048, //轨道倾角(度)  需换算成弧度  1弧度=180/π 度    1度=π/180 弧度
        roa: 0,      //自转倾角(度)
        rep: 87.97,  //公转周期(天)
        rop: 58.65,  //自转周期(天)
        ref: 0.11    //折射率
    },
    Venus  : {
        dia: 12103,
        sd: 0.72,
        pd: 0.7205,
        ad: 0.7255,
        rea: 3.9347,
        roa: 177.33,
        rep: 224.7,
        rop: 243,
        ref: 0.65
    },
    Earth  : {
        dia: 12756,
        sd : 1,
        pd : 0.9833,
        ad : 1.0167,
        rea: 0,
        roa: 23.45,
        rep: 365.26,
        rop: 0.997222222,//0.997222222
        ref: 0.37
    },
    Mars   : {
        dia: 6786,
        sd : 1.52,
        pd : 1.52,
        ad : 1.52,
        rea: 1.8506,
        roa: 25.19,
        rep: 686.98,
        rop: 1.0257, //1.025694444
        ref: 0.15
    },
    Jupiter: {
        dia: 142984,
        sd : 5.2,
        pd : 5.2,
        ad : 5.2,
        rea: 1.3053,
        roa: 3.08,
        rep: 4331.9836,
        rop: 0.409722222, //0.409722222
        ref: 0.52
    },
    Saturn : {
        dia: 120536,
        sd : 9.54,
        pd : 9.54,
        ad : 9.54,
        rea: 2.4845,
        roa: 26.73,
        rep: 10760.5596,
        rop: 0.44375,
        ref: 0.47
    },
    Uranus : {
        dia: 51118,
        sd : 19.18,
        pd : 18.3755,
        ad : 20.0833,
        rea: 0.7699,
        roa: 97.92,
        rep: 30685.4926,
        rop: 0.718055556,  //0.718055556
        ref: 0.51
    },
    Neptune: {
        dia: 49528,
        sd : 30.06,
        pd : 30.06,
        ad : 30.06,
        rea: 1.7692,
        roa: 28.8,
        rep: 60191.1954,
        rop: 0.671527778, //0.671527778
        ref: 0.41
    },
    Sun    : {
        dia: 1392000,
        sd : 0,
        pd : 0,
        ad : 0,
        rea: 0,
        roa: 0,
        rep: 0,
        rop: 25.05,
        ref: 1
    },
    Moon   : {
        dia: 3476,
        sd : 2.56955528979999E-06,   //2.56955528979999E-06 到地球距离(约1.496亿km,天文单位)
        pd : 2.42851050152012E-06,   //2.42851050152012E-06
        ad : 2.71055328596999E-06,   //2.71055328596999E-06
        rea: 4,
        roa: 1,
        rep: 27.32,
        rop: 29,
        ref: 0.12
    }
}

//详细参数的缩放比例(角度、发射率不需要)
var scales = {
    Mercury: {
        dia_scale: 1 / 400, //直径 比例
        d_scale: 500,//日距 比例   (亿/300)
        rep_scale: 1,  //公转周期 比例
        rop_scale: 1  //自转周期 比例
    },
    Venus  : {
        dia_scale: 1 / 400,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Earth  : {
        dia_scale: 1 / 400,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Mars   : {
        dia_scale: 1 / 400,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Jupiter: {
        dia_scale: 1 / 400,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Saturn : {
        dia_scale: 1 / 400,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Uranus : {
        dia_scale: 1 / 400,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Neptune: {
        dia_scale: 1 / 400,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Sun    : {
        dia_scale: 1 / 3000,
        d_scale: 500,
        rep_scale: 1,
        rop_scale: 1
    },
    Moon   : {
        dia_scale: 1 / 400,
        d_scale: 20000000,
        rep_scale: 1,
        rop_scale: 1
    }
}


//var names = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune','Sun', 'Moon'];

var π = Math.PI;

// 假设太阳系范围2倍于海王星日距
var scale_limits  = 2;//实际上太阳系范围数十倍于海王星日距,这里假设为2倍

//太阳系最大范围 =  (太阳半径(km) + 海王星日距(亿km))*2  两者比例分开计算
var solar_limits;

function initData(){
    var stars_list = [stars.Mercury,stars.Venus,stars.Earth,stars.Mars,stars.Jupiter,stars.Saturn,stars.Uranus,stars.Neptune,stars.Sun,stars.Moon];
    var scales_list = [scales.Mercury,scales.Venus,scales.Earth,scales.Mars,scales.Jupiter,scales.Saturn,scales.Uranus,scales.Neptune,scales.Sun,scales.Moon];

    var sun_radius = stars_list[8].dia * scales_list[8].dia_scale;
    var earth_radius = stars_list[2].dia * scales_list[2].dia_scale;

    var temp_radius;

    console.log("--------------------------------");

    var len = stars_list.length;

    var start = new Date().getTime();
    for(var i=0;i<len;i++){
        temp_radius = i==9?earth_radius:sun_radius;
        stars_list[i].dia = parseFloat((stars_list[i].dia *  scales_list[i].dia_scale).toFixed(2));
        stars_list[i].sd  = parseFloat((stars_list[i].sd  *  scales_list[i].d_scale + temp_radius).toFixed(2));
        stars_list[i].pd  = parseFloat((stars_list[i].pd  *  scales_list[i].d_scale + temp_radius).toFixed(2));
        stars_list[i].ad  = parseFloat((stars_list[i].ad  *  scales_list[i].d_scale + temp_radius).toFixed(2));
        stars_list[i].rea = parseFloat((stars_list[i].rea *  (π/180)).toFixed(2));
        stars_list[i].roa = parseFloat((stars_list[i].roa *  (π/180)).toFixed(2));
        stars_list[i].rep = parseFloat((stars_list[i].rep *  scales_list[i].rep_scale).toFixed(2));
        stars_list[i].rop = parseFloat((stars_list[i].rop *  scales_list[i].rop_scale).toFixed(2));
    }

    var end = new Date().getTime();
    console.log(start);
    console.log(end);
    solar_limits = (stars_list[8].dia + stars_list[7].sd);
}


