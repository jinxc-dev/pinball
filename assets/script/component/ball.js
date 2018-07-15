
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      value: 0
    },

    onLoad() {

      this.graphics = this.node.addComponent(cc.Graphics);
      this.graphics.lineWidth = 2;
      this.R = 15;
      this._rigid = this.node.getComponent(cc.RigidBody);

    },    
    start () {
      this.setRigidActive(false);
    },

    update(dt) {
      this.graphics.clear();
      this.graphics.fillColor = this.color;
      this.graphics.circle(this.R, this.R, this.R);
      this.graphics.fill();
    },
    showLog() {
      console.log("ball-value " + this.value);
      
    },
    setRigidActive(status) {
      // console.log("ball-status-set: " + status);
      this._rigid.active = status;
    },
    setInitSpeed(pos) {
      this._rigid.linearVelocity = pos;
    }
});