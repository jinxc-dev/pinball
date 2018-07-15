
cc.Class({
    extends: cc.Component,

    properties: {
      value: 20,
      type: 0,
      box: {
        default: null,
        type: cc.Node
      },
      scoreLabel: {
        default: null,
        type: cc.Label
      }
    },

    onLoad() {

    },

    start() {
      this.node.on("touchend", function(){
        this.node.dispatchEvent(new cc.Event.EventCustom("fish_catch"), true);
        this.node.removeFromParent();
      }, this);

      this.scoreLabel.string = this.value;
    },

    update(dt) {

      // var fish = cc.instantiate(cc.Node);
      // var moveby = cc.moveBy(1, x, y);
      // var sequence = cc.sequence(moveby, cc.removeSlef(true));
      // fish.runAction(sequence);
    }
});