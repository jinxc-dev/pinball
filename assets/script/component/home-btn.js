cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
        // cc.director.preloadScene("main");
        
        this.node.on("touchend", function(){
            cc.director.loadScene("home");
        });
    },

    // update (dt) {},
});
