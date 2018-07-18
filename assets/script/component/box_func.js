
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
      },
      status: 1
    },

    onLoad() {
        this.value = 0;
        this.status = 1;
        this.scoreLabel.node.color = cc.color(0, 0, 0, 255);
        this.scoreLabel.string = this.value;
        this.box.setPosition(cc.v2(0, 0));

    },

    start() {
        let that = this;
        this.node.on("box_shot", function(event) {
            var old_value = that.value;
            var step = event.getUserData();
            that.value -= step;

            if (that.value < 1) {
              step = old_value;
            }
            that.setScore(that.value);
            that.node.parent.parent.parent.getComponent('game').increaseSocre(step);

            if (that.value < 1) {
              var pos = that.node.position;
              that.node.parent.parent.parent.getComponent('game').removeBox(pos);   
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
        this.box.setPositionY(cc.random0To1);
    },

    setUponStatus(status) {
        this.box.getComponent('shape').status = status;
    }

});