
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      type: 0
    },

    onLoad() {
      
    },

    start() {
      this.graphics = this.node.addComponent(cc.Graphics);
      this.node.setRotation(Math.ceil(cc.random0To1() * 180));
      this.node.x = 0;
      this.node.y = 0;
    },

    update(dt) {
      this.graphics.clear();
      this.graphics.fillColor = new cc.Color(0, 0, 255, 255);
      this.graphics.fillRect(0, 0, this.node.width, this.node.height); 

    }
});