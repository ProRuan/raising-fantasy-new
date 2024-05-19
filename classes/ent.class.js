class Ent extends Enemy {
    energy = 100;    // to set or defense!!!
    radDispl = 232;
    bodyXY = { xLeft: 100, xCenter: 116, xRight: 132, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };
    patrolX = { xWest: -160, xEast: 160 };
    lastTurn = 0;


    constructor(x, y) {
        super(source.ent, x, y);
        this.setPatrolX();
        this.setSpeed(64);    // to move? + value!
        this.animate();    // to move?
    }


    setPatrolX() {
        this.xWest = this.xCenter + this.patrolX.xWest;
        this.xEast = this.xCenter + this.patrolX.xEast;
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

            this.walk();

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


    walk() {
        if (isLarger(this.xWest, this.xCenter) && isTrue(this.otherDirection)) {
            this.x -= this.speed;
            this.lastTurn = world.time;

            console.log('walk to west');
        } else if (isOnTime(world.time, this.lastTurn, 2500) && isTrue(this.otherDirection)) {
            this.otherDirection = false;
            this.lastTurn = world.time;

            console.log('turn to east');
        } else if (isLarger(this.xCenter, this.xEast) && !isTrue(this.otherDirection)) {
            this.x += this.speed;
            this.lastTurn = world.time;

            console.log('walk to east');
        } else if (isOnTime(world.time, this.lastTurn, 2500) && !isTrue(this.otherDirection)) {
            this.otherDirection = true;
            this.lastTurn = world.time;

            console.log('turn to west');
        }

        // if (isLarger(this.xCenter, this.xEast)) {
        //     this.x += this.speed;
        //     console.log('walk to east');
        // }
    }
}