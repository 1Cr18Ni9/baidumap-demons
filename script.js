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

// 后面实际上用图层来管理
let markers = [];

let icon = window.symbols.triangle();
markers = geoPos.map(p => {
    let point = new BMap.Point(p[0], p[1]);
    let m = new BMap.Marker(point, {icon: icon});

    map.addOverlay(m);
    m.addEventListener("click", markerOnClick);

    return m;
});

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


function markerOnClick () {
    // 需要指出marker.openInfoWindow这个接口根本不管用
    // marker.openInfoWindow(popup)
    
    // 这里我初步想法是获取marker嵌入的信息，
    // 点击后去后台获取信息并通过popup.setContent展现出来

    map.openInfoWindow(popup, this.getPosition());
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
    
    let shape = controls.shape.value;

    // 注意从控件获取的值都是字符串，有些参数需要转化
    let opt = {
        fillColor: controls.fillColor.value,
        strokeColor: controls.strokeColor.value,
        fillOpacity: +controls.fillOpacity.value,
        scale: +controls.scale.value
    };

    let newSymbol = window.symbols[shape](opt);

    markers.forEach(m => m.setIcon(newSymbol));
}


function loacatePoint (lng, lat) {
    let box = map.getContainer().getBoundingClientRect();
    let clientX = box.x + (box.width / 2), 
        clientY = box.y + (box.height / 2) - 1;
    map.setCenter(new BMap.Point(lng, lat));
    let event = new Event("click", {
        bubbles: true,
        cancelable: true,
        clientX,
        clientY
    });

    // 确切的说，应该通过id进行查找，找到marker,然后：
    // 这里有很大的不确定性：因为Marker本身继承了EventTarget
    // 将来这个接口改了的话，我这里就不灵了
    markers[2].dispatchEvent(event);
}