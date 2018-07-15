cc.Class({
    extends: cc.Component,

    properties: {
        impulse: cc.v2(0, 1000)
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        var manifold = contact.getWorldManifold();
        return;
        // if (manifold.normal.y < 1) return;

        let body = otherCollider.body;
        let pos = manifold.points[0];

        if ((pos.x > this._val.right || pos.x < this._val.left) && pos.y < this._val.top) {
            this.impulse = cc.v2(0, 10000);
        } else if (pos.x > this._val.left || pos.x < this._val.center) {
            if (pos.y < this._val.bottom) {
                this.impulse = cc.v2(-1000, 50);
            } else if (pos.y > this._val.top) {
                this.impulse = cc.v2(500, 0);
            }
        } else if (pos.x < this._val.right || pos.x > this._val.center) {
            if (pos.y < this._val.bottom) {
                this.impulse = cc.v2(1000, 50);
            } else if (pos.y > this._val.top) {
                this.impulse = cc.v2(-500, 0);
            } 
        }
        console.log(pos.x);
        body.linearVelocity = cc.v2();
        body.applyLinearImpulse(this.impulse, body.getWorldCenter(), true);
    },

    // use this for initialization
    onLoad: function () {
        this._val = {
            left: 20,
            right: 600,
            top: 800,
            bottom: 120,
            center: 320
        }
        // this.limit_right = cc.v2(this.node.width - 20)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
