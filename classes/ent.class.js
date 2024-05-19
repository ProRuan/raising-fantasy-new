class Ent extends Enemy {
    energy = 100;    // to set or defense!!!
    radDispl = 232;
    bodyXY = { xLeft: 100, xCenter: 116, xRight: 132, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };


    constructor(x, y) {
        super(source.ent, x, y);
        this.setSpeed(64);    // to move? + value!
        this.animate();    // to move?
    }


    animate() {
        setInterval(() => {
            // only for testing!!1
            if (isKey('keyQ')) {
                this.setObjectValue('otherDirection', true);
            }
            if (isKey('keyE')) {
                this.setObjectValue('otherDirection', false);
            }


            this.passAway();
            this.hurt();

            // if (this.isBattle(world.hero)) {
            //     console.log('bite: ', this.weapon.xLeft - this.xLeft, this.xCenter, this.weapon.xRight - this.xRight);
            // }

            // this.walk();

            this.setChapter();
            this.resetCurrentImage();

        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation();
        }, 100);
    }


    isWalk() {    // to edit!!!
        return false;
    }
}