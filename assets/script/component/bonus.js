
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      type: 0,
      status: 0,
    },

    onCollisionEnter: function (other, self) {
        if (this.type == 0 ) { //. ball add
            var event = new cc.Event.EventCustom("add_ball", true);
            event.setUserData(this.node.position);
            this.node.dispatchEvent(event);
        } else {
            other.node.dispatchEvent(new cc.Event.EventCustom("power_ball", true));
        }
        this.node.removeFromParent();
    },

    onLoad() {  
      this.status = 0;    
    },

    start() {
    },

    update(dt) {
        this.vibrateShape();

    },
    vibrateShape() {
        var d = 0.3;
        if (this.status == 1) {
            var m_stepX1 = cc.moveBy(0.2, d, d).easing(cc.easeCubicActionOut());
            var m_stepX2 = cc.moveBy(0.2, -d, -d).easing(cc.easeCubicActionOut());
            var callback = cc.callFunc(this.stopVibrate, this);
            var se = cc.sequence(m_stepX1, m_stepX2, callback);
            this.node.runAction(se).repeat(5);
        } 
    },
    stopVibrate() {
        this.status = 0;
    },
    setUponStatus(status) {
        this.status = status;
    }

});