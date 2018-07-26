
cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: {
            default: null,
            type: cc.Label
        },
        flag: {
            default: null,
            type: cc.Sprite
        },
        checkNode: {
            default: null,
            type: cc.Node
        },
        lockNode: {
            default: null,
            type: cc.Node
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.list = null;
        this.info = null;
    },

    start () {

    },

    //. info
    //. number, status:(pass, ready, lock), score: 0 
    init(list, info) {
        this.list = list;
        this.info = info;
        var n = this.info.number;

        this.titleLabel.string = "第" + info.number + "关";
        this.scoreLabel.string = "得分:" + info.score;

        var texture = cc.textureCache.addImage(cc.url.raw("resources/image/flags/" + n + ".png"));
        this.flag.spriteFrame = new cc.SpriteFrame(texture);


        if (info.status == 'lock') {
            this.checkNode.active = false;
            this.flag.node.active = false;
            this.scoreLabel.node.active = false;
        } else if (info.status == 'ready') {
            this.lockNode.active = false;
            this.checkNode.active = false;
        } else if (info.status == 'pass') {
            this.lockNode.active = false;
        }
    }

    // update (dt) {},
});
