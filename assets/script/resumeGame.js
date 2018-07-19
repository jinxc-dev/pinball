cc.Class({
    extends: cc.Component,

    properties: {
       closeBtn: {
           default: null,
           type: cc.Node
       },
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.game = null;
    },
    init (game) {
        console.log('init function');
        this.game = game;
    },

    start () {
        let self = this;
        this.closeBtn.on('touchend', function(){
            console.log('closeBtn');
            self.node.active = false;
            self.game.resumeGameStatus();
        });

    },

    update (dt) {

    },
});
