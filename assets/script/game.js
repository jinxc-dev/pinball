
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
        shotStart: false,
        bar : {
            default: null,
            type: cc.Sprite
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2 (0, -320);        
        //. game score
        this.score = 0;

        //. ball object's array
        this.ballObj = [];
     },

    start () {
        this.initGame();
        this.generateBox(5);

        var self = this;

        this.gameLayout.node.on("touchend", function(event){            
            self.shotStart = true;
            self.shotInfo.pos = self.calcSpeedOfBall(self.shotInfo.pos, self.shotInfo.d);
            self.showBar(false);

        });

        this.gameLayout.node.on("touchmove", this.onTouchMove, this);

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

            let comp = self.ballObj[self.ballPut].getComponent('ball');

            comp.setInitSpeed(self.shotInfo.pos);
            comp.setRigidActive(true);
        }, 0.1); 
       
    },

    update (dt) {

    },

    initGame () {

        //. ball put cnt
        this.ballPut = this.ballCnt;

        //. ball init position.
        this.gameRegion = cc.rect(0, 0, this.gameLayout.node.width, this.gameLayout.node.height);
        this.initBallPos = cc.v2(this.gameRegion.width / 2, this.gameRegion.height);

        //. shot information
        this.shotInfo= {
            alpha: 0,
            pos: cc.v2(0, 1),
            d: 1000,
            scale: 0.3
        };

        this.ScoreLabel.string = this.score;
        this.BallLabel.string = this.ballCnt;
        this.gameLayout.node.width = this.node.width;
        this.gameLayout.node.height = this.node.height;


        for (var i = 0; i < this.ballCnt; i++) {
            this.ballObj.push(this.createBall(this.initBallPos, i));
        }    
   
    },

    //. touchend event 
    onTouchEnd(event) {
        let pos = event.getLocation();
    },
    onTouchMove(event, d, e) {
        let pos = event.getLocation();
        this.getShotPosInfo(pos);
        this.bar.node.setScale(this.shotInfo.scale, this.shotInfo.scale);
        this.bar.node.setRotation(this.shotInfo.alpha);

    },
    //. ball shot information
    getShotPosInfo(pos) {
        let len_x = pos.x - this.node.width / 2;
        let len_y = pos.y - this.node.height / 2 - this.initBallPos.y;

        // this.bar.node.setRotation(-20);
        if (len_y > 0)
            return;
        let scale_v = Math.abs(len_y) / this.bar.node.height;
        let angle_v = Math.atan(len_x / len_y) * 180 / Math.PI;

        scale_v = (scale_v > 1) ? 1 : scale_v;
        scale_v = (scale_v < 0.2) ? 0.2 : scale_v;
        
        this.shotInfo.scale = scale_v;
        this.shotInfo.pos = cc.v2(len_x, len_y);
        this.shotInfo.alpha = angle_v;
    },

    calcSpeedOfBall(pos, d) {
        var dd = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        let x, y;
        x = d / dd * pos.x;
        y = d / dd * pos.y;
        return cc.v2(x, y);
    },

    showBar(status) {
        this.bar.node.active = status;
    },

    //. box function.
    generateBox(n) {
        var w_size = 40;

        for (var i = 0; i < n; i++) {
            var w_n = Math.floor(this.scoreBoxs.length * cc.random0To1());
            var w_w = this.generateBoxPosX(w_size, i);
            var v = this.generateValue(10, i * 10);
            this.createBox(w_n, cc.v2(w_w, w_size / 2), v);
        }

    },
    generateBoxPosX(w, n) {
        var w_width = this.gameRegion.width / 5;
        var delta = (w_width - w) / 2 * cc.random0To1();
        return w_width * n + delta + w / 2;
    },

    createBox(n, pos, value) {
        var w_box = cc.instantiate(this.scoreBoxs[n]);
        this.gameLayout.node.addChild(w_box);

        w_box.getComponent('box_func').setScore(value);
        w_box.setPosition(pos);
    },

    generateValue(start, end) {
        var a = start;
        var b = end;
        if (end < start) {
            a = end;
            b = start;
        } 
        return Math.round((b - a) * cc.random0To1()) + a;
    },

    //. about ball
    createBall(pos, n) {
        var newball = cc.instantiate(this.ballPrefab);
        var comp = newball.getComponent('ball');
        this.gameLayout.node.addChild(newball);
        newball.setPosition(pos);
        return newball;        
    },

    //. increase score function
    increaseSocre() {
        this.score ++;
        this.ScoreLabel.string = this.score;
    }
});
