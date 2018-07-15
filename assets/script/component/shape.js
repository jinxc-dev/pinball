
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      type: 0,
      value: 0
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
      console.log('XC enter');
      this.node.dispatchEvent(new cc.Event.EventCustom("box_shot", true));
    },

    onLoad() {
      this.colorList = [
        cc.color(128, 184, 243, 255),
        cc.color(151, 114, 253, 255),
        cc.color(66, 244, 163, 255),
        cc.color(218, 247, 0, 255),
        cc.color(241, 184, 51, 255),
        cc.color(236, 86, 27, 255)
      ];
      this.color = this.colorList[0];
      let body = this.node.getComponent(cc.RigidBody);
      body.enabledContactListener = true;
    },

    start() {
      this.graphics = this.node.addComponent(cc.Graphics);
      // this.graphics.anchor
      this.node.setRotation(Math.ceil(cc.random0To1() * 180));
      this.node.x = 0;
      this.node.y = 0;

      console.log("type:" + this.type);
    },

    update(dt) {
      this.graphics.clear();
      this.graphics.fillColor = this.color;
      var r = this.node.width / 2;
      if (this.type === 0) {
        // draw rect
        this.graphics.rect(0, 0, this.node.width, this.node.height);
      } else if (this.type === 1) {
        // draw circle
        this.graphics.circle(r, r, r);
      } else if (this.type === 2) {
        //. draw triangle
        this.graphics.moveTo(30, 0);
        this.graphics.lineTo(0, 52);
        this.graphics.lineTo(60, 52);
        this.graphics.lineTo(30, 0);
      }
      this.graphics.fill();

    },
    setValue(v) {
      this.value = v;
      var n = Math.ceil(v / 10);
      n = (n > 5) ? 5 : n;      
      this.color = this.colorList[n];
    }
});