/**
 * Represents a shaman.
 * @extends Boss
 */
class Shaman extends Boss {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };
    weaponXY = { xLeft: 0, xRight: 0, yTop: 0, yBottom: 0 };
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };


    /**
     * Creates a shaman.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.shaman, x, y);
        this.setMusic(source.bossBattle);
    }


    /**
     * Moves the shaman.
     */
    move() {
        if (this.isCastReady()) {
            this.cast();
        } else if (this.isDeath()) {
            this.win();
        }
    }


    /**
     * Verifies, if the cast is ready.
     * @returns {boolean} - A boolean value.
     */
    isCastReady() {
        return !this.isDeath() && isTrue(this.triggered) && !world.hero.isEpilog();
    }


    /**
     * Controls the magic.
     */
    cast() {
        this.hurt();
        this.resetMagicCast();
        this.damage();
        this.recast();
        this.muteAmbientSound();
    }


    /**
     * Recasts the magic.
     */
    recast() {
        if (this.chapterTime && isGreater(this.chapterTime, world.time)) {
            this.setUndefined('magicChapter');
            delete this.chapterTime;
        } else if (this.selectionTime && isGreater(this.selectionTime, world.time)) {
            this.selectMagic(this.magicChapter);
            delete this.selectionTime;
        } else if (isGreater(this.nextCast, world.time) && !isTrue(this.spellCast)) {
            this.spellCast = true;
            this.updateRate();
            this.castRandomly();
        }
    }


    /**
     * Updates the rate of the magic.
     */
    updateRate() {
        let hp = this.getHp();
        if (isGreater(70, hp)) {
            this.setRate(0, 4, 7);
        } else if (isGreater(40, hp)) {
            this.setRate(0, 3, 6);
        } else if (isGreater(10, hp)) {
            this.setRate(0, 2, 5);
        } else if (isGreater(0, hp)) {
            this.setRate(0, 1, 3);
        }
    }


    /**
     * Provides the hp in percentage terms.
     * @returns {number} - The hp in percentage terms.
     */
    getHp() {
        return this.hp / this.hpMax * 100;
    }


    /**
     * Sets the rates of the magic types.
     * @param {number} a - The magic rate of the blade.
     * @param {number} b - The magic rate of the fire.
     * @param {number} c - The magic rate of the lightning.
     */
    setRate(a, b, c) {
        this.rate = { blade: a, fire: b, lightning: c };
    }


    /**
     * Casts the magic randomly.
     */
    castRandomly() {
        let number = getRandomNumber(9, 8);
        if (isGreater(this.rate.lightning, number)) {
            this.setCast('lightning');
        } else if (isGreater(this.rate.fire, number)) {
            this.setCast('fire');
        } else if (isGreater(this.rate.blade, number)) {
            this.setCast('blade');
        }
    }


    /**
     * Sets the cast.
     * @param {string} key - The name of the magic chapter.
     */
    setCast(key) {
        this.magicChapter = key;
        this.setCastTimeout('selectionTime', 300);
        this.setCastTimeout('chapterTime', this.ms);
    }


    /**
     * Sets the timeout of the cast.
     * @param {string} key - The key of the variable.
     * @param {number} value - The value to set.
     */
    setCastTimeout(key, value) {
        if (!this[key]) {
            this[key] = getSum(world.time, value);
        }
    }


    /**
     * Selects the magic.
     * @param {string} type - The type of the magic.
     */
    selectMagic(type) {
        (!isMatch(type, 'lighting')) ? this.castMagic(type) : this.castLightning();
    }


    /**
     * Casts the type of the magic.
     * @param {string} type - The type of the magic.
     */
    castMagic(type) {
        this.setWeaponXY(type);
        let x = this.getWeaponXY('xLeft');
        let y = this.getWeaponXY('yTop');
        this.setMagicObject(type, x, y);
    }


    /**
     * Sets the type of the weapon.
     * @param {string} type - The type of the magic.
     */
    setWeaponXY(type) {
        let key = type + 'XY';
        this.weaponXY = this[key];
    }


    /**
     * Provides a value of the weapon.
     * @param {string} key - The key of a weapon value.
     * @returns {number} - A value of the weapon.
     */
    getWeaponXY(key) {
        return this.weapon[key] / UNIT;
    }


    /**
     * Sets the magic object.
     * @param {string} type - The type of the magic.
     * @param {number} x - The x value of the magic.
     * @param {number} y - The y value of the magic.
     */
    setMagicObject(type, x, y) {
        if (isMatch(type, 'blade')) {
            this.setMagic(new Blade(x, y, this.otherDirection));
        } else if (isMatch(type, 'fire')) {
            this.setMagic(new Fire(x, y, this.otherDirection));
        } else if (isMatch(type, 'lightning')) {
            this.setMagic(new Lightning(x, y, this.otherDirection));
        }
    }


    /**
     * Sets the magic.
     * @param {object} magic - The magic to set.
     */
    setMagic(magic) {
        this.magic = magic;
    }


    /**
     * Casts the lightning.
     */
    castLightning() {
        this.setWeaponXY('lightning');
        let x = this.getLightningX();
        let y = this.getLightningY();
        this.setMagicObject('lightning', x, y);
    }


    /**
     * Provides the x value of the lightning.
     * @returns {number} - The x value of the lightning.
     */
    getLightningX() {
        return (world.hero.body.xCenter + this.weapon.xLeft) / UNIT;
    }


    /**
     * Provides the y value of the lightning.
     * @returns {number} - The y value of the lightning.
     */
    getLightningY() {
        return (canvas.height + (world.hero.yBottom - this.weapon.yTop)) / UNIT;
    }


    /**
     * Sets a variable undefined.
     * @param {string} key - The key of the variable to set.
     */
    setUndefined(key) {
        this[key] = undefined;
    }


    /**
     * Mutes the ambient sound.
     */
    muteAmbientSound() {
        if (this.isDeath() && this.music.muted) {
            super.muteAmbientSound(false);
        } else if (this.triggered && !world.hero.music.muted) {
            super.muteAmbientSound(true);
        }
    }


    /**
     * Applies the victory.
     */
    win() {
        this.removeMagic();
        this.lowMusic();
        world.raiseVictoryPodium();
    }


    /**
     * Lows the volume of the music.
     */
    lowMusic() {
        let lowerVolume = getSum(this.music.volume, -0.001);
        this.setMusicVolume(lowerVolume);
        this.muteAmbientSound();
    }


    /**
     * Sets the volume of the music.
     * @param {number} lowerVolume - The value of the lower volume.
     */
    setMusicVolume(lowerVolume) {
        if (isGreater(lowerVolume, 0)) {
            this.music.muted = true;
        } else {
            this.music.volume = lowerVolume;
        }
    }
}