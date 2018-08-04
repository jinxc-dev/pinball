
cc.Class({
    extends: cc.Component,

    properties: {
        okBtn: cc.Node,
        content: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    init(game) {
        this.game = game;
        this.node.active = false;
        this.contentArray = [];
    },

    start () {
        this.okBtn.on('touchend', function(){
            if (this.contentArray.length == 0) {
                this.node.active = false;
            } else {
                this.content.string = this.contentArray.shift();
            }
        }, this);
    },

    setContent(content) {
        this.contentArray = content;
        this.content.string = this.contentArray.shift();
        this.node.active = true;        
    },
    onEnable() {
        this.game.pauseGameEvent();
    },

    onDisable() {
        this.game.resumeGameEvent();
    }

    // update (dt) {},
});
