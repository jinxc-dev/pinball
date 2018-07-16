cc.Class({
    extends: cc.Component,

    properties: {
        impulse: cc.v2(0, 1000)
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {

        var manifold = contact.getWorldManifold();
        var v_normal = manifold.normal;
        let body = otherCollider.body;
        var event = new cc.Event.EventCustom("slow_ball", true);
        event.setUserData(v_normal);
        otherCollider.node.dispatchEvent(event);
        return;
    },

    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
