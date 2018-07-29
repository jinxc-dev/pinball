cc.Class({
    extends: cc.Component,

    properties: {
        rankItemPrefab: cc.Prefab,
        prevBtn: cc.Node,
        nextBtn: cc.Node,
        content: cc.Node,
        titleLabel: cc.Label        
    },
    onLoad() {
        this.rankData = [];
        this.displayCnt = 6;
        this.pageNum = 0;
    },

    start() {
        this.removeChild();
        if (window.wx != undefined) {
            window.wx.onMessage(data => {
                this.pageNum = 0;
                cc.log("Message：", data)
                if (data.messageType == 0) {
                    this.removeChild();
                } else if (data.messageType == "rankList") {
                    this.fetchFriendData(data.key);
                } else if (data.messageType == "sendScore") {
                    this.submitScore(data.key, data.score);
                } 
            });
        } else {
            // this.fetchFriendData(1000);
            this.testData();
        }

        this.prevBtn.on('btnClicked', function(){
            this.pageNum --;
            this.pageNum = (this.pageNum < 0)? 0: this.pageNum;
            this.displayRank(this.rankData, this.pageNum, this.displayCnt);
        }, this);
        this.nextBtn.on('btnClicked', function(){
            this.pageNum ++;
            var end = Math.floor(this.rankData.length / this.displayCnt);
            this.pageNum = (this.pageNum > end)? end: this.pageNum;
            this.displayRank(this.rankData, this.pageNum, this.displayCnt);      
            
        }, this);

        this.displayRank(this.rankData, this.pageNum, this.displayCnt);

    },
    submitScore(key, score) { 
        if (window.wx != undefined) {
            window.wx.getUserCloudStorage({
                keyList: [key],
                success: function (getres) {
                    console.log('getUserCloudStorage', 'success', getres)
                    if (getres.KVDataList.length != 0) {
                        if (getres.KVDataList[0].value > score) {
                            return;
                        }
                    }
                    window.wx.setUserCloudStorage({
                        KVDataList: [{key: key, value: "" + score}],
                        success: function (res) {
                            console.log('setUserCloudStorage', 'success', res);
                            
                        },
                        fail: function (res) {
                            console.log('setUserCloudStorage', 'fail')
                        },
                        complete: function (res) {
                            console.log('setUserCloudStorage', 'ok')
                        }
                    });
                },
                fail: function (res) {
                    console.log('getUserCloudStorage', 'fail')
                },
                complete: function (res) {
                    console.log('getUserCloudStorage', 'ok')
                }
            });
        } else {
            cc.log("error:" + key + " : " + score)
        }
    },
    removeChild() {
        this.content.removeAllChildren();
    },
    fetchFriendData(key) {
        this.removeChild();
        this.changeTitle(key);
        this.content.active = true;
        if (window.wx != undefined) {
            wx.getFriendCloudStorage({
                keyList: [key],
                success: res => {
                    console.log("wx.getFriendCloudStorage success", res);
                    let data = res.data;
                    data.sort((a, b) => {
                        if (a.KVDataList.length == 0 && b.KVDataList.length == 0) {
                            return 0;
                        }
                        if (a.KVDataList.length == 0) {
                            return 1;
                        }
                        if (b.KVDataList.length == 0) {
                            return -1;
                        }
                        return b.KVDataList[0].value - a.KVDataList[0].value;                        
                    });
                    this.rankData = data;
                    this.displayRank(this.rankData, this.pageNum, this.displayCnt);
                },
                fail: res => {
                    console.log("wx.getFriendCloudStorage fail", res);
                },
            });
        }
    },

    displayRank(data, page, cnt) {
        this.removeChild();
        var s = page * cnt;
        var e = (page + 1) * cnt;
        if (e > data.length) {
            e = data.length;
        }
        var nStep = 0;
        var nH = 100;
        var startY = -50;
        for (let i = s ; i < e; i++) {
            var playerInfo = data[i];
            var item = cc.instantiate(this.rankItemPrefab);
            this.content.addChild(item);
            item.getComponent('rankItem').init(i, playerInfo);
            // 
            item.setPositionY(-nStep * nH + startY);
            nStep ++;
        }        
    },
    changeTitle(key) {
        if (key == 'k_round') {
            this.titleLabel.string = "关卡排行榜";
        } else if (key == 'k_total') {
            this.titleLabel.string = "排行榜";
        }
    },

    testData() {
        var data = [];
        for (var i = 0; i < 32; i++) {
            var tmp = {};
            tmp.avatarUrl = "/resources/close_red.png";
            tmp.KVDataList = [{value: i}];
            tmp.nickname = "AAAAAA";
            data.push(tmp);
        }
        
        this.rankData = data;
    }
});
