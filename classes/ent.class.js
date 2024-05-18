class Ent extends Enemy {
    energy = 100;
    pursuitStop = 0;
    radDispl = 232;
    offsetXY = { xLeft: 76, xCenter: 116, xRight: 156, yTop: 92, yCenter: 134, yBottom: 176 };
    weaponXY = { xLeft: 52, xRight: 124, yTop: 112, yBottom: 176 };

    chapters = ['epilog', 'death', 'hurt', 'attack', 'walk', 'idle'];


    constructor(x, y) {
        super(source.ent, x, y);
        // this.setSpeed(64);    // to move?
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


        }, 1000 / 60);
    }
}