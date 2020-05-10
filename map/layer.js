// 百度地图对于overlay没有进行集中管理的对象，或者说没有图层的概念，
// 这里需要我自定义个一个图层或者说Collection容器。
// 这个只是一个demo，实际的图层后续会加入更多特性

function Layer (bmap, options) {
    let opt = Object.assign({
        name: "undefined",
        member: []
    }, options || {});

    // 后续使用shordid插件做hash值，这里不变展示
    this.$id = opt.id || ("L" + Math.random());
    this.name = opt.name;
    this.member = opt.member; // 存放所有的overlay
    this.bmap = bmap; // 百度地图实例
}
Layer.prototype = {
    initialize: function () {},
    hide: function () {
        let i;
        for (i = 0; i < this.member.length; i++) {
            this.member[i].hide();
        }
    },
    show: function () {
        let i;
        for (i = 0; i < this.member.length; i++) {
            this.member[i].show();
        }
    },
    remove: function (id) {
        let index, m;
        index = this.findIndex(id);
        if (id && (index > -1)) {
            m = this.member.splice(index, 1)[0];
            this.bmap.removeOverlay(m);
        }
    },
    add: function (overlay) {
        this.bmap.addOverlay(overlay);
        this.member.push(overlay);
    },
    dump: function () {
        let i, m;
        for (i = 0; i < this.member.length; i++) {
            m = this.member[i];
            this.bmap.removeOverlay(m);
        }
        this.member = [];
    },
    findIndex: function (id) {
        return this.member.findIndex(m => m.$id === id);
    },
    find: function (id) {
        return this.member.find(m => m.$id === id);
    },
    setName: function (name) {
        this.name = name;
    },
    viewAll: function () {
        if (!this.member.length) { return; }
        
        let points = this.member.map(m => m.getPosition());
        this.bmap.setViewport(points, { enableAnimation: true });
    }
}


function PointLayer () {}


