cc.Class({
    extends: cc.Component,

    properties: {
        anim: {
            default: null,
            type: cc.Animation
        }
    },

    init (game) {
        this.game = game;
        this.anim.getComponent('delAnim').init(this);
    },

    despawn () {
        this.game.despawnDelBox(this.node);
    },

    play: function () {
        this.anim.play('del_box');
    }
});
