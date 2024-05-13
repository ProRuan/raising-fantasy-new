class Knight extends MoveableObject {
    coins = 0;
    leaves = 0;

    chapter = 'cover';
    chapters = ['runAttack', 'run', 'walkAttack', 'walk', 'attack', 'cover'];

    footStep = source.footStep;
    swordDraw = source.swordDraw;


    constructor(x, y) {
        super(source.knight, x, y);
        this.setFlipBook(FLIP_BOOK_KNIGHT);
        this.setCover();
        this.loadImages();
        this.setSpeed(128, 256);
        this.animate();
    }


    get xLeft() {
        return this.x + 28
    }


    get xCenter() {
        return this.x + 44
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

            // this.world.camera_x = -this.x + 4 * 64 + 28;    // + 4 * 64 + 28
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation();
            this.playSound();
            this.controlSounds();

            this.collect('coins');
            this.collect('crystals');
            this.collect('hitPoints');
            this.collect('leaves');
        }, 100);
    }


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
        return world[key].find(o => this.isCollected(o));
    }


    // jsdoc
    isCollected(o) {
        let touchedLeft = this.xLeft < o.xLeft && o.xLeft < this.xRight;
        let touchedRight = this.xLeft < o.xRight && o.xRight < this.xRight;
        let touchedTop = this.yTop < o.yTop && o.yTop < this.yBottom;
        let touchedBottom = this.yTop < o.yBottom && o.yBottom < this.yBottom;
        return (touchedLeft || touchedRight) && (touchedTop || touchedBottom);
    }


    // jsdoc
    removeObject(key, object) {
        let objectId = world[key].findIndex(o => this.getId(o, object));
        world[key].splice(objectId, 1);
    }


    // jsdoc
    getId(o, object) {
        return o.xCenter == object.xCenter && o.yCenter == object.yCenter;
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
}