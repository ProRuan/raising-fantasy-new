class MoveableObject extends DrawableObject {
    speedY = 0;
    acceleration = 0.5;
    jumpCounter = -1;
    basicLevel = 484;
    groundLevel = 484;
    abyssLevel = 668;
    lastHit = 0;
    hitDelay = 500;
    otherDirection = false;
    climbing = false;


    // jsdoc
    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    get body() {
        return this.getBody();
    }


    // jsdoc
    get weapon() {
        return this.getWeapon();
    }


    // jsdoc
    setAnimation(source) {
        this.setFlipBook(source);
        this.setCover(source);
        this.setEpilog();
        this.loadImages();
    }


    // jsdoc
    setCover(source) {
        this.flipBook.cover = [source.path];
    }


    // jsdoc
    setEpilog() {
        let img = getLastElement(this.flipBook.death);
        this.flipBook.epilog = [img];
    }


    // jsdoc
    setImages() {
        for (const [key] of Object.entries(this.flipBook)) {
            let chapter = this.flipBook[key];
            super.setImages(chapter);
        }
    }


    // jsdoc
    move(logical, key) {
        this.setOtherDirection(logical);
        this.applySpeed(logical, key);
    }


    // jsdoc
    setOtherDirection(logical) {
        this.otherDirection = logical;
    }


    // jsdoc
    applySpeed(logical, key) {
        if (isKey(key, 'doubleClick')) {
            this.applySpeedType('x', logical, 'runSpeed');
        } else if (isKey(key)) {
            this.applySpeedType('x', logical, 'speed');
        }
    }


    climb(logical) {    // speedY = 0 ...
        this.applySpeedType('y', logical, 'speed');    // not waterproof!!!
    }


    // playAnimation(images) {
    //     let i = this.currentImage % images.length;
    //     let path = images[i];
    //     this.img = this.imageCache[path];
    //     this.currentImage++;
    // }


    applyGravity() {
        setInterval(() => {
            if (!this.isClimb()) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if (this.y > this.groundLevel - (this.body.yBottom - this.y)) {
                        // console.log(this.y);
                        this.y = this.groundLevel - (this.body.yBottom - this.y);
                    }
                } else {
                    this.speedY = 0;
                }
            }
        }, 1000 / 60);
    }


    isAboveGround() {
        return this.body.yBottom < this.groundLevel;
    }


    jump() {
        this.setObjectValue('speedY', 12.5);    // y value!!!
        this.setObjectValue('jumpCounter', 0);
    }


    // jsdoc
    setObjectValue(key, value) {
        this[key] = value;
    }


    // jsdoc
    isClimb() {
        return this.isClimbLadder('arrowUp') || this.isClimbLadder('arrowDown');
    }


    // jsdoc
    isClimbLadder(key) {
        return isKey(key) && this.isAtLadder(key);
    }


    // jsdoc
    isAtLadder(key) {
        let ladder = this.getLadder(key);
        return (ladder) ? true : false;
    }


    // jsdoc
    getLadder(key) {
        return world.ladders.find(l => this.isLadder(key, l));
    }


    // jsdoc
    isLadder(key, l) {
        let [a, b] = this.getLadderParameters(key, l);
        return isIncluded(this.body.xLeft, l.xCenter, this.body.xRight) && isGreater(a, b - 0.5);
    }


    getLadderParameters(key, l) {
        return (key == 'arrowUp') ? [l.yTop, this.body.yBottom] : [this.body.yBottom, l.yBottom]
    }


    isBattle(enemy) {
        enemy = (enemy) ? this.verifyEnemy(this.weapon, enemy.body) : world.enemies.find(enemy => this.verifyEnemy(this.weapon, enemy.body));
        return (enemy) ? true : false;
    }


    verifyEnemy(a, b) {
        let xLeft = isIncluded(a.xLeft, b.xLeft, a.xRight) || isIncluded(b.xLeft, a.xLeft, b.xRight);
        let xRight = isIncluded(a.xLeft, b.xRight, a.xRight) || isIncluded(b.xLeft, a.xRight, b.xRight);
        let yTop = isIncluded(a.yTop, b.yTop, a.yBottom) || isIncluded(b.yTop, a.yTop, b.yBottom);
        let yBottom = isIncluded(a.yTop, b.yBottom, a.yBottom) || isIncluded(b.yTop, a.yBottom, b.yBottom);
        return (xLeft || xRight) && (yTop || yBottom);
    }




    // jsdoc
    resetCurrentImage() {
        if (!this.isSimilarChapter()) {
            this.setObjectValue('currentImage', 0);
        }
    }


    // jsdoc
    isSimilarChapter() {
        let key = this.getSimilarChapter();
        let last = this.lastChapter.includes(key);
        let current = this.chapter.includes(key);
        return isMatch(last, current);
    }


    // jsdoc
    getSimilarChapter() {
        return this.chapter.replace(/[A-Z][a-z]+/, '');
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


    setMusic(path) {
        this.music = new Audio(path);
        this.music.volume = music / 10;    // to edit
    }


    // jsdoc
    startMusic(condition, delay) {
        if (condition && !this.musicStarted) {
            this.musicStarted = true;
            setTimeout(() => {
                this.music.play();
            }, delay);
        }
    }


    // jsdoc
    muteAmbientSound(logical) {
        world.hero.music.muted = logical;
    }


    // jsdoc
    updateGroundLevel(key) {
        if (isUndefined(key)) {
            this.setGroundLevel('flyGrass', this.updateGroundLevel('grass'));
        } else {
            this.setGroundLevel('grass', this.setObjectValue('groundLevel', this.abyssLevel));
        }
    }


    // jsdoc
    setGroundLevel(key, method) {
        let grass = this.getGrass(key);
        (grass) ? this.setObjectValue('groundLevel', grass.yTop) : method;
    }


    // jsdoc
    getGrass(key) {
        return world[key].find(g => this.isOnGrass(g) && this.isAboveGrass(g));
    }


    // jsdoc
    isOnGrass(g) {
        return isIncluded(g.xLeft, this.body.xLeft, g.xRight) || isIncluded(g.xLeft, this.body.xRight, g.xRight);
    }


    // jsdoc
    isAboveGrass(g) {
        return isGreater(this.body.yBottom, g.yTop, true);
    }




    // in use?
    loadImage(flipBook, i) {
        let path = flipBook[i];
        this.img = this.imageCache[path];
    }



    // set pauseable intervall for applyGravity() ...

    // move methods to other classes ...
    // move animate() ... ?
    // review class Character (sort methods) ...
    // game over screen (this + level world) ...
    // pause ...
    // pause music ...
    // fix enemy gravity or dino walk ...
    // fix climb method (at least for climb down) ...
    // fix updateGroundLevel (error after collecting star) ...

    // clear enemies (0/3) ...
    // remove console log ...

    // set prevent default ...
}