cc.Class({
    extends: cc.Component,

    properties: {
        mainGamePrefab: {
            default: null,
            type: cc.Prefab
        },
        roundGamePrefab: {
            default: null,
            type: cc.Prefab
        },
        mainStatBtn: {
            default: null,
            type: cc.Node
        },
        roundListBtn: {
            default: null,
            type: cc.Node
        },
        roundStartBtn: {
            default: null,
            type: cc.Node
        },
        roundListLayout: {
            default: null,
            type: cc.Layout
        },
        gameSceneLayout: {
            default: null,
            type: cc.Layout
        },
        rankViewLayout: {
            default: null,
            type: cc.Layout
        },
        roundRankViewBtn: {
            default: null,
            type: cc.Node
        },
        chartBtn: {
            default: null,
            type: cc.Node
        },
        friendBtn: {
            default: null,
            type: cc.Node
        },
    },


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -320);
        cc.director.getCollisionManager().enabled = true;
        // cc.sys.localStorage.removeItem("ballGroupCnt");
        // cc.sys.localStorage.removeItem("roundScore");

        this.gameStorageCheck("roundScore", []);
        this.gameStorageCheck("ballGroupCnt", 0);
        

        this.rankViewLayout.node.active = false;

        // this.loadResource();
    },

    start () {
        this.mainStatBtn.on('btnClicked', function(){
            console.log('Click Main Stat');
            this.loadMainGame();
        }, this);
        this.roundListBtn.on('btnClicked', function(){
            this.roundListLayout.node.active = true;
        }, this);
        this.roundStartBtn.on('btnClicked', function() {
            var w_tmp = cc.sys.localStorage
            var r_score = w_tmp.getItem("roundScore");
            var r_array = r_score;
            if (!Array.isArray(r_score)) {
                r_array = r_score.split(",");
            }
            this.loadRoundGame(r_array.length + 1);
        }, this);

        this.node.on('closeGameScene', function() {
            this.closeMainGame();
        }, this);

        this.node.on('roundLoadGame', function(event){
            var round = event.getUserData();
            
            this.loadRoundGame(round);
            this.roundListLayout.node.active = false;
        }, this);

        //. round rank view event
        this.roundRankViewBtn.on('btnClicked', function(){
            var event = new cc.Event.EventCustom("rankListView", true);
            var data = {
                key: "k_round"
            };

            event.setUserData(data);
            this.node.dispatchEvent(event);
        }, this);

        this.chartBtn.on('btnClicked', function(){
            var event = new cc.Event.EventCustom("rankListView", true);
            var data = {
                key: "k_total"
            };
            event.setUserData(data);
            this.node.dispatchEvent(event);
        }, this);

        this.node.on("sendScore", function(event){
            var data = event.getUserData();
            this.rankViewLayout.node.getComponent("rankView").submitScore(data.key, data.score);
        }, this);

        this.node.on("rankListView", function(event){
            var data = event.getUserData();
            this.rankViewLayout.node.active = true;
            this.rankViewLayout.node.getComponent("rankView").rankList(data.key);
        }, this);

        this.friendBtn.on('touchend', function() {
            console.log("friendBtn");
            // window.wx.showShareMenu({withShareTicket : true});
            // window.wx.getShareInfo({withShareTicket : true});
            if (window.wx != undefined) {
                window.wx.shareAppMessage({title: 'PinBall', imageUrl: 'https://wx1.sinaimg.cn/mw1024/59a47337ly1frj7nve36uj20kd0cqamo.jpg', query: "from=group"});
            }

            // // this.rankViewLayout.node.getComponent("rankView").getLaunchOptionsSync();

        },this);

    },

    loadMainGame() {
        this.gameSceneLayout.node.removeAllChildren();
        var scene = cc.instantiate(this.mainGamePrefab);
        this.gameSceneLayout.node.active = true;
        this.gameSceneLayout.node.addChild(scene);
        // scene.setScale(0.8, 1);
        // if (cc.sys.platform == cc.sys.ANDROID) {
        //     var rr = cc.sys.windowPixelResolution.width / cc.sys.windowPixelResolution.height / 0.5633;
        //     scene.scaleX = rr;
        // }
    },
    closeMainGame() {
        this.gameSceneLayout.node.removeAllChildren();
        cc.director.getPhysicsManager().enabled = true;
        this.gameSceneLayout.node.active = false;
        // this.node. resumeSystemEvents(true);


    },
    loadRoundGame(n) {
        this.gameSceneLayout.node.removeAllChildren();
        var scene = cc.instantiate(this.roundGamePrefab);
        this.gameSceneLayout.node.active = true;
        this.gameSceneLayout.node.addChild(scene);
        // if (cc.sys.platform == cc.sys.ANDROID) {
        //     var rr = cc.sys.windowPixelResolution.width / cc.sys.windowPixelResolution.height / 0.5633;
        //     scene.scaleX = rr;
        // }
        scene.position = cc.v2(0, 0);
        scene.getComponent('roundGame').init(n);

        // this.node.pauseSystemEvents(true);
    },

    gameStorageCheck(key, value) {
        var ls = cc.sys.localStorage;
        var r = ls.getItem(key);
        if (r == "" || r == null) {
            ls.setItem(key, value);
        }
    },

    // loadResource() {        
    //     var bg = cc.find('MainScene/back').getComponent(cc.Sprite);
    //     bg.spriteFrame = new cc.SpriteFrame(tex);
    // }

    // update (dt) {},
});
