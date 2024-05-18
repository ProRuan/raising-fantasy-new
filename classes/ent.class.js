class Ent extends Enemy {
    energy = 100;
    pursuitStop = 0;
    radDispl = 232;
    offsetX = { left: 76, center: 116, right: 156 };
    offsetY = { top: 92, center: 134, bottom: 176 };

    chapters = ['epilog', 'death', 'hurt', 'attack', 'walk', 'idle'];


    constructor(x, y) {
        super(source.ent, x, y);

        this.img.src = this.flipBook.attack[2];
        this.otherDirection = false;

        // this.setSpeed(64);    // to move?
        this.animate();    // to move?
    }


    // jsdoc + move?!?
    get weapon() {    // verified!!! + check for dino!!!
        return {
            'xLeft': (this.otherDirection) ? this.body.xCenter - 124 : this.body.xCenter + 52,    // give it to xLeft and xRight???
            'xRight': (this.otherDirection) ? this.body.xCenter - 52 : this.body.xCenter + 124,    // give it to xLeft and xRight???
            'yTop': this.y + 112,
            'yBottom': this.y + 176
        }
    }


    animate() {
        setInterval(() => {


            // only for testing!!1
            if (isKey('keyQ')) {
                this.setObjectValue('otherDirection', true);
                console.log(this.body.xCenter, this.weapon.xLeft, this.weapon.xRight, this.xCenter - this.xLeft, this.xRight - this.xCenter);
            }
            if (isKey('keyE')) {
                this.setObjectValue('otherDirection', false);
                console.log(this.body.xCenter, this.weapon.xLeft, this.weapon.xRight, this.xCenter - this.xLeft, this.xRight - this.xCenter);
            }


        }, 1000 / 60);
    }
}