
cc.Class({
    extends: cc.Component,

    properties: {
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
      this.value = 0;
      this.scoreLabel.node.color = cc.color(0, 0, 0, 255);
      this.scoreLabel.string = this.value;
      this.box.setPosition(cc.v2(0, 0));

    },

    start() {
        let that = this;
        this.node.on("box_shot", function() {
            that.value --;
            that.setScore(that.value);
            that.node.parent.parent.parent.getComponent('game').increaseSocre();
            if (that.value === 0) {
                that.node.removeFromParent();
            }
        });

      
    },
 
    update(dt) {

    },
    setScore(value) {
      this.value  = value;
      this.scoreLabel.string = value;
      var shape = this.box.getComponent('shape');
      shape.setValue(value);
    },
    plusPosY(value) {
      // this.scoreLabel.node.y += value;
      this.box.y = cc.random0To1;

      console.log("YYYY:" + this.node.y);
      console.log("BOX-SHAP:" + this.box.y);

    }
});