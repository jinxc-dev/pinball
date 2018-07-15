
cc.Class({
    extends: cc.Component,

    properties: {
        ScoreLabel: {
            default: null,
            type: cc.Label
        },

        BallLabel: {
            default: null,
            type: cc.Label
        },

        scoreBoxs : {
            default: [],
            type: cc.Prefab,
        },
        ballPrefab: {
            default:null,
            type: cc.Prefab
        },
        gameLayout: {
            default: null,
            type: cc.Layout
        },
        ballCnt: 10,
        readyStatus: false,
        shotStart: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -320);        
     },

    start () {
        this.initGame();

        this._tt = false;

        var self = this;

        this.gameLayout.node.on("touchend", function(event){
            
            self.shotStart = true;

        });

        this.schedule(function() {
            if (self.shotStart == false){
                return;
            }
            self.ballPut --;
            console.log("PUT Ball:" + self.ballPut);

            if (self.ballPut < 0 ) {
                self.shotStart = false;
                return;
            }

            let comp = self.ballObj[self.ballPut].getComponent('ball').setRigidActive(true);
        }, .1); 
        
    },

    update (dt) {

    },

    initGame () {
        //. game score
        this.score = 0;

        //. ball object's array
        this.ballObj = [];

        //. ball put cnt
        this.ballPut = this.ballCnt;

        //. ball init position.
        this.initBallPos = cc.v2(0, 400);

        this.ScoreLabel.string = this.score;
        this.BallLabel.string = this.ballCnt;
        this.gameLayout.node.width = this.node.width;
        this.gameLayout.node.height = this.node.height;


        for (var i = 0; i < this.ballCnt; i++) {
            this.ballObj.push(this.createBall(this.initBallPos, i));
        }    
   
    },

    createBall(pos, n) {
        var newball = cc.instantiate(this.ballPrefab);
        var comp = newball.getComponent('ball');
        this.gameLayout.node.addChild(newball);
        newball.setPosition(pos);
        return newball;        
    },

    //. touchend event 
    onTouchEnd(event) {
        let pos = event.getLocation();
    }


});
