class Knight extends Character {
    coins = 0;
    leaves = 0;

    chapter = 'cover';
    chapters = ['climb', 'jump', 'runAttack', 'run', 'walkAttack', 'walk', 'attack', 'cover'];

    lastIdle = 6000 + getTime();

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
            this.resetJumpCounter();

            // only for testing!!!
            if (isKey('keyQ')) {
                this.setOtherDirection(true);
            }
            if (isKey('keyE')) {
                this.setOtherDirection(false);
            }

            this.climb();
            this.jump();
            this.run()
            this.attack();    // still to write!!!

            this.setChapter();
            this.resetCurrentImage();
            // this.setSound();    // maybe?

            this.updateGroundLevel();

            this.collect('coins');
            this.collect('crystals');
            this.collect('hearts');
            this.collect('hitPoints');
            this.collect('leaves');

            console.log(this.chapter, this.img.src);

            // this.world.camera_x = -this.x + 4 * 64 + 28;    // + 4 * 64 + 28
        }, 1000 / 60);


        setInterval(() => {


            // is ready!!!
            // -----------
            this.playAnimation();
            this.playSound();
            this.controlSounds();
        }, 100);
    }



    resetCurrentImage() {
        if (this.lastChapter != this.chapter) {
            this.currentImage = 0;
        }
    }


    isSimilarChapter(key) {
        return this.lastChapter.includes(key) == this.lastChapter.includes(key);
    }



    isIdle() {
        return isOnTime(this.world.time, this.lastIdle, 6000);
    }


    idle() {
        if (this.chapter == 'idle' && this.img.src.includes('idle12')) {
            this.lastIdle = world.time + 6000;
        }
    }


    // jsdoc
    climb() {
        this.climbUp('arrowUp', true);
        this.climbUp('arrowDown', false);
    }


    // jsdoc
    climbUp(key, value) {
        if (this.isClimbLadder(key)) {
            super.climb(value);
        }
    }


    // jsdoc
    isJump() {
        return isLarger(-1, this.jumpCounter);
    }


    // jsdoc
    jump() {
        if (super.isJump()) {
            super.jump();
        }
    }


    // jsdoc
    run() {
        this.runLeft('arrowLeft', true);
        this.runLeft('arrowRight', false);
    }


    // jsdoc
    runLeft(key, value) {
        if (isKey(key)) {
            this.move(value, key);
        }
    }


    attack() {
        if (this.isAttack()) {

        }
    }


    setChapter() {
        this.lastChapter = this.chapter;
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
        if (!this.isJump()) {
            super.playAnimation(this.flipBook[this.chapter]);
        } else {
            this.playJumpAnimation();
        }
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