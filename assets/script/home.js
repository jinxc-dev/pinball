
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
        }
    },


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -320);
        cc.director.getCollisionManager().enabled = true;
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
            console.log('Clicke Round Start Btn');
            this.loadRoundGame(1);
        }, this);

        this.node.on('closeGameScene', function() {
            this.closeMainGame();
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
        this.gameSceneLayout.node.active = false;

    },
    loadRoundGame(n) {
        this.gameSceneLayout.node.removeAllChildren();
        var scene = cc.instantiate(this.roundGamePrefab);
        this.gameSceneLayout.node.active = true;
        this.gameSceneLayout.node.addChild(scene);
        scene.position = cc.v2(0, 0);
        scene.getComponent('roundGame').init(1);
    }

    // update (dt) {},
});
