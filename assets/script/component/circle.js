
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      value: 0
    },

    onLoad() {
      this.graphics = this.node.addComponent(cc.Graphics);
      this.graphics.lineWidth = 2;
    },

    update(dt) {
      this.graphics.clear();
      this.graphics.fillColor = this.color;

      // this.graphics.fillRect(0, 0, this.node.width, this.node.height);
      this.graphics.circle(50, 50, 50);
      this.graphics.fill();
    }
});