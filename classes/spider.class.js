class Spider extends Enemy {
    radDispl = 128;
    bodyXY = { xLeft: 40, xCenter: 64, xRight: 88, yTop: 46, yCenter: 65, yBottom: 84 };
    weaponXY = { xLeft: 36, xRight: 424, yTop: 52, yBottom: 76 };
    thrown = false;
    nextThrow = 2500 + getTime();


    // jsdoc
    constructor(x, y) {
        super(source.spider, x, y);

        this.otherDirection = true;

        this.setStateValues(60, 80);
        this.setAct('throw');
        this.animate();
    }


    throw() {
        if (this.thrown == false && isLarger(this.nextThrow, world.time)) {
            this.thrown = true;
            // let web = new Web((this.weapon.xLeft) / 64, (this.weapon.yBottom + 32) / 64);    // oDir false
            // let web = new Web((this.weapon.xRight - 32) / 64, (this.weapon.yBottom + 32) / 64);    // oDir true
            // let web = new Web((this.weapon.xLeft), (this.weapon.yBottom + 32));    // oDir true (left end)
            let web = new Web((this.weapon.xRight - 24), (this.weapon.yBottom + 32));    // oDir true (left end)

            this.webId = world.webs.length;
            web.id = world.webs.length;
            web.otherDirection = this.otherDirection;
            world.webs.push(web);

            // for class Web!!!
            // world.webs[0].img.src = world.webs[0].flipBook[2];
        } else if (world.webs[this.webId] !== undefined) {
            if (world.webs[this.webId].collided && world.webs[this.webId].img.src.includes('web5')) {
                world.webs.splice(this.webId, 1);
                console.log('deleted');
                this.thrown = false;
                this.nextThrow = 1000 + getTime();
            }
            if (world.webs[this.webId].x < this.weapon.xLeft) {
                world.webs.splice(this.webId, 1);
                console.log('too far');
                this.thrown = false;
                this.nextThrow = 1000 + getTime();
            }
        }
    }


    // isAttack() {

    // }


    isWalk() {    // to edit!
        return false;
    }
}