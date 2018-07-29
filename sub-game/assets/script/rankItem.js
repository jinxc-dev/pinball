cc.Class({
    extends: cc.Component,
    properties: {
        crownSprite: cc.Node,
        rankLabel: cc.Label,
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        topScoreLabel: cc.Label,
    },
    onLoad() {
        this.rankColor = [
            new cc.Color(254, 227, 88, 255),
            new cc.Color(198, 211, 226, 255),
            new cc.Color(248, 169, 108, 255),
        ];
    },
    start() {

    },

    init: function (rank, data) {
        let avatarUrl = data.avatarUrl;
        let nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
        // let nick = data.nickname;
        let grade = data.KVDataList.length != 0 ? data.KVDataList[0].value : 0;

        if (rank < 3) {
            this.crownSprite.color = this.rankColor[rank];
            this.crownSprite.active = true;
        } else {
            this.crownSprite.active = false;
        }

        this.rankLabel.string = (rank + 1).toString();
        this.createImage(avatarUrl);
        this.nickLabel.string = nick;
        this.topScoreLabel.string = grade.toString();
    },
    createImage(avatarUrl) {
        if (window.wx != undefined) {
            if (avatarUrl == "") {
                this.avatarImgSprite.node.active = false;
                return;
            }
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        this.avatarImgSprite.node.active = false;
                    }
                };
                image.src = avatarUrl;
            }catch (e) {
                cc.log(e);
                this.avatarImgSprite.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

});
