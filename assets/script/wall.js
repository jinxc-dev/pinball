
cc.Class({
    extends: cc.Component,
    properties: {
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.body.gravityScale == 0) {
            otherCollider.body.gravityScale = 10;
        }
    },

    start () {

    },

    // update (dt) {},
});
