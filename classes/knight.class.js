class Knight extends MoveableObject {
    coins = 0;
    leaves = 0;

    chapter = 'cover';
    chapters = ['runAttack', 'run', 'walkAttack', 'walk', 'attack', 'cover'];

    footStep = source.footStep;
    swordDraw = source.swordDraw;
    // edit sound structure and methods!!!
    // fix sound
    // fix sound volume (factor)
    // choose heart sound


    constructor(x, y) {
        super(source.knight, x, y);
        this.setFlipBook(FLIP_BOOK_KNIGHT);
        this.setCover();    // Give it to flip book source!!!
        this.loadImages();
        this.setSpeed(128, 256);
        this.animate();
        this.applyGravity();
    }


    get xLeft() {
        return this.x + 28;
    }


    get xCenter() {
        return this.x + 44;
    }


    get xRight() {
        return this.x + 60;
    }


    get yTop() {
        return this.y + 62;
    }


    get yCenter() {
        return this.y + 86;
    }


    get yBottom() {
        return this.y + 110;
    }


    setCover() {
        this.flipBook['cover'] = [this.img.src];
    }


    setImages() {
        for (const [key] of Object.entries(this.flipBook)) {
            let chapter = this.flipBook[key];
            chapter.forEach((c) => {
                let img = new Image();
                img.src = c;
                this.imageCache[c] = img;
            })
        }
    }


    animate() {
        setInterval(() => {

            // only for testing!!!
            if (isKey('keyQ')) {
                this.setOtherDirection(true);
            }
            if (isKey('keyE')) {
                this.setOtherDirection(false);
            }

            // condition for climbing is still missing!!!
            if (this.isClimbingUp()) {
                this.climb(true);
            } else if (this.isClimbingDown()) {
                this.climb(false);
            }

            if (isKey('space') && !this.isAboveGround()) {
                this.jump();
            }

            if (isKey('arrowLeft')) {
                this.move(true, 'arrowLeft');
            }
            if (isKey('arrowRight')) {
                this.move(false, 'arrowRight');
            }

            if (isKey('keyA')) {

            }

            this.setChapter();
            // this.setSound();    // maybe?

            this.updateGroundLevel();

            this.collect('coins');
            this.collect('crystals');
            // this.collect('hearts');
            this.collect('hitPoints');
            this.collect('leaves');

            console.log(this.yBottom, this.groundLevel, this.isClimbing());

            // this.world.camera_x = -this.x + 4 * 64 + 28;    // + 4 * 64 + 28
        }, 1000 / 60);


        setInterval(() => {


            // enable jump for key up

            if (this.isJumpStart && this.speedY > 0) {
                super.playAnimation([this.flipBook.jump[0]]);
                setTimeout(() => super.playAnimation([this.flipBook.jump[1]]), 200 / 6);
                this.isJumpStart = false;
            } else if (this.isJumping && this.speedY > 0) {
                super.playAnimation([this.flipBook.jump[2]]);
            } else if (this.isFallStart && this.speedY <= 0) {
                super.playAnimation([this.flipBook.jump[3]]);
                setTimeout(() => super.playAnimation([this.flipBook.jump[4]]), 200 / 6);
                this.isJumping = false;
                this.isFallStart = false;
            } else if (this.isFalling && this.speedY < 0) {
                super.playAnimation([this.flipBook.jump[5]]);
            } else if (this.isFalling && this.speedY == 0) {
                super.playAnimation([this.flipBook.jump[6]]);
                this.isFalling = false;
            } else {
                this.img.src = this.flipBook.cover
            }


            // is ready!!!

            // this.playAnimation();
            // this.playSound();
            // this.controlSounds();
        }, 100);
    }


    // isClimbing(x, y) {
    //     return isIncluded(this.xLeft, x, this.xRight) && this.isIncluded(this.yTop, y, this.yTop);
    // }


    // jsdoc
    isRunAttack() {
        return this.isRun() && this.isAttack();
    }


    // jsdoc
    isRun() {
        return isKey('arrowLeft', 'doubleClick') || isKey('arrowRight', 'doubleClick');
    }


    // jsdoc
    isWalkAttack() {
        return this.isWalk() && this.isAttack();
    }


    // jsdoc
    isWalk() {
        return isKey('arrowLeft') || isKey('arrowRight');
    }


    // jsdoc
    isAttack() {
        return isKey('keyA');
    }


    // jsdoc
    isCover() {
        return true;
    }


    // jsdoc
    setChapter() {
        this.chapter = this.getChapter();
    }


    // jsdoc
    getChapter() {
        for (let i = 0; i < this.chapters.length; i++) {
            let condition = this.getCondition(i);
            if (this.isChapter(condition)) {
                return this.chapters[i];
            }
        }
    }


    // jsdoc
    getCondition(i) {
        let condition = this.chapters[i];
        let initial = condition[0];
        return 'is' + condition.replace(initial, initial.toUpperCase());
    }


    // jsdoc
    isChapter(condition) {
        return this[condition]();
    }


    // jsdoc
    playAnimation() {
        super.playAnimation(this.flipBook[this.chapter]);
    }


    playSound() {    // add sound volume factor!!!
        this.playSoundOnTrigger('run_attack2', this.footStep);
        this.playSoundOnTrigger('run_attack6', this.footStep);
        this.playSoundOnTrigger('run2', this.footStep);
        this.playSoundOnTrigger('run6', this.footStep);
        this.playSoundOnTrigger('walk_attack2', this.footStep);
        this.playSoundOnTrigger('walk_attack5', this.footStep);
        this.playSoundOnTrigger('walk2', this.footStep);
        this.playSoundOnTrigger('walk5', this.footStep);
        this.playSoundOnTrigger('_attack2', this.swordDraw);
        this.playSoundOnTrigger('/attack1', this.swordDraw);
    }    // remove sound footstep?!?


    // jsdoc
    playSoundOnTrigger(key, sound) {
        if (this.img.src.includes(key)) {
            super.playSound(sound);
        }
    }


    controlSounds() {
        if (this.isAnySoundPlaying()) {
            // this.stopSounds();
            this.removeSounds();
        }
    }


    stopSounds() {    // add other sounds!!!
        if (!this.img.src.includes('attack') && !this.img.src.includes('walk') && !this.img.src.includes('run')) {
            this.muteLastSound();
        }
    }


    muteLastSound() {
        let lastId = this.sounds.length - 1;
        this.sounds[lastId].muted = true;
    }


    removeSounds() {
        this.sounds.forEach((sound) => {
            if (sound.ended) {
                this.sounds.splice(0, 1);
            }
        })
    }


    isAnySoundPlaying() {
        return this.sounds.length > 0
    }


    // to edit (this and subsequent methods)!!!
    collect(key) {
        let object = this.getObject(key);
        if (object) {
            this.removeObject(key, object);
            this.increaseCounter(key, object);
            super.playSound(object.sound);


            // if (object instanceof Crystal) {
            //     this.bombSkillUnlocked = true;
            //     this.playSound(this.soundUpgrade);
            //     this.world.level.setXLevelEnd();
            //     this.world.level.setXLevelStartCrystal();
            // }
        }
    }


    // use object id directly!!!
    getObject(key) {
        return world[key].find(o => isCollided(this, o));
    }


    // jsdoc
    removeObject(key, object) {
        world[key].splice(object.getId(key), 1);
    }


    // jsdoc
    increaseCounter(item, object) {
        if (this.isCollectableItem(object)) {
            this.increaseItem(item);
        }
    }


    // jsdoc
    isCollectableItem(object) {
        return object instanceof Coin || object instanceof Leaf;
    }


    // jsdoc
    increaseItem(item) {
        this[item]++;
    }


    // jsdoc
    updateGroundLevel(key) {
        if (this.isUndefined(key)) {
            this.setGroundLevel('flyGrass', this.updateGroundLevel('grass'));
        } else {
            this.setGroundLevel('grass', this.setObjectValue('groundLevel', this.abyssLevel));
        }
    }


    // jsdoc
    setGroundLevel(key, method) {
        let grass = this.searchGrass(key);
        (grass) ? this.setObjectValue('groundLevel', grass.yTop) : method;
    }


    // jsdoc + rename to getGrass()
    searchGrass(key) {
        return this.world[key].find(g => this.isOnGrass(g) && this.isAboveGrass(g));
    }


    // jsdoc
    isOnGrass(g) {
        return isIncluded(g.xLeft, this.xLeft, g.xRight) || isIncluded(g.xLeft, this.xRight, g.xRight);
    }


    // jsdoc
    isAboveGrass(g) {
        return isLarger(this.yBottom, g.yTop, true);
    }
}