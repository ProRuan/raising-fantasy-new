/**
 * Represents a lightning.
 * @extends MagicObject
 */
class Lightning extends MagicObject {
    radDispl = 260;
    pages = { move: 2, collided: 8, epilog: 9 };
    chargeXY = { xLeft: 120, xCenter: 128, xRight: 136, yTop: 180, yCenter: 203, yBottom: 226 };
    lightningXY = { xLeft: 114, xCenter: 130, xRight: 146, yTop: 32, yCenter: 128, yBottom: 224 };
    deltaY = { move: 210, collided: 96 };
    delay = 1000;


    /**
     * Creates a lightning.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {boolean} otherDirection - A boolean value.
     */
    constructor(x, y, otherDirection) {
        super(source.lightning, x, y);
        this.setMagic(otherDirection, 40, 'lightning8');
        this.setCharge();
        this.playSound(this.sound.cast);
    }


    /**
     * Sets the parameters of the charge.
     */
    setCharge() {
        this.bodyXY = this.chargeXY;
        this.targetingStop = getTime() + this.delay;
        this.chargingStop = getTime() + 2 * this.delay;
    }


    /**
     * Casts the lightning.
     */
    cast() {
        if (this.isTargeting()) {
            this.target();
        } else if (this.isDischarge()) {
            this.discharge();
        }
    }


    /**
     * Verifies, if the lightning is targeting.
     * @returns {boolean} - A boolean value.
     */
    isTargeting() {
        return isGreater(world.time, this.targetingStop);
    }


    /**
     * Targets the hero.
     */
    target() {
        this.x = this.getHeroX();
        this.y = this.getHeroY();
    }


    /**
     * Provides the x value of the hero.
     * @returns {number} - The x value of the hero.
     */
    getHeroX() {
        return world.hero.body.xCenter - (this.body.xCenter - this.x);
    }


    /**
     * Provides the y value of the hero.
     * @returns {number} - The y value of the hero.
     */
    getHeroY() {
        return world.hero.y - this.deltaY.move;
    }


    /**
     * Verifies, if the lightning is ready to discharge.
     * @returns {boolean} - A boolean value.
     */
    isDischarge() {
        return isGreater(this.chargingStop, world.time) && !isTrue(this.collided);
    }


    /**
     * Discharges the lightning.
     */
    discharge() {
        this.bodyXY = this.lightningXY;
        this.y += this.deltaY.collided;
        this.collided = true;
    }
}