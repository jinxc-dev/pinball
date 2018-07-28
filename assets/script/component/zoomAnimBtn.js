
cc.Class({
    extends: cc.Component,

    properties: {
        duration: 1

    },

    onLoad() {
        this.vibrateShape();
    },
    start () {
        

    },

    update (dt) {
        
    },

    vibrateShape() {
        var m_stepX1 = cc.scaleTo(this.duration, 0.9, 0.9);
        var m_stepX2 = cc.scaleTo(this.duration, 1);
        var se = cc.sequence(m_stepX1, m_stepX2);
        
        var re = cc.repeatForever(se);
        this.node.runAction(re);
    },
});
