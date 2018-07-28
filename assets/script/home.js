
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
        }
    },


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -320);
        cc.director.getCollisionManager().enabled = true;
        var ls = cc.sys.localStorage;
        var r = ls.getItem("roundScore");
        if (r == "") {
            ls.setItem("roundStore", []);
        }
        this.rankViewLayout.node.active = false;
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
            this.loadRoundGame(r_array.length);
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

    },

    loadMainGame() {
        this.gameSceneLayout.node.removeAllChildren();
        var scene = cc.instantiate(this.mainGamePrefab);
        this.gameSceneLayout.node.active = true;
        this.gameSceneLayout.node.addChild(scene);
        // scene.position = cc.v2(0, 0);
    },
    closeMainGame() {
        this.gameSceneLayout.node.removeAllChildren();
        cc.director.getPhysicsManager().enabled = true;
        this.gameSceneLayout.node.active = false;

    },
    loadRoundGame(n) {
        this.gameSceneLayout.node.removeAllChildren();
        var scene = cc.instantiate(this.roundGamePrefab);
        this.gameSceneLayout.node.active = true;
        this.gameSceneLayout.node.addChild(scene);
        scene.position = cc.v2(0, 0);
        scene.getComponent('roundGame').init(n);
    }

    // update (dt) {},
});
