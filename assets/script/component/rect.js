
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      value: 0,
      alpha: 20
    },

    onLoad() {
      this.graphics = this.node.addComponent(cc.Graphics);
      this.graphics.lineWidth = 2;
      this.node.setRotation(this.alpha);


    },

    update(dt) {
      this.graphics.clear();
      this.graphics.fillColor = this.color;
      this.graphics.fillRect(0, 0, this.node.width, this.node.height);
  

    }
});