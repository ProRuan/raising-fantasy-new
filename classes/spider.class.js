class Spider extends Enemy {
    radDispl = 128;
    bodyXY = { xLeft: 40, xCenter: 64, xRight: 88, yTop: 46, yCenter: 65, yBottom: 84 };
    weaponXY = { xLeft: 36, xRight: 424, yTop: 52, yBottom: 76 };


    // jsdoc
    constructor(x, y) {
        super(source.spider, x, y);

        this.otherDirection = true;

        this.setStateValues(60, 80);
        this.setAct('throw');
        this.animate();
    }


    throw() {
        if (world.webs.length == 0) {
            // let web = new Web((this.weapon.xLeft) / 64, (this.weapon.yBottom + 32) / 64);    // oDir false
            // let web = new Web((this.weapon.xRight - 32) / 64, (this.weapon.yBottom + 32) / 64);    // oDir true
            let web = new Web((this.weapon.xLeft) / 64, (this.weapon.yBottom + 32) / 64);    // oDir true (left end)
            world.webs.push(web);

            // for class Web!!!
            world.webs[0].radDispl = 32;
            world.webs[0].otherDirection = this.otherDirection;
            world.webs[0].img.src = world.webs[0].flipBook[2];
        }
    }


    isWalk() {    // to edit!
        return false;
    }
}