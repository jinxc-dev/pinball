
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      value: 0,
      status: 0,
      rotate: 1,
      type: 0
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.body.gravityScale == 0) {
            otherCollider.body.gravityScale = 5;
        }
        this.runMove();
        var event = new cc.Event.EventCustom("box_shot", true);
        var power = otherCollider.node.getComponent('ball').getPowerValue();
        event.setUserData(power);
        this.node.dispatchEvent(event);
    },

    onLoad() {
        this.colorList = [
            cc.color(128, 184, 243, 255),
            cc.color(151, 114, 253, 255),
            cc.color(66, 244, 163, 255),
            cc.color(218, 247, 0, 255),
            cc.color(241, 184, 51, 255),
            cc.color(253, 112, 101, 255)
        ];
        this.color = this.colorList[0];
        let body = this.node.getComponent(cc.RigidBody);
        body.enabledContactListener = true;        
    },

    start() {
        if (this.rotate == 1) {
            this.node.setRotation(Math.ceil(cc.random0To1() * 180));
        }
        this.node.x = 0;
        this.node.y = 0;
        this.status = 0;
    },

    update(dt) {
        this.vibrateShape();
    },
    setValue(v) {
        this.value = v;
        var n = Math.ceil(v / 10);
        n = (n > 5) ? 5 : n; 
        if (this.type == 0) {
            this.node.color = this.colorList[n];
        }     
    },

    vibrateShape() {
        var d = 2;
        if (this.status == 1) {
            var m_stepX1 = cc.moveBy(0.05, 1, 1);//.easing(cc.easeElasticInOut());
            var m_stepX2 = cc.moveBy(0.05, -2, 0);//.easing(cc.easeElasticInOut());
            var m_stepX3 = cc.moveBy(0.05, 1, -1);//.easing(cc.easeElasticInOut());
            var callback = cc.callFunc(this.stopVibrate, this);
            var se = cc.sequence(m_stepX1, m_stepX2, m_stepX3, callback).repeat(5);
            this.node.runAction(se);
        } 
    },
    stopVibrate() {
        this.status = 0;
    },
    isRotation(b) {
        //. 1:rotation, 0:freeze
        this.rotate = b;
    },

    runMove() {
        var m_stepX1 = cc.moveBy(0.05, 0, 1.5).easing(cc.easeElasticInOut());
        var m_stepX2 = cc.moveBy(0.05, 0, -1.5).easing(cc.easeElasticInOut());
        var se = cc.sequence(m_stepX1, m_stepX2);
        this.node.stopAction();
        this.node.runAction(se);//.repeat(3);
    }
});