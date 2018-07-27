
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
    },

    onLoad() {
        this.value = 0;
        this.scoreLabel.node.color = cc.color(0, 0, 0, 255);
        this.scoreLabel.string = this.value;
        this.game;
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
            that.game.increaseSocre(step);

            that.runMove();
            if (that.value < 1) {
              var pos = that.node.position;
              that.game.removeBox(pos);   
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
        this.box.setPositionY(0.1);
    },

    setUponStatus(status) {
        this.box.getComponent('shape').status = status;
    },
    init(game, rotate) {
        this.game = game;
        this.box.getComponent('shape').isRotation(rotate);
    },

    runMove() {
        var m_stepX1 = cc.moveBy(0.05, 0, 1);//.easing(cc.easeElasticInOut());
        var m_stepX2 = cc.moveBy(0.05, 0, -1);//.easing(cc.easeElasticInOut());
        var se = cc.sequence(m_stepX1, m_stepX2);
        this.node.stopAction();
        this.node.runAction(se);//.repeat(3);
    }

});