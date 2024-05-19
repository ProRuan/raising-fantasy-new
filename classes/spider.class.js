class Spider extends Enemy {
    radDispl = 128;
    bodyXY = { xLeft: 40, xCenter: 64, xRight: 88, yTop: 46, yCenter: 65, yBottom: 84 };
    weaponXY = { xLeft: 40, xRight: 424, yTop: 52, yBottom: 76 };


    // jsdoc
    constructor(x, y) {
        super(source.spider, x, y);
        this.setStateValues(60, 80);
        this.setAct('throw');
        this.animate();
    }


    throw() {


        // console.log('throw web');
    }


    isWalk() {    // to edit!
        return false;
    }
}