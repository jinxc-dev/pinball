cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
       
        this.node.on("touchend", function(){
            cc.director.loadScene("home");
        });
    },

    // update (dt) {},
});
