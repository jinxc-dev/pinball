
cc.Class({
    extends: cc.Component,

    properties: {
      flag: {
        default: null,
        type: cc.Sprite
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
        this.round = 1;
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.body.gravityScale == 0) {
            otherCollider.body.gravityScale = 5;
        }
        var power = otherCollider.node.getComponent('ball').getPowerValue();
        var old_value = this.value;
        this.value -= power;

        if (this.value < 1) {
            power = old_value;
        }
        this.setScore(this.value);
        this.game.increaseSocre(power);
        this.runMove();

        if (this.value < 1) {
            var pos = this.node.position;
            this.game.removeBox(pos);
            //. 
            var event = new cc.Event.EventCustom("successRound", true);
            // event.setUserData(power);
            this.node.dispatchEvent(event);

            this.node.removeFromParent();
        }

        
    },

    start() {
        let that = this;
    },
 
    update(dt) {

    },
    setScore(value) {
        this.value  = value;
        this.scoreLabel.string = value;
    },

    plusPosY(value) {
        this.box.setPositionY(0.1);
    },

    setUponStatus(status) {
        this.box.getComponent('shape').status = status;
    },

    init(game, round) {
        this.game = game;
        this.round = round;
        var texture = cc.textureCache.addImage(cc.url.raw("resources/image/flags/" + this.round + ".png"));
        this.flag.spriteFrame = new cc.SpriteFrame(texture);
    },

    runMove() {
        var m_stepX1 = cc.moveBy(0.05, 0, 1.5).easing(cc.easeElasticInOut());
        var m_stepX2 = cc.moveBy(0.05, 0, -1.5).easing(cc.easeElasticInOut());
        var se = cc.sequence(m_stepX1, m_stepX2);
        this.node.stopAction();
        this.node.runAction(se);//.repeat(3);
    }

    

});