
cc.Class({
    extends: cc.Component,

    properties: {
        duration: 0.5

    },

    onLoad() {
        this.vibrateShape();
    },
    start () {
        

    },

    update (dt) {
        
    },

    vibrateShape() {
        var m_stepX1 = cc.scaleTo(this.duration, 0.8, 0.8).easing(cc.easeCubicActionOut());
        var m_stepX2 = cc.scaleTo(this.duration, 1).easing(cc.easeCubicActionOut());
        var se = cc.sequence(m_stepX1, m_stepX2);
        
        var re = cc.repeatForever(se);
        this.node.runAction(re);
    },
});
