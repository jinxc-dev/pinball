
cc.Class({
    extends: cc.Component,

    properties: {
        subCanvas: {
            default: null,
            type: cc.Sprite
        },
        closeBtn: {
            default: null,
            type: cc.Node
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (window.wx != undefined) {
            window.wx.showShareMenu({withShareTicket: true});
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 640;
            window.sharedCanvas.height = 1136;
        }

        this.closeBtn.on('btnClicked', function(){
            this.node.active = false;
        }, this);
    },
    //. k_round, k_total
    submitScore(key, score){
        if (window.wx != undefined) {
            window.wx.postMessage({
                messageType: "sendScore",
                key: key,
                score: score,
            });
        } else {
            cc.log("fail: x_total : " + score)
        }
    },

    rankList(key) {
        if (window.wx != undefined) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: "rankList",
                key: key
            });
        } else {
            cc.log("fail rank list:" + key);
        }
    },

    _updateSubCanvas() {
        if (window.sharedCanvas != undefined && this.tex) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.subCanvas.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update() {
        this._updateSubCanvas();
    },
});
