// 借鉴：http://lbsyun.baidu.com/jsdemo.htm#f0_7
// 开源文档：http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/BMapLib.DrawingManager.html#event:polylinecomplete
// 这个插件经常报错！！！

/* --------- 制作地图 --------- */
let map = new BMap.Map("map", {enableMapClick: false});

map.centerAndZoom("武汉", 13); // 设定武汉，zoom层级为13
map.enableScrollWheelZoom(); // 以便滚轮缩放有效

let layer = [];

let style = {
    strokeColor:"red",
    fillColor:"red",
    strokeWeight: 2,
    strokeOpacity: 0.8,
    fillOpacity: 0.6,
    strokeStyle: "solid",
    enableMassClear: false
}

let dm = new BMapLib.DrawingManager(map, {
    isOpen: false,
    enableDrawingTool: true,
    //enableCalculate: true,
    drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMap.Size(-55, 5),
        scale: 0.5,
        //drawingModes: [BMAP_DRAWING_MARKER, BMAP_DRAWING_CIRCLE] 
    },
    markerOptions: {
        icon: symbols.cross(), // 引入了我的symbols.js
        enableMassClear: false
    },
    circleOptions: style,
    polygonOptions: style,
    polylineOptions: style,
    rectangleOptions: style
});


dm.addEventListener("circlecomplete", (m) => {
    layer.push(m);
    console.log(m instanceof BMap.Circle);
});
dm.addEventListener("polygoncomplete", (m) => layer.push(m));
dm.addEventListener("polylinecomplete", (m) => layer.push(m));
dm.addEventListener("rectanglecomplete", (m) => layer.push(m));
dm.addEventListener("markercomplete", (m) => {
    layer.push(m);
    console.log(m instanceof BMap.Marker);
});
dm.addEventListener("overlaycomplete", (e, m) => {
    dm.close();
});

document.getElementById("toggle")
    .addEventListener("click", function () {
        if (this.classList.contains("off")) {
            this.innerText = "关闭测距";
            dm.enableCalculate();
        }
        else {
            this.innerText = "开启测距";
            dm.disableCalculate();
        }
        this.classList.toggle("off");
    });

function clearAll () {
    layer.forEach(m => map.removeOverlay(m));
    layer.length = 0;
}