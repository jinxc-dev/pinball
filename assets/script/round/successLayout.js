
cc.Class({
    extends: cc.Component,

    properties: {
        nextBtn: {
            default: null,
            type: cc.Node
        }
    },


    // onLoad () {},

    start () {
        this.nextBtn.on('btnClicked', function(){
            this.node.active = false;
            // var event = new cc.Event.EventCustom("successRound", true);
            this.node.dispatchEvent(new cc.Event.EventCustom("nextRound", true));
            
        }, this);
    },

    // update (dt) {},
});
