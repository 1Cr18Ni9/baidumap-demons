(function (window) {
/** 说明
 * shp.circle/shp.drop/shp.cuteDrop无法渲染出来
 * shp.circle居然也渲染不出来，百思不得其解！！！
 */


let shp = {
    //circle:   "M1,16 a15,15 0 1, 0 30, 0 a15,15 0 1, 0 -30, 0",
    circle:   BMap_Symbol_SHAPE_CIRCLE,
    cross:    "M1 11h10V1h10v10h10v10H21v10H11V21H1z",
    diamond:  "M16-.119L25.306 16 16 32.119 6.694 16z",
    square:   "M4.82 4.82h22.36v22.36H4.82z",
    star:     "M16 .652l3.67 11.296h11.877L21.94 18.93l3.67 11.295L16 23.245l-9.609 6.98 3.67-11.295-9.608-6.982H12.33z",
    triangle: "M16 2.803l13.16 22.795H2.84z",
    drop:     "M15.3 1.8a9 9 0 00-9 9c0 9 9 19.8 9 19.8s9-10.8 9-19.8a9 9 0 00-9-9zm0 14.4a5.4 5.4 0 110-10.8 5.4 5.4 0 010 10.8z",
    cuteDrop: "M24.54 6.434A12.326 12.326 0 0015.767 2.8c-3.314 0-6.43 1.29-8.773 3.634S3.36 11.893 3.36 15.207s1.29 6.43 3.634 8.773l6.591 6.591c.581.581 1.356.901 2.182.901.825 0 1.6-.32 2.18-.9l6.593-6.592a12.325 12.325 0 003.633-8.773c0-3.314-1.29-6.43-3.633-8.773zm-8.773 11.532a2.762 2.762 0 01-2.76-2.76 2.762 2.762 0 012.76-2.758 2.762 2.762 0 012.759 2.759 2.762 2.762 0 01-2.76 2.759zm0 0"
}

let size = (w, h) => new BMap.Size(w, h);

/**
 * 这个函数主要的用途是快速构建BMap.Icon
 * fn.size, fn.path, fn.anchor用于配置变化的参数
 * 配置完后直接运行fn()就可以产生一个BMap.Icon实例
 */
let makeSym = function () {
    let _path, 
        _anchor = size(16, 16),
        _size   = size(32, 32);

    let fn = function (opt) {
        if (!_path || !_anchor || !_size) {
            throw Error("path字符串，anchor和size必须配齐！");
        }

        let defaultOpt = {
            fillColor: "#f11",
            fillOpacity: 0.8,
            scale: 0.8,
            strokeColor: "white",
            strokeWeight: 1
        };
        Object.assign(
            defaultOpt, 
            opt, 
            {
                anchor: _anchor,
                size:   _size,
                infoWindowAnchor: size(_size.width * 0.5, 0)
            }
        );
        return new BMap.Symbol(_path, defaultOpt);
    }
    fn.anchor = function (dim) {
        _anchor = dim;
        return fn;
    };
    fn.size = function (dim) {
        _size = dim;
        return fn;
    };
    fn.path = function (path) {
        _path = path;
        return fn;
    };

    return fn;
};



let icons = {
    //circle:   makeSym().path(shp.circle),
    circle:   new BMap.Symbol(shp.circle, {scale: 5}),
    cross:    makeSym().path(shp.cross),
    diamond:  makeSym().path(shp.diamond),
    square:   makeSym().path(shp.square),
    star:     makeSym().path(shp.star),
    triangle: makeSym().path(shp.triangle),
    drop:     makeSym().anchor(size(16, 16)).path(shp.drop),
    cuteDrop: makeSym().anchor(size(16, 16)).path(shp.cuteDrop)
};

window.icons = icons;


})(window);