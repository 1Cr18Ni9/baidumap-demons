/**
 * 百度文档： http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b20
 * 
 * 这次的数据绑定恐怕只能用在Point对象上，
 * 在它身上绑定一个id，这个id用于后续查询
 * 
 */


/* --------- 制作地图 --------- */
let map = new BMap.Map("map", {enableMapClick: false});

map.centerAndZoom("武汉", 12); // 设定武汉，zoom层级为13
map.enableScrollWheelZoom(); // 以便滚轮缩放有效



// map.addEventListener("click", ({point}) => {
//     console.log(point);
//     ps.push([point.lng, point.lat]);
// });

let geoPos = [
    [114.2563940658962,30.587026422457996],
    [114.29663815274321,30.56613252269125],
    [114.33285783090552,30.580062294440328],
    [114.29893781484876,30.6108995960432],
    [114.26156830563367,30.614380604062436],
    [114.31273578748203,30.636755494361225]
];

let shape = {
    circle:  BMAP_POINT_SHAPE_CIRCLE,
    star:    BMAP_POINT_SHAPE_STAR,
    square:  BMAP_POINT_SHAPE_SQUARE,
    rhombus: BMAP_POINT_SHAPE_RHOMBUS
}

let shape_size = {
    samller: BMAP_POINT_SIZE_SMALLER,
    small: BMAP_POINT_SIZE_SMALL,
    normal: BMAP_POINT_SIZE_NORMAL,
    big: BMAP_POINT_SIZE_BIG
}

// 这里模拟数据绑定，绑定一个id
let points = geoPos.map(p => {
    let np = new BMap.Point(p[0], p[1]);
    np.id = Math.random();
    return np;
});
let pointCollection = new BMap.PointCollection(points, {
    shape: shape.rhombus,
    color: "red",
    size: shape_size.big
});

map.addOverlay(pointCollection);

pointCollection.addEventListener("click", markerOnClick);

let popup = new BMap.InfoWindow(
    '<div style="width:100px;height:100px;line-height:100px;text-align:center;">Loading....</div>', 
    {
    width: 0,
    height: 0,
    maxWidth: 500,
    enableAutoPan: true,
    enableCloseOnClick: true
});

// 每次关闭设定静态内容，不如“Loading...”
popup.addEventListener("close", function () {
    this.setContent('<div style="width:100px;height:100px;line-height:100px;text-align:center;">Loading....</div>')
});


function markerOnClick ({type, target, point}) {
    console.log(point);

    map.openInfoWindow(popup, point);
    setTimeout(() => {
        let ul = document.createElement("ul");
        ul.classList.add(".abc");
        ul.innerHTML = `<li>a</li><li>b</li><li>c</li>`;
        popup.setContent(ul);
    }, 1500);
    
}

let controls = document.getElementById("form").elements;
controls.confirm.onclick = confirmFn;

function confirmFn (e) {
    e.preventDefault();
    
    let sh = shape[controls.shape.value];
    let size = shape_size[controls.size.value];
    let color = controls.color.value

    let opt = {
        shape: sh,
        size: size,
        color: color
    };
    console.log(opt);
    pointCollection.setStyles(opt);
}


