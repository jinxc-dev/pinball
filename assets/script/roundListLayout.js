
cc.Class({
    extends: cc.Component,

    properties: {
        closeBtn: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.closeBtn.on('btnClicked', function(){
            this.node.active = false;
        }, this);
    },

    start () {

    },

    // update (dt) {},
});
