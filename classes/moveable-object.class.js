class MoveableObject extends DrawableObject {
    speedY = 0;
    acceleration = 0.5;
    jumpCounter = -1;
    basicLevel = 484;
    groundLevel = 484;
    abyssLevel = 668;
    otherDirection = false;


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
    isClimb() {
        return this.isClimbUp() || this.isClimbDown();
    }


    // jsdoc
    isClimbUp() {
        let ladderTopInRange = this.isLadderInRange('isLadderTop', 'yTop', this.body.yBottom);
        return isKey('arrowUp') && ladderTopInRange;
    }


    // jsdoc
    isLadderInRange(method, valueA, valueB) {
        let ladder = this.getWorldObject('ladders', method);
        if (isMatch(valueA, this.body.yBottom)) {
            return ladder && isGreater(valueA, ladder[valueB]);
        } else {
            return ladder && isGreater(ladder[valueA], valueB);
        }
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
    isClimbDown() {
        let ladderBottomInRange = this.isLadderInRange('isLadderBottom', this.body.yBottom, 'yBottom');
        let ladderTopOutOfRange = this.isLadderInRange('isLadderTop', this.body.yBottom, 'yTop');
        return isKey('arrowDown') && ladderBottomInRange && !ladderTopOutOfRange;
    }


    // jsdoc
    isLadderBottom(ladder) {
        return this.isLadder(ladder) && ladder instanceof LadderB;
    }


    // jsdoc
    applyGravity() {
        if (!this.isClimb() && !this.isEpilog()) {
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


    // jsdoc
    updateGroundLevel(key) {
        if (isUndefined(key)) {
            this.setGroundLevel('flyGrass', this.updateGroundLevel('grass'));
        } else {
            this.setGroundLevel('grass', this.setValue('groundLevel', this.abyssLevel));
        }
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
        let onGrassLeft = isIncluded(g.xLeft, this.body.xLeft, g.xRight);
        let onGrassRight = isIncluded(g.xLeft, this.body.xRight, g.xRight);
        return onGrassLeft || onGrassRight;
    }


    // jsdoc
    isAboveGrass(g) {
        return isGreater(this.body.yBottom, g.yTop, true);
    }


    // jsdoc
    setValue(key, value) {
        this[key] = value;
    }


    // jsdoc
    setMusic(path) {
        this.music = new Audio(path);
        this.music.volume = volume.music / 10;
    }


    startMusic(condition, delay) {
        if (condition && !this.musicStarted && !world.hero.isEpilog()) {
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
}