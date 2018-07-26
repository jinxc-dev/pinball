
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
        delBoxAnim: {
            default: null,
            type:cc.Prefab
        },  
        gameLayout: {
            default: null,
            type: cc.Layout
        },
        boxsNode: {
            default: null,
            type: cc.Node
        },
        ballCnt: 25,
        shotStarted: false,
        shotReadyStatus: true,
        gameLevel: 1,
        bar : {
            default: null,
            type: cc.Sprite
        },
        backBtn: {
            default: null,
            type: cc.Node
        },
        resumeBtn: {
            default: null,
            type: cc.Node
        },
        resumeLayout:  {
            default: null,
            type: cc.Layout
        },
        gameoverLayout: {
            default:null,
            type: cc.Layout
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.score = 0;
        this.itemCnt = 5;
        this.round = 1;

        //. ball object's array
        this.ballObj = [];
        this.delBoxPool = new cc.NodePool('delBox');
        this.initGame();
     },

    start () {
        
       

        var self = this;

        this.gameLayout.node.on("touchend", function(event){
            if (self.shotReadyStatus) {
                self.shotStarted = true;
                self.shotReadyStatus = false;
                self.shotInfo.pos = self.calcSpeedOfBall(self.shotInfo.pos, self.shotInfo.d);
                self.showBar(false);
            }
        });

        this.resumeBtn.on("touchend", function(){
            self.resumeLayout.node.active = true;
            self.resumeLayout.node.getComponent('resumeGame').init(self);
            self.pauseGameStatus();
        });

        this.gameLayout.node.on("comeback_ball", function(){
            self.ballPut ++;
            self.shotStarted = false;
            if (self.ballPut == self.ballCnt) {
                self.shotReadyFunc();
            }
        });

        this.gameLayout.node.on("touchmove", this.onTouchMove, this);

        this.gameLayout.node.on("add_ball", function(event){
            console.log("Add-Ball");
            var pos = event.getUserData();
            var w_ball = self.createBall(pos);     

            self.scheduleOnce(function() {
               var body = w_ball.getComponent(cc.RigidBody);
               body.active = true;
               body.gravityScale = 5;
               body.linearVelocity = cc.v2(0, -500);
            }, 0.1); 
            self.ballObj.push(w_ball);

            self.ballCnt++;
            self.BallLabel.string = self.ballCnt;
        });

        this.schedule(function() {
            if (self.shotReadyStatus){
                return;
            }

            if (self.shotStarted == false) 
                return;
            if (self.ballPut == 0)
                return;
            
            self.ballPut--;
            console.log('ball cnt:' + self.ballPut);

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

        this.shotReadyStatus = true;
        this.shotStarted = false;

        //. ball init position.
        this.gameRegion = cc.rect(0, 0, this.gameLayout.node.width, this.gameLayout.node.height);

        this.initBallPos = cc.v2(320, 950);
        this.initBoxPos = new cc.Rect(50, 200, 540, 935);
        this.stepY = this.initBoxPos.height / 9.5;

        this.ScoreLabel.string = this.score;
        this.BallLabel.string = this.ballCnt;
        this.gameLayout.node.width = this.node.width;
        this.gameLayout.node.height = this.node.height;


        for (var i = 0; i < this.ballCnt; i++) {
            this.ballObj.push(this.createBall(this.initBallPos));
        }       
   
    },

    //. touchend event 
    onTouchEnd(event) {
        let pos = event.getLocation();
    },
    onTouchMove(event, d, e) {
        if (this.shotReadyStatus) {
            let pos = event.getLocation();
            this.getShotPosInfo(pos);
            this.bar.node.setScale(this.shotInfo.scale, this.shotInfo.scale);
            this.bar.node.setRotation(this.shotInfo.alpha);
        }

    },
    //. ball shot information
    getShotPosInfo(pos) {
        let len_x = pos.x - this.node.width / 2;
        let len_y = pos.y - this.initBallPos.y;

        // this.bar.node.setRotation(-20);
        if (len_y > 0)
            return;
        let scale_v = Math.abs(len_y) / (this.bar.node.height);
        let angle_v = Math.atan(len_x / len_y) * 180 / Math.PI;

        scale_v = (scale_v > 1) ? 1 : scale_v;
        scale_v = (scale_v < 0.3) ? 0.3 : scale_v;
        
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

    createItem(n, pos, value, type) {
        var w_item;
        if (type == 0) {
            w_item = cc.instantiate(this.scoreBoxs[n]);
            this.boxsNode.addChild(w_item);
            w_item.getComponent('box_func').init(this);
            w_item.getComponent('box_func').setScore(value);
        }         
        w_item.setPosition(pos);
    },

    //. about ball
    createBall(pos) {
        var newball = cc.instantiate(this.ballPrefab);
        var comp = newball.getComponent('ball');
        this.gameLayout.node.addChild(newball);
        newball.setPosition(pos);
        return newball;        
    },

    //. increase score function
    increaseSocre(step) {
        this.score += step;
        this.ScoreLabel.string = this.score;
        // this.gainScore(cc.v2(100, 100));
    },

    //. shot ready function
    shotReadyFunc() {
        this.gameLevel ++;
        for (var i = 0; i < this.ballCnt; i++) {
            this.ballObj[i].x = this.initBallPos.x;
            this.ballObj[i].y = this.initBallPos.y;
        }
        this.showBar(true);
        this.shotReadyStatus = true;
        this.shotStarted = false;
        
        this.shotInfo= {
            alpha: 0,
            pos: cc.v2(0, 1),
            d: 1000,
            scale: 0.3
        };
        this.bar.node.setScale(this.shotInfo.scale, this.shotInfo.scale);
        this.bar.node.setRotation(this.shotInfo.alpha);
        this.updateBoxPosY();
    },

    updateBoxPosY() {
        var boxs = this.boxsNode.children;
        var limit_h = this.stepY * 7 + this.initBoxPos.y;
        var w_h = this.stepY * 6 + this.initBoxPos.y;
        for (var i = 0; i < boxs.length; i++) {
            boxs[i].y += this.stepY;
            if (boxs[i].name == 'box') {
                boxs[i].getComponent("box_func").plusPosY(this.stepY);
            }
            if (boxs[i].y > limit_h) {
                this.gameOver();
            }
            if (boxs[i].y > w_h) {
                if (boxs[i].name == 'box') {
                    boxs[i].getComponent("box_func").setUponStatus(1);
                } else {
                    boxs[i].getComponent("bonus").setUponStatus(1);
                }
            } 
        }
    },

    removeBox: function (pos) {

        var anim = this.spawnDelBox();
        this.boxsNode.addChild(anim.node);
        anim.node.setPosition(pos);
        anim.play();
    },

    spawnDelBox: function () {
        var fx;
        if (this.delBoxPool.size() > 0) {
            fx = this.delBoxPool.get();
            return fx.getComponent('delFX');
        } else {
            fx = cc.instantiate(this.delBoxAnim).getComponent('delFX');
            fx.init(this);
            return fx;
        }
    },

    despawnDelBox (anim) {
        this.delBoxPool.put(anim);
    },

    //. pause game
    pauseGameStatus() {
        this.gameLayout.node.pauseSystemEvents(true);
        this.gameLayout.node.pauseAllActions();
        cc.director.getPhysicsManager().enabled = false;
        for (var i = 0; i < this.ballObj.length; i++) {
            this.ballObj[i].pauseAllActions();
        }
    },
    //. resume game
    resumeGameStatus() {
        cc.director.getPhysicsManager().enabled = true;
        this.gameLayout.node.resumeSystemEvents(true);
        this.gameLayout.node.resumeAllActions();
        for (var i = 0; i < this.ballObj.length; i++) {
            this.ballObj[i].resumeAllActions();        
        }
    },

    gameOver() {
        this.gameoverLayout.node.active = true;
        this.gameoverLayout.node.getComponent('gameOver').setScore(this.score);
        this.pauseGameStatus();
    },

    getRoundInfo(n) {
        //. -1: main, 0: rect, 1: circle, 2: triangle
        var tmpN = n % 5;
        var data = [
            //. 1 round
            [
                [], 
                [{t:-1, x: 320, s: 100}], 
                [{t: 0, x: 180, s: 100}, {t: 0, x: 275, s: 100}, {t: 0, x: 370, s: 100}, {t: 0,  x: 465, s: 100}],
                [{t: 0, x: 180, s: 100}, {t: 0, x: 275, s: 100}, {t: 0, x: 370, s: 100}, {t: 0,  x: 465, s: 100}],
                [{t: 0, x: 285, s: 50},  {t: 0, x: 355, s: 50}]
            ],
            //. 2 round 
            [
                [], 
                [{t:-1, x: 320, s: 120}], 
                [{t: 1, x: 200, s: 100}, {t: 1, x: 320, s: 100}, {t: 1, x: 440, s: 100}],
                [{t: 1, x: 200, s: 100}, {t: 1, x: 330, s: 100}, {t: 1, x: 460, s: 100}],
                [{t: 1, x: 140, s: 100}, {t: 1, x: 260, s: 100}, {t: 1, x: 380, s: 100}, {t: 1, x: 500, s: 100}]
            ],
            //. 3 round
            [
                [], 
                [{t:-1, x: 320, s: 120}], 
                [{t: 2, x: 320, s: 80}],
                [{t: 0, x: 130, s: 100}, {t: 0, x: 225, s: 100}, {t: 2, x: 320, s: 60}, {t: 0,  x: 415, s: 100}, {t: 0,  x: 510, s: 100}],
                [{t: 0, x: 177, s: 100}, {t: 0, x: 272, s: 80}, {t: 0,  x: 367, s: 80}, {t: 0,  x: 462, s: 100}],
            ],
            //. 4 round
            [
                [], 
                [{t: 0, x: 140, s: 120}, {t:-1, x: 320, s: 150}, {t: 0, x: 500, s: 120}], 
                [{t: 0, x: 140, s: 120}, {t: 2, x: 320, s: 100}, {t: 0, x: 500, s: 120}],
                [{t: 2, x: 230, s: 120}, {t: 2, x: 410, s: 120}],
                [{t: 1, x: 230, s: 120}, {t: 1, x: 410, s: 120}],
                [{t: 1, x: 320, s: 90}],
            ],
            //. 5 round
            [
                [{t: 0, x: 120, s: 120}, {t: 0, x: 520, s: 120}], 
                [{t: 0, x: 190, s: 100}, {t:-1, x: 320, s: 200}, {t: 0,  x: 450, s: 100}], 
                [{t: 1, x: 320, s: 240}],
                [{t: 0, x: 190, s: 50},  {t: 0, x: 450, s: 50}],
                [{t: 0, x: 120, s: 30},  {t: 0, x: 520, s: 30}],
            ],

        ];
        return data[tmpN];
    },
    init(round) {
        this.round = round;
        this.initByRound();
    },

    initByRound() {
        //. 
        var n = this.round - 1;
        var boxInfo = this.getRoundInfo(n);
        var posY = 250;
        for (var i = 0; i < boxInfo.length; i++) {
            var row = boxInfo[i];
            posY += this.stepY;
            for (var j = 0; j < row.length; j++) {
                if (row[j].t != -1) {
                    this.createItem(row[j].t, cc.v2(row[j].x, posY), row[j].s, 0);
                }
            }
        }
    }


});
