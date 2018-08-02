cc.Class({
    extends: cc.Component,

    properties: {
        handNode: cc.Node,
        mainNode: cc.Node
    },

    onLoad () {},

    start () {
        this.node.on('touchstart', function() {
            this.node.active = false;
        }, this);
    },

    onEnable() {
        this.start();
        var s1 = cc.moveBy(1, -150, 0);
        var s2 = cc.moveBy(1, 150, 0);
        this.handNode.runAction(cc.sequence(s1, s2).repeatForever());
    },

    onDisable() {
        this.handNode.stopAction();
        
    }

    // update (dt) {},
});
