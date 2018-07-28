
cc.Class({
    extends: cc.Component,

    properties: {
        restartBtn: {
            default: null,
            type: cc.Node
        }
    },


    // onLoad () {},

    start () {
        this.restartBtn.on('btnClicked', function(){
            this.node.active = false;
            // var event = new cc.Event.EventCustom("successRound", true);
            this.node.dispatchEvent(new cc.Event.EventCustom("restartRound", true));
            
        }, this);
    },

    // update (dt) {},
});
