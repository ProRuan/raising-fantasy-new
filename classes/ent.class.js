class Ent extends Enemy {
    energy = 100;
    pursuitStop = 0;
    radDispl = 232;
    bodyXY = { xLeft: 76, xCenter: 116, xRight: 156, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };

    // only for testing!!!
    chapters = ['epilog', 'death', 'hurt'];

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


        }, 1000 / 60);


        // setInterval(() => {
        //     this.playAnimation();
        // }, 100);
    }
}