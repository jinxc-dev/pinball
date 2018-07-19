
cc.Class({
    extends: cc.Component,

    properties: {
        color: new cc.Color(255, 255, 255, 255),
        status: 0,
        power: 1
    },

    onLoad() {
        this._rigid = this.node.getComponent(cc.RigidBody);
        this.R = this.node.width / 2;
        this.init();
        this.power = 1;
        let self = this;

        this.node.on("slow_ball", function(event) {
            self.status ++;
            var normal = event.getUserData();
            var p = cc.v2(-100, 300);
            self._rigid.linearVelocity = cc.v2(p.x / normal.x, p.y * normal.y);
        });
        this.node.on("power_ball", function(event) {
            self.power ++;
        });
    },

    init() {
        this.status = 0;
        this._rigid.gravityScale = 0;
        this.color = cc.color(255, 255, 255, 255);
    },

    start () {      
      this.setRigidActive(false);
    },

    update(dt) {
        if (this.status > 1) {
            this.setRigidActive(false);
            this.node.y = 190;
            var xx = 300;
            this.node.color = cc.color(255,246, 175, 255);       
        
            if (this.node.x > 320) {
                this.node.x = 620;
                xx = -300;
            } else {
                this.node.x = 20;
            }
            this.status = -1;

            var m_step1 = cc.moveBy(.5, 0, 920).easing(cc.easeCubicActionOut());
            var m_step2 = cc.moveBy(.5, xx, -130).easing(cc.easeCubicActionOut());
            var callback = cc.callFunc(this.readyStatus, this);
            var se = cc.sequence(m_step1, m_step2, callback);
            this.node.runAction(se);
        } 
    },
    showLog() {
      
    },
    setRigidActive(status) {
        this._rigid.active = status;
    },
    setInitSpeed(pos) {
        this._rigid.linearVelocity = pos;
    },

    readyStatus() {
        this.init();
        var event = new cc.Event.EventCustom("comeback_ball", true);
        this.node.dispatchEvent(event);
        this.node.color = cc.color(255,255,255, 255);
    },
    getPowerValue() {
        return this.power;
    }

    
});