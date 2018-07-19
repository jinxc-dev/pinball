
cc.Class({
    extends: cc.Component,

    properties: {
       scoreLabel: {
           default: null,
           type:cc.Label
       }
    },
    onLoad () {
    },
    setScore (score) {
        this.scoreLabel.string = score;
    },
});
