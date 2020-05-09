


/* --------- 制作地图 --------- */
let map = new BMap.Map("map");
map.enableScrollWheelZoom(); // 以便滚轮缩放有效
map.centerAndZoom("武汉", 13); // 设定武汉，zoom层级为13

function getZoomAndCenter () {
    let zoom = map.getZoom();
    let {lng, lat} = map.getCenter();
    let center = {lng, lat};
    console.log({zoom, center});
}

function setCenterAndZoom (center, zoom) {
    let p = new BMap.Point(center.lng, center.lat);
    map.centerAndZoom(p, zoom);
}

