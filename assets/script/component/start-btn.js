
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start () {
        cc.director.preloadScene("main");
        
        this.node.on("touchend", function(){
            cc.director.loadScene("main");
        });
    },

    // update (dt) {},
});
