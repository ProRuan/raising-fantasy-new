class Ent extends Enemy {
    energy = 100;
    pursuitStop = 0;
    radDispl = 232;
    offsetX = { left: 76, center: 116, right: 156 };
    offsetY = { top: 92, center: 134, bottom: 176 };
    weaponXY = { left: 52, top: 112, right: 124, bottom: 176 };

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
            'xLeft': (this.otherDirection) ? this.xCenter - this.weaponXY.right : this.xCenter + this.weaponXY.left,    // give it to xLeft and xRight???
            'xRight': (this.otherDirection) ? this.xCenter - this.weaponXY.left : this.xCenter + this.weaponXY.right,    // give it to xLeft and xRight???
            'yTop': this.y + this.weaponXY.top,
            'yBottom': this.y + this.weaponXY.bottom
        }
    }


    animate() {
        setInterval(() => {
            console.log(this.xLeft, this.xCenter, this.xRight, this.weapon.xLeft, this.weapon.xRight);

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