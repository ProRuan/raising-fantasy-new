class Shaman extends Boss {
    radDispl = 144;
    bodyXY = { xLeft: 56, xCenter: 72, xRight: 88, yTop: 104, yCenter: 154, yBottom: 204 };
    weaponXY = { xLeft: 0, xRight: 0, yTop: 0, yBottom: 0 };
    bladeXY = { xLeft: -57, xRight: 220, yTop: -284, yBottom: 0 };
    fireXY = { xLeft: -20, xRight: 228, yTop: -297, yBottom: 0 };
    lightningXY = { xLeft: -130, xRight: 228, yTop: -14 + 96, yBottom: 0 };


    // jsdoc
    constructor(x, y) {
        super(source.shaman, x, y);
        this.setMusic(source.bossBattle);
    }


    // jsdoc
    move() {
        if (this.isCastReady()) {
            this.cast();
        } else if (this.isDeath()) {
            this.win();
        }
    }


    isCastReady() {
        return !this.isDeath() && isTrue(this.triggered) && !world.hero.isEpilog();
    }


    // jsdoc
    cast() {
        this.hurt();
        this.resetMagicCast();
        this.damage();
        this.recast();
        this.muteAmbientSound();
    }


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


    // jsdoc
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


    // jsdoc
    getHp() {
        return this.hp / this.hpMax * 100;
    }


    // jsdoc
    setRate(a, b, c) {
        this.rate = { blade: a, fire: b, lightning: c };
    }


    // jsdoc
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


    setCast(key) {
        this.magicChapter = key;
        if (!this.selectionTime) {
            this.selectionTime = world.time + 300;
        }
        if (!this.chapterTime) {
            this.chapterTime = world.time + this.ms;
        }
    }


    // jsdoc
    selectMagic(type) {
        (!isMatch(type, 'lighting')) ? this.castMagic(type) : this.castLightning();
    }


    // jsdoc
    castMagic(type) {
        this.setWeaponXY(type);
        let x = this.getWeaponXY('xLeft');
        let y = this.getWeaponXY('yTop');
        this.setMagicObject(type, x, y);
    }


    // jsdoc
    setWeaponXY(type) {
        let key = type + 'XY';
        this.weaponXY = this[key];
    }


    // jsdoc
    getWeaponXY(key) {
        return this.weapon[key] / UNIT;
    }


    // jsdoc
    setMagicObject(type, x, y) {
        if (isMatch(type, 'blade')) {
            this.setMagic(new Blade(x, y, this.otherDirection));
        } else if (isMatch(type, 'fire')) {
            this.setMagic(new Fire(x, y, this.otherDirection));
        } else if (isMatch(type, 'lightning')) {
            this.setMagic(new Lightning(x, y, this.otherDirection));
        }
    }


    // jsdoc
    setMagic(magic) {
        this.magic = magic;
    }


    // jsdoc
    castLightning() {
        this.setWeaponXY('lightning');
        let x = this.getLightningX();
        let y = this.getLightningY();
        this.setMagicObject('lightning', x, y);
    }


    // jsdoc
    getLightningX() {
        return (world.hero.body.xCenter + this.weapon.xLeft) / UNIT;
    }


    // jsdoc
    getLightningY() {
        return (canvas.height + (world.hero.yBottom - this.weapon.yTop)) / UNIT;
    }


    // jsdoc
    setUndefined(key) {
        this[key] = undefined;
    }


    // jsdoc
    muteAmbientSound() {
        if (this.isDeath() && this.music.muted) {
            super.muteAmbientSound(false);
        } else if (this.triggered && !world.hero.music.muted) {
            super.muteAmbientSound(true);
        }
    }


    win() {
        this.removeMagic();
        this.lowMusic();
        world.raiseVictoryPodium();
    }


    // jsdoc
    lowMusic() {
        let lowerVolume = this.music.volume - 0.001;
        this.setMusicVolume(lowerVolume);
        this.muteAmbientSound();
    }


    // jsdoc
    setMusicVolume(lowerVolume) {
        if (isGreater(lowerVolume, 0)) {
            this.music.muted = true;
        } else {
            this.music.volume = lowerVolume;
        }
    }
}