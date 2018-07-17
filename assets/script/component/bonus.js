
cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255, 255),
      type: 0,
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
    },

    start() {
    },

    update(dt) {

    },
});