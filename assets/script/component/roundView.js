cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default:null,
            type: cc.Node
        },
        totalScoreLabel: {
            default: null,
            type:cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.roundItems = [];
        this.roundCnt = 32;
        this.itemInfo = [];
        this.totalScore = 0;
    },

    start () {
        this.refreshContent();
    },

    refreshContent() {
        this.content.removeAllChildren();
        this.itemInfo = this.getItemInfo();
        this.createItems(this.itemInfo);
        this.totalScoreLabel.string = "总分:" + this.totalScore;
    },

    createItems(items) {
        var n = 0;
        var m = 1;
        var w = 190, h = -210;
        var tmpObj;
        // this.content.height = h * items.length / 3;
        for (var i = 0; i < items.length; i++) {
            tmpObj = cc.instantiate(this.itemPrefab);
            tmpObj.getComponent('roundItem').init(this, items[i]);            
            this.content.addChild(tmpObj);
            tmpObj.setPosition(n * w, m * h);

            this.roundItems.push(tmpObj);

            n++;
            if (n == 3) {
                n = 0; m ++;
            }
        }
    },

    getItemInfo() {
        var score = [12, 34, 56, 78, 9, 0];
        var items = [];
        var b_ready = false;
        for (var i = 0; i <  this.roundCnt; i++) {
            var temp = {
                number: i + 1,
                status: 'lock',
                score: 0
            };
            if (i < score.length) {
                if (!b_ready) {
                    if (score[i] == 0) {
                        b_ready = true;
                        temp.status = 'ready';
                    } else {
                        temp.status = 'pass';
                        temp.score = score[i];
                    }
                }

                this.totalScore += score[i];
            }
            items.push(temp);
        }
        return items;
    }

    // update (dt) {},
});
