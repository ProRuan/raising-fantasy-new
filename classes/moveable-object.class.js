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


    // jsdoc
    climb(logical) {
        this.applySpeedType('y', logical, 'speed');
    }


    // jsdoc
    isClimb() {
        let ladderTop = this.getWorldObject('ladders', 'isLadderTop');
        let ladderBottom = this.getWorldObject('ladders', 'isLadderBottom');
        let ladderTopInRange = ladderTop && isGreater(ladderTop.yTop, this.body.yBottom);
        let ladderBottomInRange = ladderBottom && isGreater(this.body.yBottom, ladderBottom.yBottom);
        let ladderTopOutOfRange = ladderTop && isGreater(this.body.yBottom, ladderTop.yTop);
        let climbUp = isKey('arrowUp') && ladderTopInRange;
        let climbDown = isKey('arrowDown') && ladderBottomInRange && !ladderTopOutOfRange;
        return climbUp || climbDown;
    }


    // jsdoc
    isLadderTop(ladder) {
        return this.isLadder(ladder) && ladder instanceof LadderT;
    }


    // jsdoc
    isLadder(ladder) {
        return isIncluded(ladder.xLeft, this.body.xCenter, ladder.xRight);
    }


    // jsdoc
    isLadderBottom(ladder) {
        return this.isLadder(ladder) && ladder instanceof LadderB;
    }


    // jsdoc
    applyGravity() {
        if (!this.isClimb()) {
            if (this.isAboveGround() || isGreater(0, this.speedY)) {
                this.applyFallSpeed();
                this.setGroundY();
            } else {
                this.speedY = 0;
            }
        }
    }


    // jsdoc
    isAboveGround() {
        return this.body.yBottom < this.groundLevel;
    }


    // jsdoc
    applyFallSpeed() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    // jsdoc
    setGroundY() {
        let deltaY = this.body.yBottom - this.y;
        let groundY = this.groundLevel - deltaY;
        if (isGreater(groundY, this.y)) {
            this.y = groundY;
        }
    }


    // jsdoc
    jump() {
        this.speedY = 12.5;
        this.jumpCounter = 0;
    }


    // jsdoc
    isBattle(enemy) {
        let battle = this.getBattle(enemy);
        return (battle) ? true : false;
    }


    // jsdoc
    getBattle(enemy) {
        if (enemy) {
            return isCollided(this.weapon, enemy.body);
        } else {
            return world.enemies.find(enemy => isCollided(this.weapon, enemy.body));
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


    // jsdoc
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
        return 'is' + formatInitial(condition, 'toUpperCase');
    }


    // jsdoc
    isChapter(condition) {
        return this[condition]();
    }


    // jsdoc
    resetCurrentImage() {
        if (!this.isSimilarChapter()) {
            this.currentImage = 0;
        }
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
            this.setGroundLevel('grass', this.setValue('groundLevel', this.abyssLevel));
        }
    }


    // jsdoc
    setValue(key, value) {
        this[key] = value;
    }


    // jsdoc
    setGroundLevel(key, method) {
        let grass = this.getGrass(key);
        (grass) ? this.setValue('groundLevel', grass.yTop) : method;
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




    // move methods to other classes ...
    // move animate() ... ?
    // review class Character (sort methods) ...
    // game over screen (this + level world) ...
    // pause ...
    // pause music ...
    // fix enemy gravity or dino walk ...
    // fix climb method (at least for climb down, set speedY = 0, ...) ...
    // fix updateGroundLevel (error after collecting star) ...

    // clear enemies (0/3) ...
    // remove console log ...

    // set prevent default ...
}